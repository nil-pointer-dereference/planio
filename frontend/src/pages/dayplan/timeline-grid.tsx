export default function DayplanTimelineGrid({ hours }: { hours: number[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between h-full">
      {hours.map((num) => (
        <div key={num} className="flex items-center h-0">
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
}
