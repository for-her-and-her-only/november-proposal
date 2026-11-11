import { useEffect, useState } from 'react';

const CHAR_MS = 30;
const LINE_PAUSE_MS = 420;

interface TypedLinesProps {
  lines: string[];
  onDone?: () => void;
  className?: string;
}

export default function TypedLines({ lines, onDone, className }: TypedLinesProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const finished = lineIndex >= lines.length;

  useEffect(() => {
    if (finished) {
      onDone?.();
      return;
    }
    const current = lines[lineIndex];
    const hasMore = charCount < current.length;
    const id = window.setTimeout(
      () => {
        if (hasMore) {
          setCharCount((count) => count + 1);
        } else {
          setLineIndex((index) => index + 1);
          setCharCount(0);
        }
      },
      hasMore ? CHAR_MS : LINE_PAUSE_MS,
    );
    return () => window.clearTimeout(id);
  }, [lineIndex, charCount, lines, finished, onDone]);

  return (
    <div className={className} aria-live="polite">
      {lines.slice(0, lineIndex).map((line) => (
        <p key={line}>{line}</p>
      ))}
      {!finished && (
        <p>
          {lines[lineIndex].slice(0, charCount)}
          <span className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-current animate-blink" />
        </p>
      )}
    </div>
  );
}
