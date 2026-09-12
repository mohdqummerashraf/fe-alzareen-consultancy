import styles from '@/styles/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

const gccDestinations = [
  { label: 'Jobs in UAE', slug: 'united-arab-emirates' },
  { label: 'Jobs in Saudi Arabia', slug: 'saudi-arabia' },
  { label: 'Jobs in Qatar', slug: 'qatar' },
  { label: 'Jobs in Kuwait', slug: 'kuwait' },
  { label: 'Jobs in Bahrain', slug: 'bahrain' },
  { label: 'Jobs in Oman', slug: 'oman' },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerLogo}>
              <Link href="/" className={styles.logoLink} aria-label="Alzareen International home">
                <Image
                  src="/images/alzareen-light.svg"
                  alt="Alzareen International"
                  width={230}
                  height={70}
                  priority
                  className={styles.logo}
                />
              </Link>
            </div>
            <span className={styles.footerAccent} aria-hidden="true" />
            <p className={styles.footerDesc}>
              Alzareen International Manpower Consultancy is a licensed overseas recruitment agency
              based in New Delhi, connecting skilled, semi-skilled, and unskilled talent from India
              with verified employers across the GCC and beyond. We manage every step of the
              placement journey — screening, documentation, visa processing, and deployment — for
              both formal and informal sector roles.
            </p>
            <div className={styles.socialRow}>
              <a href="#" aria-label="YouTube">
                ▶
              </a>
              <a href="#" aria-label="Instagram">
                ◎
              </a>
              <a href="#" aria-label="Facebook">
                f
              </a>
              <a href="#" aria-label="LinkedIn">
                in
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3>Explore</h3>
            <ul>
              <li>
                <a href="/countries">Countries</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/reviews">Reviews</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Popular Destinations</h3>
            <ul>
              {gccDestinations.map(({ label, slug }) => (
                <li key={slug}>
                  <a href={`/countries/${slug}`}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Company</h3>
            <ul>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="#">Our employers</a>
              </li>
              <li>
                <a href="#reviews">Reviews</a>
              </li>
              <li>
                <a href="#">Careers at Alzareen International</a>
              </li>
            </ul>
          </div>

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

        <div className={styles.footBottom}>
          <span>
            © {new Date().getFullYear()} Alzareen International Careers. Licence No.
            RA/DEL/2016/0042.
          </span>
          <span>Privacy Policy · Terms</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
