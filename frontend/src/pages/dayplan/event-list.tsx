import React from "react";
import DayplanEventDraggableBox from "./event-draggable-box";
import { TIMELINE_HOURS, getHourOffset } from "./timeline-utils";

interface DayplanEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
  description: string;
  type: string;
  completed: boolean;
}

interface DayplanEventListProps {
  events: DayplanEvent[];
  activeIdx: number | null;
  dragging: boolean;
  resizing: boolean;
  onDragStart: (idx: number) => (e: React.MouseEvent) => void;
  onResizeStart: (idx: number) => (e: React.MouseEvent) => void;
}

const DayplanEventList: React.FC<DayplanEventListProps> = ({
  events,
  activeIdx,
  dragging,
  resizing,
  onDragStart,
  onResizeStart,
}) => (
  <>
    {events.map((event, idx) => {
      const startHour = getHourOffset(event.start);
      const endHour = getHourOffset(event.end);
      const topPercent = (startHour / TIMELINE_HOURS) * 100;
      const heightPercent = ((endHour - startHour) / TIMELINE_HOURS) * 100;
      const isActive = activeIdx === idx && (dragging || resizing);

      // Hide the static box for the active event while dragging
      if (dragging && activeIdx === idx) return null;

      return (
        <DayplanEventDraggableBox
          key={event.id}
          topPercent={topPercent}
          heightPercent={heightPercent}
          resizing={isActive && resizing}
          onDragStart={onDragStart(idx)}
          onResizeStart={onResizeStart(idx)}
          previewStartDate={event.start}
          previewEndDate={event.end}
          title={event.title}
          description={event.description}
        />
      );
    })}
  </>
);

export default DayplanEventList;
