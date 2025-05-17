import DayplanTimelineGrid from "./timeline-grid";
import DayplanTimelineNumbers from "./timeline-numbers";
import TimelineOverlay from "./timeline-overlay";
import {
  TIMELINE_HOURS,
  getHourOffset,
  getEventDuration,
  setHourAndMinute,
} from "./timeline-utils";
import DayplanEventList from "./event-list";
import FloatingEventPreview from "./floating-event-preview";
import { useDayplanEvents } from "./useDayplanEvents";
import { useDayplanDragAndResize } from "./useDayplanDragAndResize";

// ...existing imports...

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

// DayplanEvent interface for timeline events
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
  // Fetch events and loading/error state from custom hook
  const { events, setEvents, loading, error } = useDayplanEvents();

  // Drag and resize logic from custom hook
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

  // Get the currently active event (if any)
  const event: DayplanEvent | null =
    activeIdx !== null ? events[activeIdx] : null;
  const eventStart: Date = event?.start ?? new Date();
  const eventEnd: Date = event?.end ?? new Date();

  // Calculate the hour offset for the event start
  const eventStartHour: number = getHourOffset(eventStart);

  // Determine which hour to display during drag
  const displayHour: number =
    dragging && previewHour !== null ? previewHour : eventStartHour;
  // Snap to 15-minute increments
  const displayStart: number = Math.round(displayHour * 4) / 4;

  // Calculate event duration, accounting for midnight
  const duration: number =
    eventProps?.originalDuration || getEventDuration(eventStart, eventEnd);

  const displayEnd: number = displayStart + duration;

  // Create preview Date objects for drag/resize preview
  const previewStartDate: Date = setHourAndMinute(eventStart, displayStart);
  let previewEndDate: Date;

  // Handle midnight boundary for preview
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

  // Main timeline layout
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

      {/* Timeline grid and event boxes */}
      <div className="relative flex-1 h-full">
        {/* Background timeline lines */}
        <DayplanTimelineGrid hours={HOURS} />

        {/* Event boxes */}
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
