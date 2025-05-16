export default function DayplanTimelineNumbers({ hours }: { hours: number[] }) {
  // Generate 25 lines (0-24), but only show a number for even lines (every second line, including 0)
  const hourLines = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className="relative z-10 flex flex-col justify-between items-end max-w-[1.5rem] h-full select-none pointer-events-none">
      {hourLines.map((num) => (
        <div key={num} className="flex items-center h-0">
          {/* Show number only for even hours (every second line, including 0) */}
          {num % 2 === 0 ? (
            <span className="text-[10px] text-gray-400 pr-2 translate-y-0">
              {num}
            </span>
          ) : (
            <span className="text-[10px] text-gray-400 pr-2 translate-y-0">
              &nbsp;
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
