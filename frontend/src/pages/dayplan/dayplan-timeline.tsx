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
  const timelineRef = useRef<HTMLDivElement>(null);
  const { events, setEvents, loading, error } = useDayplanEvents();

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState<number | null>(null);
  const [previewHour, setPreviewHour] = useState<number | null>(null);
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [resizeStartY, setResizeStartY] = useState<number | null>(null);
  const [resizeStartHeight, setResizeStartHeight] = useState<number | null>(
    null
  );
  const [eventProps, setEventProps] = useState<{
    originalEndsMidnight: boolean;
    originalDuration: number;
  } | null>(null);

  // Helper to get event data for the active event
  const event = activeIdx !== null ? events[activeIdx] : null;
  const eventStart = event?.start ?? new Date();
  const eventEnd = event?.end ?? new Date();

  const eventStartHour = getHourOffset(eventStart);
  const eventEndHour = getHourOffset(eventEnd);
  const boxHours = eventEndHour - eventStartHour;

  // Mouse drag handlers
  function onDragStart(idx: number) {
    return (e: React.MouseEvent) => {
      if (resizing) return;
      setActiveIdx(idx);
      setDragging(true);

      // Store original event properties for comparison
      const originalEvent = events[idx];
      const originalEndsMidnight =
        originalEvent.end.getHours() === 0 &&
        originalEvent.end.getMinutes() === 0 &&
        originalEvent.end.getSeconds() === 0 &&
        originalEvent.end.getDate() !== originalEvent.start.getDate();

      // Store this info in state
      setEventProps({
        originalEndsMidnight,
        originalDuration:
          getHourOffset(originalEvent.end) - getHourOffset(originalEvent.start),
      });

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const boxTop =
          rect.top +
          (getHourOffset(events[idx].start) / TIMELINE_HOURS) * rect.height;
        setDragOffset(e.clientY - boxTop);
      }
      setDragPosition({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    };
  }

  function onDrag(e: React.MouseEvent) {
    if (resizing || activeIdx === null) return;
    if (!dragging) return;
    setDragPosition({ x: e.clientX, y: e.clientY });

    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      const y = e.clientY - rect.top - (dragOffset ?? 0);
      const hour = getHourFromPosition(y, rect.height);
      setPreviewHour(hour);
    } else {
      setPreviewHour(null);
    }
  }

  function onDragEnd(e: React.MouseEvent) {
    if (activeIdx === null) return;
    setDragging(false);
    setDragPosition(null);

    if (!timelineRef.current) {
      setPreviewHour(null);
      setActiveIdx(null);
      setEventProps(null);
      return;
    }

    const rect = timelineRef.current.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom &&
      previewHour !== null
    ) {
      // Get the current event
      const currentEvent = events[activeIdx];

      // Set eventStart based on previewHour, keep duration the same
      const rounded = Math.round(previewHour * 4) / 4; // 15 min increments
      const duration =
        eventProps?.originalDuration ||
        getHourOffset(currentEvent.end) - getHourOffset(currentEvent.start);

      const newStart = setHourAndMinute(currentEvent.start, rounded);
      let newEnd = new Date(newStart);
      newEnd.setHours(newStart.getHours() + Math.floor(duration));
      newEnd.setMinutes(
        newStart.getMinutes() + Math.round((duration % 1) * 60)
      );

      // Handle cases around midnight
      const endHourOffset = getHourOffset(newEnd);
      const startDay = newStart.getDate();

      // Fix midnight boundary cases
      if (endHourOffset >= 24 || endHourOffset === 0) {
        newEnd = new Date(newStart);
        // Set to midnight exactly
        newEnd.setHours(0, 0, 0, 0);
        // Advance to next day
        newEnd.setDate(startDay + 1);
      }

      // Only reject if:
      // 1. End is on next day (not original start day)
      // 2. End is not exactly midnight
      // 3. The event didn't originally end at midnight
      const isNextDay = newEnd.getDate() !== startDay;
      const isExactlyMidnight =
        newEnd.getHours() === 0 &&
        newEnd.getMinutes() === 0 &&
        newEnd.getSeconds() === 0;

      // Check for overlap with other events
      if (
        hasOverlap(events, activeIdx, newStart, newEnd) ||
        (isNextDay && !isExactlyMidnight && !eventProps?.originalEndsMidnight)
      ) {
        setPreviewHour(null);
        setDragOffset(null);
        setActiveIdx(null);
        setEventProps(null);
        return;
      }

      // Update the event in the array
      setEvents((prev) =>
        prev.map((ev, i) =>
          i === activeIdx ? { ...ev, start: newStart, end: newEnd } : ev
        )
      );
    }

    setPreviewHour(null);
    setDragOffset(null);
    setActiveIdx(null);
    setEventProps(null);
  }

  // Resize handlers
  function onResizeStart(idx: number) {
    return (e: React.MouseEvent) => {
      setActiveIdx(idx);
      setResizing(true);
      const start = getHourOffset(events[idx].start);
      const end = getHourOffset(events[idx].end);
      setResizeStartY(e.clientY);
      setResizeStartHeight(end - start);
      e.stopPropagation();
      e.preventDefault();
    };
  }

  function onResize(e: React.MouseEvent) {
    if (
      !resizing ||
      !timelineRef.current ||
      resizeStartY === null ||
      resizeStartHeight === null ||
      activeIdx === null
    )
      return;
    const rect = timelineRef.current.getBoundingClientRect();
    const deltaY = e.clientY - resizeStartY;
    const hoursPerPx = TIMELINE_HOURS / rect.height;
    let newBoxHours = resizeStartHeight + deltaY * hoursPerPx;
    // Prevent event from being shorter than 1.5 hours
    newBoxHours = Math.max(
      1.5,
      Math.min(
        newBoxHours,
        TIMELINE_HOURS - getHourOffset(events[activeIdx].start)
      )
    );
    // Snap to nearest 0.25 hour (15 min)
    newBoxHours = Math.round(newBoxHours * 4) / 4;
    // Set eventEnd based on new duration
    const newEnd = setHourAndMinute(
      events[activeIdx].start,
      getHourOffset(events[activeIdx].start) + newBoxHours
    );

    // Prevent overlap on resize
    if (hasOverlap(events, activeIdx, events[activeIdx].start, newEnd)) {
      return;
    }

    setEvents((prev) =>
      prev.map((ev, i) => (i === activeIdx ? { ...ev, end: newEnd } : ev))
    );
  }

  function onResizeEnd() {
    setResizing(false);
    setResizeStartY(null);
    setResizeStartHeight(null);
    setActiveIdx(null);
  }

  // Displayed time (rounded for display)
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
