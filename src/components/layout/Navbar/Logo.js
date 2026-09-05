import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink">
        <div className="h-3 w-3 rounded-full bg-gold" />
      </div>

      <span className="font-heading text-4xl font-bold text-ink">Alzareen International</span>
    </Link>
  );
}
