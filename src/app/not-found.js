import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist or may have moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="mb-6 font-mono text-xs uppercase tracking-widest text-heading/50">
        Error 404
      </span>

      <svg
        width="88"
        height="88"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="mb-6 text-heading/30"
        aria-hidden="true"
      >
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5z" />
      </svg>

      <h1 className="mb-3 text-3xl font-semibold text-heading sm:text-4xl">
        Looks like this route hasn&apos;t landed yet
      </h1>
      <p className="mb-10 max-w-md text-heading/60">
        The page you&apos;re looking for doesn&apos;t exist, may have moved, or the destination you
        searched for isn&apos;t in our network yet.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-heading px-6 py-3 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
        <Link
          href="/job-listing"
          className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-heading"
        >
          Browse open roles
        </Link>
        <Link
          href="/countries"
          className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-heading"
        >
          See destinations
        </Link>
      </div>

      <p className="mt-10 font-mono text-xs text-heading/40">
        Still stuck?{' '}
        <Link href="/contact" className="underline underline-offset-2">
          Talk to a counsellor
        </Link>
      </p>
    </main>
  );
}
