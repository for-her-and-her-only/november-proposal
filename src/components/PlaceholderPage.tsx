interface PlaceholderPageProps {
  title: string;
  file: string;
}

export default function PlaceholderPage({ title, file }: PlaceholderPageProps) {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24 sm:px-10">
      <p className="font-mono text-[11px] tracking-[0.22em] text-blush/70">{file}</p>
      <h1 className="mt-6 font-serif text-6xl leading-[1.02] text-warm sm:text-8xl">{title}</h1>
      <p className="mt-8 font-mono text-sm text-warm/55">// coming soon</p>
    </main>
  );
}
