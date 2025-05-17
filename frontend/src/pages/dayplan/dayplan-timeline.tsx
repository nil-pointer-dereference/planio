import { useRef, useState, useEffect } from "react";
import DayplanEventDraggableBox from "./event-draggable-box";
import DayplanTimelineGrid from "./timeline-grid";
import DayplanTimelineNumbers from "./timeline-numbers";
import TimelineOverlay from "./timeline-overlay";
import {
  TIMELINE_HOURS,
  getHourFromPosition,
  getHourOffset,
  getEventDuration,
  setHourAndMinute,
  isOverlapping,
  hasOverlap,
} from "./timeline-utils";
import DayplanEventList from "./event-list";
import FloatingEventPreview from "./floating-event-preview";
import { useDayplanEvents } from "./useDayplanEvents";
import { useDayplanDragAndResize } from "./useDayplanDragAndResize";

// Change HOURS to include 0 as the first value
const HOURS = Array.from({ length: 13 }, (_, i) => i * 2);

// API response interface
interface ApiTask {
  Completed: boolean;
  Description: string;
  EstimatedMinutes: number;
  StartHour: number;
  Title: string;
  Type: string;
}

// DayplanEvent interface
interface DayplanEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
  description: string;
  type: string;
  completed: boolean;
}

export default function DayplanTimeline() {
  const { events, setEvents, loading, error } = useDayplanEvents();

  const {
    timelineRef,
    activeIdx,
    dragging,
    resizing,
    dragOffset,
    previewHour,
    dragPosition,
    eventProps,
    onDragStart,
    onDrag,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
  } = useDayplanDragAndResize(events, setEvents);

  const event = activeIdx !== null ? events[activeIdx] : null;
  const eventStart = event?.start ?? new Date();
  const eventEnd = event?.end ?? new Date();

  const eventStartHour = getHourOffset(eventStart);

  const displayHour =
    dragging && previewHour !== null ? previewHour : eventStartHour;
  const displayStart = Math.round(displayHour * 4) / 4; // 15 min increments

  // Calculate duration properly accounting for midnight ending events
  const duration =
    eventProps?.originalDuration || getEventDuration(eventStart, eventEnd);

  const displayEnd = displayStart + duration;

  // For preview during drag, create preview Date objects
  const previewStartDate = setHourAndMinute(eventStart, displayStart);
  let previewEndDate;

  // Handle midnight boundary correctly for preview
  if (displayEnd >= 24) {
    previewEndDate = new Date(previewStartDate);
    previewEndDate.setHours(0, 0, 0, 0);
    previewEndDate.setDate(previewEndDate.getDate() + 1);
  } else {
    previewEndDate = setHourAndMinute(previewStartDate, displayEnd);
  }

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <div className="w-full min-h-96 h-[48rem] flex items-center justify-center">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="w-full min-h-96 h-[48rem] flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-96 h-[48rem] select-none flex flex-row"
      ref={timelineRef}
      onMouseMove={resizing ? onResize : onDrag}
      onMouseUp={resizing ? onResizeEnd : onDragEnd}
      onMouseLeave={resizing ? onResizeEnd : onDragEnd}
    >
      {/* Numbers column */}
      <DayplanTimelineNumbers hours={HOURS} />

      {/* Timeline lines and event box column */}
      <div className="relative flex-1 h-full">
        {/* Background timeline lines */}
        <DayplanTimelineGrid hours={HOURS} />

        <div className="relative flex-1 h-full">
          <DayplanEventList
            events={events}
            activeIdx={activeIdx}
            dragging={dragging}
            resizing={resizing}
            onDragStart={onDragStart}
            onResizeStart={onResizeStart}
          />
        </div>

        {/* Floating event box while dragging */}
        {dragging && dragPosition && activeIdx !== null && (
          <FloatingEventPreview
            x={dragPosition.x}
            y={dragPosition.y}
            dragOffset={dragOffset}
            height={
              ((eventProps?.originalDuration ||
                getEventDuration(
                  events[activeIdx].start,
                  events[activeIdx].end
                )) /
                TIMELINE_HOURS) *
              (timelineRef.current?.clientHeight ?? 0)
            }
            previewStartDate={previewStartDate}
            previewEndDate={previewEndDate}
            title={events[activeIdx].title}
            description={events[activeIdx].description}
          />
        )}
      </div>

      {/* Overlay for pointer events during drag or resize */}
      {(dragging || resizing) && (
        <TimelineOverlay
          resizing={resizing}
          onMouseMove={resizing ? onResize : onDrag}
          onMouseUp={resizing ? onResizeEnd : onDragEnd}
        />
      )}
    </div>
  );
}
