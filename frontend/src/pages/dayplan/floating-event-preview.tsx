import React from "react";
import DayplanEventDraggableBox from "./event-draggable-box";

interface FloatingEventPreviewProps {
  x: number;
  y: number;
  dragOffset: number | null;
  height: number;
  previewStartDate: Date;
  previewEndDate: Date;
  title: string;
  description: string;
}

const FloatingEventPreview: React.FC<FloatingEventPreviewProps> = ({
  x,
  y,
  dragOffset,
  height,
  previewStartDate,
  previewEndDate,
  title,
  description,
}) => (
  <div
    className="fixed z-50 w-[300px] -translate-x-1/2"
    style={{
      left: x,
      top: y - (dragOffset ?? 0),
      height: `${height}px`,
      pointerEvents: "none",
      transition: "none",
    }}
  >
    <DayplanEventDraggableBox
      topPercent={0}
      heightPercent={100}
      resizing={false}
      onDragStart={() => {}}
      onResizeStart={() => {}}
      previewStartDate={previewStartDate}
      previewEndDate={previewEndDate}
      title={title}
      description={description}
    />
  </div>
);

export default FloatingEventPreview;
