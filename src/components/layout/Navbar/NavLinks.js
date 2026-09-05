import Link from 'next/link';

const links = [
  {
    title: 'Jobs',
    href: '/job-listing',
  },
  {
    title: 'Recruitment Drives',
    href: '/recruitment-drive',
  },
  {
    title: 'Countries',
    href: '/countries',
  },
  {
    title: 'Services',
    href: '/services',
  },
  {
    title: 'Reviews',
    href: '/reviews',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export default function NavLinks() {
  return (
    <nav className="hidden items-center gap-12 lg:flex">
      {links.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className="relative text-lg font-medium text-ink transition-all duration-300 hover:text-gold after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
