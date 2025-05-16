import { useEffect, useRef, useState } from "react";

interface DayplanEventBoxProps {
  title: string;
  description: string;
  start: Date;
  end: Date;
  top: string;
  height: string;
}

export default function DayplanEventBox({
  title,
  description,
  start,
  end,
  top,
  height,
}: DayplanEventBoxProps) {
  const time = `${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

  const boxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [showDescription, setShowDescription] = useState(true);
  const [compact, setCompact] = useState(false);
  const [titleMaxChars, setTitleMaxChars] = useState<number | null>(null);

  // Use ResizeObserver to react to actual size changes
  useEffect(() => {
    const checkHeight = () => {
      if (boxRef.current) {
        setShowDescription(boxRef.current.clientHeight >= 90);
        // Compact mode if height is less than 60px
        setCompact(boxRef.current.clientHeight < 60);
      }
    };

    checkHeight();

    if (boxRef.current && "ResizeObserver" in window) {
      const observer = new ResizeObserver(checkHeight);
      observer.observe(boxRef.current);
      return () => observer.disconnect();
    } else {
      window.addEventListener("resize", checkHeight);
      return () => window.removeEventListener("resize", checkHeight);
    }
  }, []);

  // Dynamically calculate how many characters of the title fit if compact
  useEffect(() => {
    if (!compact || !titleRef.current || !boxRef.current) {
      setTitleMaxChars(null);
      return;
    }
    // Estimate available width for title (box width - time width - gap)
    const boxWidth = boxRef.current.clientWidth;
    // Create a temporary span to measure time width
    const tempSpan = document.createElement("span");
    tempSpan.style.font = window.getComputedStyle(titleRef.current).font;
    tempSpan.style.fontSize = window.getComputedStyle(
      titleRef.current
    ).fontSize;
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "nowrap";
    tempSpan.innerText = time;
    document.body.appendChild(tempSpan);
    const timeWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);

    // 8px gap between title and time
    const available = boxWidth - timeWidth - 8;
    // Estimate how many characters fit (average char width)
    const avgCharWidth = 7; // rough estimate for small font
    const maxChars = Math.max(2, Math.floor(available / avgCharWidth));
    setTitleMaxChars(maxChars);
  }, [compact, time, title]);

  // Render title (possibly truncated) and time inline if compact
  let renderedTitle = title;
  if (compact && titleMaxChars !== null && title.length > titleMaxChars) {
    renderedTitle = title.slice(0, Math.max(0, titleMaxChars - 3)) + "...";
  }

  return (
    <div
      ref={boxRef}
      className="absolute left-8 right-4 z-10 flex flex-col justify-start items-start bg-green-200 rounded-lg shadow overflow-hidden"
      style={{
        top,
        height,
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      {/* Gradient background behind resize handle */}
      <div
        className="pointer-events-none absolute left-0 w-full"
        style={{
          // Place at the bottom, stretch up
          bottom: 0,
          height: "44px", // Will be updated dynamically below
          background:
            "linear-gradient(to top, #bbf7d0 100%, rgba(187,247,208,0) 0%)",
          zIndex: 1,
        }}
        // We'll update the height dynamically using JS below
        id="resize-gradient-bg"
      />
      {/* ...existing content... */}
      {!compact ? (
        <div
          ref={titleRef}
          className="font-bold text-green-900 text-sm mb-1 w-full"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 0,
          }}
        >
          {title}
        </div>
      ) : (
        <div
          ref={titleRef}
          className="font-bold text-green-900 text-sm mb-1 w-full flex flex-row items-center"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 0,
            gap: "8px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            {renderedTitle}
          </span>
          <span
            className="text-green-700 text-xs font-mono"
            style={{
              flexShrink: 0,
              whiteSpace: "nowrap",
              display: "block",
              lineHeight: "1.5",
            }}
          >
            {time}
          </span>
        </div>
      )}
      {showDescription && !compact && (
        <div
          className="text-green-800 text-xs mb-2 w-full"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 0,
          }}
        >
          {description}
        </div>
      )}
      {!compact && (
        <div
          className="text-green-700 text-xs font-mono w-full"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 0,
          }}
        >
          {time}
        </div>
      )}
      {/* Resize handle and dynamic gradient background height logic */}
      <div
        className="absolute bottom-1 left-0 w-full h-2 flex items-end justify-center z-20"
        style={{ touchAction: "none" }}
        ref={(el) => {
          // Dynamically set gradient height based on handle position
          if (!el) return;
          const gradient = el.parentElement?.querySelector<HTMLDivElement>(
            "#resize-gradient-bg"
          );
          if (!gradient) return;
          // Distance from handle to bottom
          const handleRect = el.getBoundingClientRect();
          const parentRect = el.parentElement?.getBoundingClientRect();
          if (!parentRect) return;
          const handleFromBottom =
            parentRect.bottom - handleRect.bottom + handleRect.height / 2;
          // Height: 1x distance + handle height (was 2x)
          const handleHeight = handleRect.height;
          const gradientHeight = handleFromBottom + handleHeight;
          gradient.style.height = `${gradientHeight}px`;
        }}
      >
        <div className="w-28 h-0.5 bg-green-800 rounded-full opacity-90 mb-0.5" />
      </div>
    </div>
  );
}
