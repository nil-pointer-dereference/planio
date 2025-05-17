import { useState, useRef } from "react";
import {
  TIMELINE_HOURS,
  getHourOffset,
  getHourFromPosition,
  setHourAndMinute,
  getEventDuration,
  hasOverlap,
} from "./timeline-utils";
import type { DayplanEvent } from "./useDayplanEvents";

export function useDayplanDragAndResize(events: DayplanEvent[], setEvents: (fn: (prev: DayplanEvent[]) => DayplanEvent[]) => void) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState<number | null>(null);
  const [previewHour, setPreviewHour] = useState<number | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const [resizeStartY, setResizeStartY] = useState<number | null>(null);
  const [resizeStartHeight, setResizeStartHeight] = useState<number | null>(null);
  const [eventProps, setEventProps] = useState<{ originalEndsMidnight: boolean; originalDuration: number } | null>(null);

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

      setEventProps({
        originalEndsMidnight,
        originalDuration: getHourOffset(originalEvent.end) - getHourOffset(originalEvent.start),
      });

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const boxTop = rect.top + (getHourOffset(events[idx].start) / TIMELINE_HOURS) * rect.height;
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
      const currentEvent = events[activeIdx];
      const rounded = Math.round(previewHour * 4) / 4;
      const duration =
        eventProps?.originalDuration ||
        getHourOffset(currentEvent.end) - getHourOffset(currentEvent.start);

      const newStart = setHourAndMinute(currentEvent.start, rounded);
      let newEnd = new Date(newStart);
      newEnd.setHours(newStart.getHours() + Math.floor(duration));
      newEnd.setMinutes(newStart.getMinutes() + Math.round((duration % 1) * 60));

      const endHourOffset = getHourOffset(newEnd);
      const startDay = newStart.getDate();

      if (endHourOffset >= 24 || endHourOffset === 0) {
        newEnd = new Date(newStart);
        newEnd.setHours(0, 0, 0, 0);
        newEnd.setDate(startDay + 1);
      }

      const isNextDay = newEnd.getDate() !== startDay;
      const isExactlyMidnight =
        newEnd.getHours() === 0 &&
        newEnd.getMinutes() === 0 &&
        newEnd.getSeconds() === 0;

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
    newBoxHours = Math.max(
      1.5,
      Math.min(
        newBoxHours,
        TIMELINE_HOURS - getHourOffset(events[activeIdx].start)
      )
    );
    newBoxHours = Math.round(newBoxHours * 4) / 4;
    const newEnd = setHourAndMinute(
      events[activeIdx].start,
      getHourOffset(events[activeIdx].start) + newBoxHours
    );

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

  return {
    timelineRef,
    activeIdx,
    setActiveIdx,
    dragging,
    setDragging,
    resizing,
    setResizing,
    dragOffset,
    setDragOffset,
    previewHour,
    setPreviewHour,
    dragPosition,
    setDragPosition,
    resizeStartY,
    setResizeStartY,
    resizeStartHeight,
    setResizeStartHeight,
    eventProps,
    setEventProps,
    onDragStart,
    onDrag,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
  };
}