import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24 sm:px-10">
      <p className="font-mono text-[11px] tracking-[0.22em] text-blush/75">error: 404 . file not found</p>
      <h1 className="mt-6 font-serif text-5xl leading-[1.02] text-warm sm:text-7xl">
        This page was never <em className="italic text-rose-bright">committed.</em>
      </h1>
      <Link
        to="/letter"
        className="mt-10 inline-flex w-fit items-center border-b border-blush/60 pb-1 font-mono text-xs uppercase tracking-[0.2em] text-blush transition-colors duration-500 hover:border-blush hover:text-warm"
      >
        cd ~/letter.md
      </Link>
    </main>
  );
}
