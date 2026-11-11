export const RELATIONSHIP_START = new Date('2023-08-05T00:00:00+05:30');

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;

export interface Elapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export function getElapsed(now: number): Elapsed {
  const elapsedMs = Math.max(0, now - RELATIONSHIP_START.getTime());
  const totalSeconds = Math.floor(elapsedMs / MS_PER_SECOND);
  const totalMinutes = Math.floor(elapsedMs / MS_PER_MINUTE);
  const totalHours = Math.floor(elapsedMs / MS_PER_HOUR);

  return {
    days: Math.floor(totalHours / 24),
    hours: totalHours % 24,
    minutes: totalMinutes % 60,
    seconds: totalSeconds % 60,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
}

export const START_LABEL = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})
  .format(RELATIONSHIP_START)
  .replace(/\//g, '.');

export const pad = (value: number, width = 2) => String(value).padStart(width, '0');
