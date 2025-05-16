import { useRef, useState } from "react";
import DayplanEventBox from "./dayplan-event-box";

// Change HOURS to include 0 as the first value
const HOURS = [0, ...Array.from({ length: 12 }, (_, i) => (i + 1) * 2)];
const TIMELINE_HOURS = 24;

function getHourFromPosition(y: number, timelineHeight: number) {
  // Clamp y to timeline
  const clampedY = Math.max(0, Math.min(y, timelineHeight));
  // Calculate hour as a float for smooth dragging
  const hour = (clampedY / timelineHeight) * TIMELINE_HOURS;
  return Math.max(0, Math.min(hour, TIMELINE_HOURS - 0.5));
}

// Helper to get hour offset from midnight
function getHourOffset(date: Date) {
  return date.getHours() + date.getMinutes() / 60;
}

// Helper to set hour and minute on a date
function setHourAndMinute(date: Date, hourFloat: number) {
  const hours = Math.floor(hourFloat);
  const minutes = Math.round((hourFloat - hours) * 60);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}

export default function DayplanTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Store event start/end as Date objects
  const [eventStart, setEventStart] = useState<Date>(() => {
    const d = new Date();
    d.setHours(8, 0, 0, 0); // default 8:00
    return d;
  });
  const [eventEnd, setEventEnd] = useState<Date>(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0); // default 12:00
    return d;
  });

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

  // Calculate top and height in percent based on Date
  // ...existing code...
  // Calculate top and height in percent based on Date
  const eventStartHour = getHourOffset(eventStart);

  // If eventEnd is exactly 00:00:00 and next day, treat as 24:00 for boxHours
  const isEndMidnightNextDay =
    eventEnd.getHours() === 0 &&
    eventEnd.getMinutes() === 0 &&
    eventEnd.getSeconds() === 0 &&
    (eventEnd.getDate() !== eventStart.getDate() ||
      eventEnd.getDay() !== eventStart.getDay());

  const eventEndHour = isEndMidnightNextDay ? 24 : getHourOffset(eventEnd);
  const boxHours = eventEndHour - eventStartHour;
  const topPercent = (eventStartHour / TIMELINE_HOURS) * 100;
  const heightPercent = (boxHours / TIMELINE_HOURS) * 100;
  // ...existing code...

  // Mouse drag handlers
  function onDragStart(e: React.MouseEvent) {
    if (resizing) return;
    setDragging(true);
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const boxTop = rect.top + (topPercent / 100) * rect.height;
      setDragOffset(e.clientY - boxTop);
    }
    setDragPosition({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  }

  function onDrag(e: React.MouseEvent) {
    if (resizing) return;
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
    setDragging(false);
    setDragPosition(null);
    if (!timelineRef.current) {
      setPreviewHour(null);
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
      // Set eventStart based on previewHour, keep duration the same
      const rounded = Math.round(previewHour * 2) / 2;
      const newStart = setHourAndMinute(eventStart, rounded);
      const duration = eventEndHour - eventStartHour;
      let newEnd = new Date(newStart);
      newEnd.setHours(newStart.getHours() + Math.floor(duration));
      newEnd.setMinutes(
        newStart.getMinutes() + Math.round((duration % 1) * 60)
      );
      // Clamp end to 24:00
      if (getHourOffset(newEnd) > 24) {
        newEnd = setHourAndMinute(newEnd, 24);
      }
      // Invalidate drag if end is on the next day and not exactly 00:00:00
      if (
        (newEnd.getDate() !== newStart.getDate() ||
          newEnd.getDay() !== newStart.getDay()) &&
        !(
          newEnd.getHours() === 0 &&
          newEnd.getMinutes() === 0 &&
          newEnd.getSeconds() === 0
        )
      ) {
        setPreviewHour(null);
        setDragOffset(null);
        return;
      }
      setEventStart(newStart);
      setEventEnd(newEnd);
    }
    setPreviewHour(null);
    setDragOffset(null);
  }

  // Resize handlers
  function onResizeStart(e: React.MouseEvent) {
    setResizing(true);
    setResizeStartY(e.clientY);
    setResizeStartHeight(boxHours);
    e.stopPropagation();
    e.preventDefault();
  }

  function onResize(e: React.MouseEvent) {
    if (
      !resizing ||
      !timelineRef.current ||
      resizeStartY === null ||
      resizeStartHeight === null
    )
      return;
    const rect = timelineRef.current.getBoundingClientRect();
    const deltaY = e.clientY - resizeStartY;
    const hoursPerPx = TIMELINE_HOURS / rect.height;
    let newBoxHours = resizeStartHeight + deltaY * hoursPerPx;
    // Prevent event from being shorter than 1.5 hours
    newBoxHours = Math.max(
      1.5,
      Math.min(newBoxHours, TIMELINE_HOURS - eventStartHour)
    );
    // Snap to nearest 0.5 hour
    newBoxHours = Math.round(newBoxHours * 2) / 2;
    // Set eventEnd based on new duration
    const newEnd = setHourAndMinute(eventStart, eventStartHour + newBoxHours);
    setEventEnd(newEnd);
  }

  function onResizeEnd() {
    setResizing(false);
    setResizeStartY(null);
    setResizeStartHeight(null);
  }

  // Displayed time (rounded for display)
  const displayHour =
    dragging && previewHour !== null ? previewHour : eventStartHour;
  const displayStart = Math.round(displayHour * 2) / 2;
  const displayEnd = displayStart + boxHours;
  const displayTopPercent = (displayHour / TIMELINE_HOURS) * 100;

  // For preview during drag, create preview Date objects
  const previewStartDate = setHourAndMinute(eventStart, displayStart);
  const previewEndDate = setHourAndMinute(eventStart, displayEnd);

  return (
    <div
      className="relative w-full min-h-48 h-96 select-none flex flex-row"
      ref={timelineRef}
      onMouseMove={resizing ? onResize : onDrag}
      onMouseUp={resizing ? onResizeEnd : onDragEnd}
      onMouseLeave={resizing ? onResizeEnd : onDragEnd}
    >
      {/* Numbers column */}
      <div className="relative z-10 flex flex-col justify-between items-end max-w-[1.5rem] h-full select-none pointer-events-none">
        {HOURS.map((num) => (
          <div key={num} className="flex items-center h-0">
            <span className="text-[10px] text-gray-400 pr-2 translate-y-0">
              {num}
            </span>
          </div>
        ))}
      </div>

      {/* Timeline lines and event box column */}
      <div className="relative flex-1 h-full">
        {/* Background timeline lines */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between h-full">
          {HOURS.map((num) => (
            <div key={num} className="flex items-center h-0">
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
          ))}
        </div>
        <div className="relative flex-1 h-full">
          {/* Draggable & resizable event box */}
          {!dragging && (
            <div
              className="absolute left-1/2 z-10 w-[300px] -translate-x-1/2 group"
              style={{
                top: `${displayTopPercent}%`,
                height: `${heightPercent}%`,
                cursor: resizing ? "ns-resize" : "grab",
                transition: "top 0.2s cubic-bezier(0.4,0,0.2,1)",
                userSelect: resizing ? "none" : undefined,
              }}
              onMouseDown={onDragStart}
            >
              <DayplanEventBox
                title="Event Title"
                description="This is a description of the event."
                start={previewStartDate}
                end={previewEndDate}
                top="0"
                height="100%"
              />
              {/* Resize handle */}
              <div
                className="absolute bottom-1 left-0 w-full h-2 cursor-ns-resize flex items-end justify-center z-20"
                onMouseDown={onResizeStart}
                style={{ touchAction: "none" }}
              >
                <div className="w-28 h-0.5 bg-green-800 rounded-full opacity-90 group-hover:opacity-100 mb-0.5" />
              </div>
            </div>
          )}
        </div>
        {/* Floating event box while dragging */}
        {dragging && dragPosition && (
          <div
            className="fixed z-50 w-[300px] -translate-x-1/2"
            style={{
              left: dragPosition.x,
              top: dragPosition.y - (dragOffset ?? 0),
              height: `${
                (boxHours / TIMELINE_HOURS) *
                (timelineRef.current?.clientHeight ?? 0)
              }px`,
              pointerEvents: "none",
              transition: "none",
            }}
          >
            <DayplanEventBox
              title="Event Title"
              description="This is a description of the event."
              start={previewStartDate}
              end={previewEndDate}
              top="0"
              height="100%"
            />
          </div>
        )}
      </div>
      {/* Overlay for pointer events during drag or resize */}
      {(dragging || resizing) && (
        <div
          className="fixed inset-0 z-40"
          style={{ cursor: resizing ? "ns-resize" : "grabbing" }}
          onMouseMove={resizing ? onResize : onDrag}
          onMouseUp={resizing ? onResizeEnd : onDragEnd}
        />
      )}
    </div>
  );
}
