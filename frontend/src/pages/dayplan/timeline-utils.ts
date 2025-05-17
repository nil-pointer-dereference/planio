export const TIMELINE_HOURS = 24;

export function getHourFromPosition(y: number, timelineHeight: number) {
  const clampedY = Math.max(0, Math.min(y, timelineHeight));
  const hour = (clampedY / timelineHeight) * TIMELINE_HOURS;
  return Math.max(0, Math.min(hour, TIMELINE_HOURS - 0.5));
}

export function getHourOffset(date: Date) {
  if (
    date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0
  ) {
    return 0;
  }
  return date.getHours() + date.getMinutes() / 60;
}

export function getEventDuration(start: Date, end: Date): number {
  let endHour = getHourOffset(end);
  if (
    endHour === 0 &&
    end.getHours() === 0 &&
    end.getMinutes() === 0 &&
    end.getSeconds() === 0 &&
    end.getDate() !== start.getDate()
  ) {
    endHour = 24;
  }
  return endHour - getHourOffset(start);
}

export function setHourAndMinute(date: Date, hourFloat: number) {
  const hours = Math.floor(hourFloat);
  const minutes = Math.round((hourFloat - hours) * 60);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}

export function isOverlapping(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA < endB && startB < endA;
}

export function hasOverlap(
  events: { start: Date; end: Date }[],
  idx: number,
  newStart: Date,
  newEnd: Date
) {
  return events.some((ev, i) => {
    if (i === idx) return false;
    return isOverlapping(newStart, newEnd, ev.start, ev.end);
  });
}