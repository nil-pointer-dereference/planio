export default function DayplanTimelineNumbers({ hours }: { hours: number[] }) {
  return (
    <div className="relative z-10 flex flex-col justify-between items-end max-w-[1.5rem] h-full select-none pointer-events-none">
      {hours.map((num) => (
        <div key={num} className="flex items-center h-0">
          <span className="text-[10px] text-gray-400 pr-2 translate-y-0">
            {num}
          </span>
        </div>
      ))}
    </div>
  );
}
