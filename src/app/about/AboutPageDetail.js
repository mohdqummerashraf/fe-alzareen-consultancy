'use client';

import LeadForm from '@/components/forms/LeadForm';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  FaBriefcaseMedical,
  FaBuilding,
  FaBullseye,
  FaCheckCircle,
  FaChevronDown,
  FaConciergeBell,
  FaGlobeAmericas,
  FaGlobeAsia,
  FaHardHat,
  FaHome,
  FaIndustry,
  FaLaptopCode,
  FaListOl,
  FaShieldAlt,
  FaStore,
  FaTruck,
} from 'react-icons/fa';
import styles from './AboutUs.module.css';

const countryGroups = [
  { label: 'GCC', countries: 'Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman' },
  {
    label: 'ASEAN',
    countries: 'Singapore, Malaysia, Thailand, Indonesia, Philippines, Vietnam and more',
  },
  { label: 'Other Key Destinations', countries: 'Russia, Georgia, Turkey, Maldives, Mauritius' },
  {
    label: 'Central Asia',
    countries: 'Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, Turkmenistan',
  },
];

const sectors = [
  { label: 'Construction & Civil Works', icon: FaHardHat, color: 'route' },
  { label: 'Hospitality & Facilities Management', icon: FaConciergeBell, color: 'gold' },
  { label: 'Healthcare & Paramedical', icon: FaBriefcaseMedical, color: 'teal' },
  { label: 'Oil, Gas & Industrial', icon: FaIndustry, color: 'route' },
  { label: 'Logistics, Drivers & Warehousing', icon: FaTruck, color: 'gold' },
  { label: 'Domestic & Household Staffing', icon: FaHome, color: 'teal' },
  { label: 'Retail & Sales', icon: FaStore, color: 'route' },
  { label: 'IT & Office Support', icon: FaLaptopCode, color: 'gold' },
];

const processSteps = [
  {
    title: 'Registration',
    body: 'Candidates register with basic details, trade/skill, and preferred destination country.',
  },
  {
    title: 'Screening & Documentation',
    body: 'We verify passports, certificates, and experience, and guide candidates through the paperwork required for each destination.',
  },
  {
    title: 'Employer Matching',
    body: 'Candidates are matched against live vacancies from our verified employer and recruitment drive partners.',
  },
  {
    title: 'Interview & Selection',
    body: 'Video call, telephonic, or in-person interviews are arranged directly with the hiring employer.',
  },
  {
    title: 'Visa & Deployment',
    body: 'On selection, we assist with visa processing, medicals, and travel formalities through to final deployment.',
  },
  {
    title: 'Post-Placement Support',
    body: 'Our team stays reachable after deployment to help with any early on-the-job concerns.',
  },
];

const trustPoints = [
  'Verified employers and recruitment drive partners across the GCC and beyond',
  'Support for both formal, contract-based roles and informal sector employment',
  'End-to-end documentation, visa, and travel assistance',
  'Transparent process — candidates are kept informed at every stage',
  'Post-placement support after deployment',
];

const quickNav = [
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'countries', label: 'Countries' },
  { id: 'sectors', label: 'Sectors' },
  { id: 'process', label: 'Our Process' },
  { id: 'why-us', label: 'Why Us' },
];

/** Counts up from 0 to `value` once the element scrolls into view. */
function useCountUp(value, duration = 1200) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            setDisplay(Math.round(progress * value));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return [ref, display];
}

function StatCounter({ value, suffix = '', label }) {
  const [ref, display] = useCountUp(value);
  return (
    <div className={styles.statCard} ref={ref}>
      <span className={styles.statValue}>
        {display}
        {suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function AboutPageDetail() {
  const [openStep, setOpenStep] = useState(0); // first step expanded by default
  const [activeSector, setActiveSector] = useState(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className={styles.page}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroIconWrap}>
          <FaGlobeAmericas aria-hidden="true" />
        </div>
        <p className={styles.eyebrow}>About Us</p>
        <h1 className={styles.heroTitle}>About Alzareen Global Overseas</h1>{' '}
        <p className={styles.heroSubtitle}>
          Alzareen Global Overseas is an overseas recruitment and manpower consultancy connecting
          skilled, semi-skilled and professional candidates from India with employment opportunities
          across the GCC and other international markets.
        </p>
        <div className={styles.statsRow}>
          <StatCounter value={28} suffix="+" label="Destination countries" />
          <StatCounter value={5000} suffix="+" label="Candidates placed" />
          <StatCounter value={96} suffix="%" label="Visa approval rate" />
        </div>
        {/* Quick nav */}
        <nav className={styles.quickNav} aria-label="Page sections">
          {quickNav.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.quickNavItem}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </section>

      {/* Who We Are */}
      <section className={styles.section} id="who-we-are">
        <div className={styles.sectionHeading}>
          <span className={`${styles.sectionIcon} ${styles.iconRoute}`}>
            <FaBuilding aria-hidden="true" />
          </span>
          <h2>Who We Are</h2>{' '}
        </div>
        <p>
          Alzareen Global Overseas is an India-based overseas recruitment and manpower consultancy
          helping skilled, semi-skilled and professional candidates connect with employment
          opportunities across the GCC and selected international markets.
        </p>

        <p>
          Our recruitment process supports candidates from registration and document verification
          through employer interviews, visa processing, medical requirements and overseas
          deployment. We work with employers and recruitment partners to help connect suitable
          candidates with relevant job opportunities.
        </p>
      </section>

      {/* Mission */}
      <section className={styles.sectionAlt}>
        <div className={styles.sectionHeading}>
          <span className={`${styles.sectionIcon} ${styles.iconGold}`}>
            <FaBullseye aria-hidden="true" />
          </span>
          <h2>Our Mission</h2>
        </div>
        <p>
          To be a trusted bridge between Indian talent and overseas employers by delivering ethical,
          transparent, and efficient recruitment services — helping candidates find secure
          livelihoods abroad while helping employers access reliable, well-matched manpower.
        </p>
      </section>

      {/* Countries We Serve */}
      <section className={styles.section} id="countries">
        <div className={styles.sectionHeading}>
          <span className={`${styles.sectionIcon} ${styles.iconTeal}`}>
            <FaGlobeAsia aria-hidden="true" />
          </span>
          <h2>Countries We Serve</h2>{' '}
        </div>
        <div className={styles.countryGrid}>
          {countryGroups.map((group) => (
            <div className={styles.countryCard} key={group.label}>
              <div className={styles.countryCardIcon}>
                <FaGlobeAsia aria-hidden="true" />
              </div>
              <h3>{group.label}</h3>
              <p>{group.countries}</p>
            </div>
          ))}
        </div>
        <Link href="/countries" className={styles.inlineLink}>
          Explore country-specific job details →
        </Link>
      </section>

      {/* Sectors */}
      <section className={styles.sectionAlt} id="sectors">
        <div className={styles.sectionHeading}>
          <span className={`${styles.sectionIcon} ${styles.iconRoute}`}>
            <FaIndustry aria-hidden="true" />
          </span>
          <h2>Sectors We Recruit For</h2>
        </div>
        <div className={styles.sectorGrid}>
          {sectors.map(({ label, icon: Icon, color }) => (
            <button
              type="button"
              className={`${styles.sectorItem} ${activeSector === label ? styles.sectorItemActive : ''}`}
              key={label}
              onMouseEnter={() => setActiveSector(label)}
              onMouseLeave={() => setActiveSector(null)}
              onFocus={() => setActiveSector(label)}
              onBlur={() => setActiveSector(null)}
            >
              <span
                className={`${styles.sectorIcon} ${
                  styles[`icon${color[0].toUpperCase()}${color.slice(1)}`]
                }`}
              >
                <Icon aria-hidden="true" />
              </span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Process — accordion */}
      <section className={styles.section} id="process">
        <div className={styles.sectionHeading}>
          <span className={`${styles.sectionIcon} ${styles.iconGold}`}>
            <FaListOl aria-hidden="true" />
          </span>
          <h2>Our Process</h2>
        </div>
        <ol className={styles.processList}>
          {processSteps.map((step, i) => {
            const isOpen = openStep === i;
            return (
              <li key={step.title} className={styles.processStep}>
                <button
                  type="button"
                  className={styles.processStepHeader}
                  onClick={() => setOpenStep(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`process-step-${i}`}
                >
                  <span className={styles.processNumber}>{i + 1}</span>
                  <h3>{step.title}</h3>
                  <FaChevronDown
                    className={`${styles.processChevron} ${isOpen ? styles.processChevronOpen : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p id={`process-step-${i}`} className={styles.processBody}>
                    {step.body}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Why Choose Us */}
      <section className={styles.sectionAlt} id="why-us">
        <div className={styles.sectionHeading}>
          <span className={`${styles.sectionIcon} ${styles.iconTeal}`}>
            <FaShieldAlt aria-hidden="true" />
          </span>
          <h2>Why Choose Alzareen</h2>
        </div>
        <ul className={styles.checkList}>
          {trustPoints.map((point) => (
            <li key={point}>
              <FaCheckCircle className={styles.checkMark} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <LeadForm source="about_page" />
    </main>
  );
}
