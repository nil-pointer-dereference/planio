import { useEffect, useRef, useState } from "react";

interface DayplanEventBoxProps {
  title: string;
  description: string;
  start: Date;
  end: Date;
  top: string;
  height: string;
  hideResizeGradient?: boolean; // Add this new optional prop
}

export default function DayplanEventBox({
  title,
  description,
  start,
  end,
  top,
  height,
  hideResizeGradient = false, // Default to false
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
      className="absolute left-1/2 -translate-x-1/2 w-[130%] z-10 flex flex-col justify-start items-start bg-green-200 rounded-lg shadow overflow-hidden"
      style={{
        top,
        height,
        // Remove vertical padding if height < 25px
        paddingTop:
          boxRef.current && boxRef.current.clientHeight < 25 ? "0" : "0.3rem",
        paddingBottom:
          boxRef.current && boxRef.current.clientHeight < 25 ? "0" : "0.3rem",
        paddingLeft: "0.75rem",
        paddingRight: "0.75rem",
        display: "flex",
        justifyContent:
          boxRef.current && boxRef.current.clientHeight < 25
            ? "center"
            : "flex-start", // vertical centering
        alignItems: "flex-start", // always stick to left
        textAlign: "left", // always left
      }}
    >
      {/* Gradient background behind resize handle */}
      <div
        className="pointer-events-none absolute left-0 w-full"
        style={{
          bottom: 0,
          height: "16px",
          background:
            "linear-gradient(to top, rgba(187,247,208,1) 0%, rgba(187,247,208,0) 100%)",
          zIndex: 1,
          opacity: hideResizeGradient ? 0 : 1,
        }}
        id="resize-gradient-bg"
      />

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

      {/* Time - moved above description */}
      {!compact && (
        <div
          className="text-green-700 text-xs font-mono w-full mb-1"
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

      {/* Description - now after time */}
      {showDescription && !compact && (
        <div
          className="text-green-800 text-xs w-full"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 0,
            wordBreak: "break-word",
            maxHeight: "calc(100% - 55px)", // Allow multi-line with scrolling if needed
            overflowY: "auto",
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}
