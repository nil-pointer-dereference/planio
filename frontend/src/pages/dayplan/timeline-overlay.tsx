import React from "react";

interface TimelineOverlayProps {
  resizing: boolean;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
}

const TimelineOverlay: React.FC<TimelineOverlayProps> = ({
  resizing,
  onMouseMove,
  onMouseUp,
}) => (
  <div
    className="fixed inset-0 z-40"
    style={{ cursor: resizing ? "ns-resize" : "grabbing" }}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
  />
);

export default TimelineOverlay;
