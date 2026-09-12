import styles from '@/styles/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

const gccDestinations = [
  {
    label: 'Jobs in UAE',
    slug: 'united-arab-emirates',
  },
  {
    label: 'Jobs in Saudi Arabia',
    slug: 'saudi-arabia',
  },
  {
    label: 'Jobs in Qatar',
    slug: 'qatar',
  },
  {
    label: 'Jobs in Kuwait',
    slug: 'kuwait',
  },
  {
    label: 'Jobs in Bahrain',
    slug: 'bahrain',
  },
  {
    label: 'Jobs in Oman',
    slug: 'oman',
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footerGrid}>
          {/* =========================
              BRAND
          ========================== */}
          <div>
            <div className={styles.footerLogo}>
              <Link href="/" className={styles.logoLink} aria-label="Alzareen Global Overseas home">
                <Image
                  src="/images/alzareen-light.svg"
                  alt="Alzareen Global Overseas"
                  width={230}
                  height={70}
                  className={styles.logo}
                />
              </Link>
            </div>

            <span className={styles.footerAccent} aria-hidden="true" />

            <p className={styles.footerDesc}>
              Alzareen Global Overseas is an overseas recruitment and manpower consultancy
              connecting skilled, semi-skilled and professional candidates from India with
              employment opportunities across the GCC and other international destinations.
            </p>

            {/* Social Links */}
            <div className={styles.socialRow}>
              <a
                href="#"
                aria-label="Alzareen Global Overseas on YouTube"
                rel="noopener noreferrer"
              >
                ▶
              </a>

              <a
                href="#"
                aria-label="Alzareen Global Overseas on Instagram"
                rel="noopener noreferrer"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="Alzareen Global Overseas on Facebook"
                rel="noopener noreferrer"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Alzareen Global Overseas on LinkedIn"
                rel="noopener noreferrer"
              >
                in
              </a>
            </div>
          </div>

          {/* =========================
              EXPLORE
          ========================== */}
          <div className={styles.footerSection}>
            <h3>Explore</h3>

            <ul>
              <li>
                <Link href="/job-listing">Overseas Jobs</Link>
              </li>

              <li>
                <Link href="/recruitment-drive">Recruitment Drives</Link>
              </li>

              <li>
                <Link href="/about">About Us</Link>
              </li>

              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* =========================
              POPULAR DESTINATIONS
          ========================== */}
          <div className={styles.footerSection}>
            <h3>Popular Destinations</h3>

            <ul>
              {gccDestinations.map(({ label, slug }) => (
                <li key={slug}>
                  <Link href={`/countries/${slug}`}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              COMPANY
          ========================== */}
          <div className={styles.footerSection}>
            <h3>Company</h3>

            <ul>
              <li>
                <Link href="/about">About Alzareen</Link>
              </li>

              <li>
                <Link href="/contact">Contact Us</Link>
              </li>

              <li>
                <Link href="/job-listing">Find Jobs</Link>
              </li>

              <li>
                <Link href="/recruitment-drive">Recruitment Drives</Link>
              </li>
            </ul>
          </div>

          {/* =========================
              CONTACT
          ========================== */}
          <div className={styles.footerSection}>
            <h3>Contact</h3>

            <ul>
              <li>
                <a href="tel:+917479744885">+91 7479744885</a>
              </li>

              <li>
                <a href="mailto:hello@alzareenglobaloverseas.com">
                  hello@alzareenglobaloverseas.com
                </a>
              </li>

              <li>Nehru Place, New Delhi</li>
            </ul>
          </div>
        </div>

        {/* =========================
            BOTTOM
        ========================== */}
        <div className={styles.footBottom}>
          <span>© {new Date().getFullYear()} Alzareen Global Overseas. All rights reserved.</span>

          <div>
            <Link href="/privacy-policy">Privacy Policy</Link>

            <span aria-hidden="true"> · </span>

            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
