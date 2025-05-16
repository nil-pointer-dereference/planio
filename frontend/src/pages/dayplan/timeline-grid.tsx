export default function DayplanTimelineGrid({ hours }: { hours: number[] }) {
  // Always generate 25 lines (0-24) for each hour
  const hourLines = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between h-full">
      {hourLines.map((num) => (
        <div key={num} className="flex items-center h-0">
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
}
