import React from "react";
import DayplanEventBox from "./event-box";

export default function DayplanEventDraggableBox({
  topPercent,
  heightPercent,
  resizing,
  onDragStart,
  onResizeStart,
  previewStartDate,
  previewEndDate,
  title, // Add these props to the function parameters
  description,
}: {
  topPercent: number;
  heightPercent: number;
  resizing: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  onResizeStart: (e: React.MouseEvent) => void;
  previewStartDate: Date;
  previewEndDate: Date;
  title: string; // Add these types
  description: string;
}) {
  return (
    <div
      className="absolute left-1/2 z-10 w-[300px] -translate-x-1/2 group"
      style={{
        top: `${topPercent}%`,
        height: `${heightPercent}%`,
        cursor: resizing ? "ns-resize" : "grab",
        transition: "top 0.2s cubic-bezier(0.4,0,0.2,1)",
        userSelect: resizing ? "none" : undefined,
      }}
      onMouseDown={onDragStart}
    >
      <DayplanEventBox
        title={title} // Use the props instead of hardcoded values
        description={description} // Use the props instead of hardcoded values
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
  );
}
