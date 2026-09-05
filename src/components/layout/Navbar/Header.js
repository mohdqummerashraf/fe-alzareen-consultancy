'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import NavActions from './NavActions';
import styles from '@/styles/Header.module.css';

const NAV_LINKS = [
  { href: '/job-listing', label: 'Jobs' },
  { href: '/recruitment-drive', label: 'Recruitment Drives' },
  { href: '/countries', label: 'Countries' },
  { href: '/services', label: 'Services' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.wrap} ${styles.nav}`}>
        <Link href="/" className={styles.logoLink} aria-label="Alzareen International home">
          <Image
            src="/images/alzareen.svg"
            alt="Alzareen International"
            width={230}
            height={70}
            priority
            className={styles.logo}
          />
        </Link>

        <nav className={styles.navLinks} aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.desktopActions}>
          <NavActions />
        </div>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ''}`}
        aria-label="Mobile navigation"
      >
        <div className={styles.mobileNavInner}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}

          {/* <Link href="/post-job" className={styles.mobileCta} onClick={closeMenu}>
            Post a Job
          </Link> */}

          <div className={styles.mobileActions} onClick={closeMenu}>
            <NavActions />
          </div>
        </div>
      </nav>
    </header>
  );
}