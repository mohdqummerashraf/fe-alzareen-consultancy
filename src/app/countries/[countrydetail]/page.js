import FAQCard from '@/components/common/FAQCard';
import JobCardSection from '@/components/common/JobCardSection';
import LeadForm from '@/components/forms/LeadForm';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import { getFeaturedByCountry } from '@/services/getFeaturedJobByCountry';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FaBriefcase,
  FaLightbulb,
  FaListOl,
  FaMoneyBillWave,
  FaPassport,
  FaUserTie,
} from 'react-icons/fa';
import { countries, getCountryBySlug } from '../data';
import styles from './CountryDetail.module.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alzareenglobaloverseas.com';

const FLAG_THEMES = {
  AE: { from: '#00732F', to: '#0F1419' },
  SA: { from: '#006C35', to: '#0B2E1A' },
  QA: { from: '#8D1B3D', to: '#2A0A15' },
  KW: { from: '#007A3D', to: '#14100F' },
  BH: { from: '#CE1126', to: '#2A0508' },
  OM: { from: '#DB161B', to: '#0B3D0B' },
};
const COUNTRY_FLAGS = {
  AE: '🇦🇪',
  SA: '🇸🇦',
  QA: '🇶🇦',
  KW: '🇰🇼',
  BH: '🇧🇭',
  OM: '🇴🇲',
};

function getFlagTheme(isoCode) {
  return FLAG_THEMES[isoCode?.trim().toUpperCase()] ?? null;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return countries.map((c) => ({ countrydetail: c.slug }));
}

export async function generateMetadata({ params }) {
  const { countrydetail } = await params;
  const country = getCountryBySlug(countrydetail);

  if (!country) {
    return {
      title: 'Destination not found | Alzareen International Careers',
      robots: { index: false, follow: false },
    };
  }

  const title = `${country.name} Jobs for Indians ${new Date().getFullYear()} | Salary, Visa & How to Apply`;
  const description = `${country.description} Typical pay: ${country.salaryRange}. See open roles, visa requirements, and how to apply through Alzareen International.`;
  const url = `${SITE_URL}/countries/${country.slug}`;

  return {
    title,
    description,
    keywords: [
      `jobs in ${country.name}`,
      `${country.name} work visa`,
      `${country.name} salary for Indians`,
      ...country.topProfessions.map((p) => `${p} jobs in ${country.name}`),
    ],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary', title, description },
    robots: { index: true, follow: true },
  };
}

export default async function CountryPage({ params }) {
  const { countrydetail } = await params;
  const country = getCountryBySlug(countrydetail);

  if (!country) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/countries/${country.slug}`;
  const flagTheme = getFlagTheme(country.isoCode);
  const countryFlag = COUNTRY_FLAGS[country.isoCode?.trim().toUpperCase()] ?? '🌍';

  const { jobs: countryJobs, drives: countryDrives } = await getFeaturedByCountry(country.name);

  const placeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: country.name,
    address: { '@type': 'PostalAddress', addressCountry: country.isoCode },
    description: country.description,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Countries', item: `${SITE_URL}/countries` },
      { '@type': 'ListItem', position: 2, name: country.name },
    ],
  };

  const faqJsonLd =
    country.faqs && country.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: country.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className={styles.container}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Countries', href: '/countries' },
            { label: country.name },
          ]}
        />

        <section
          className={styles.hero}
          style={flagTheme ? { '--flag-from': flagTheme.from, '--flag-to': flagTheme.to } : {}}
        >
          <div className={styles.heroTop}>
            <span
              className={styles.heroBadge}
              style={{ backgroundColor: country.color }}
              aria-hidden="true"
            >
              {countryFlag}
            </span>
            <div>
              <h1 className={styles.heroTitle}>{country.name} Jobs for Indian Candidates</h1>
              <p className={styles.heroTagline}>{country.tagline}</p>
            </div>
          </div>

          <p className={styles.heroDescription}>{country.description}</p>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>
                <FaBriefcase aria-hidden="true" />
              </span>
              <span className={styles.statLabel}>Open roles</span>
              <span className={styles.statValue}>
                {countryJobs.length + countryDrives.length || country.roleCount}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>
                <FaMoneyBillWave aria-hidden="true" />
              </span>
              <span className={styles.statLabel}>Typical salary</span>
              <span className={styles.statValue}>{country.salaryRange}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>
                <FaUserTie aria-hidden="true" />
              </span>
              <span className={styles.statLabel}>Top professions</span>
              <div className={styles.statChips}>
                {country.topProfessions.map((p) => (
                  <span key={p} className={styles.chip}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionWorkBg}`}>
          <div className={styles.sectionHeading}>
            <span className={`${styles.sectionIcon} ${styles.iconGold}`}>
              <FaLightbulb aria-hidden="true" />
            </span>
            <h2 className={styles.sectionTitle}>Why work in {country.name}?</h2>
          </div>
          <p className={styles.sectionText}>{country.whyWorkHere}</p>
        </section>

        {country.cities && country.cities.length > 0 && (
          <section className={`${styles.section} ${styles.sectionCities}`}>
            <h2 className={styles.sectionTitle}>Where roles are based</h2>
            <div className={styles.cityChips}>
              {country.cities.map((city) => (
                <span key={city} className={styles.cityChip}>
                  {city}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className={`${styles.section} ${styles.sectionBg}`}>
          <div className={styles.sectionHeading}>
            <span className={`${styles.sectionIcon} ${styles.iconRoute}`}>
              <FaPassport aria-hidden="true" />
            </span>
            <h2 className={styles.sectionTitle}>Visa &amp; documentation</h2>
          </div>
          <p className={styles.sectionText}>{country.visaNote}</p>
        </section>

        {country.applicationSteps && country.applicationSteps.length > 0 && (
          <section className={`${styles.section} ${styles.sectionWorkBg}`}>
            <div className={styles.sectionHeading}>
              <span className={`${styles.sectionIcon} ${styles.iconTeal}`}>
                <FaListOl aria-hidden="true" />
              </span>
              <h2 className={styles.sectionTitle}>How to apply for jobs in {country.name}</h2>
            </div>
            <ol className={styles.stepsList}>
              {country.applicationSteps.map((step, i) => (
                <li key={step} className={styles.stepItem}>
                  <span className={styles.stepIndex} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className={styles.stepText}>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {countryDrives.length > 0 && (
          <JobCardSection
            title={`Featured Recruitment Drives in ${country.name}`}
            items={countryDrives}
            viewAllHref={`/recruitment-drive?country=${encodeURIComponent(country.name)}`}
          />
        )}

        {countryJobs.length > 0 && (
          <JobCardSection
            title={`Popular Jobs in ${country.name}`}
            items={countryJobs}
            viewAllHref={`/job-listing?country=${encodeURIComponent(country.name)}`}
          />
        )}

        {country.faqs && country.faqs.length > 0 && <FAQCard faq={country.faqs} />}

        <section className={`${styles.ctaSection} ${styles.sectionNxtStpBg}`}>
          <p className={styles.ctaText}>Ready to take the next step?</p>
          <div className={styles.ctaButtons}>
            <Link
              href={`/job-listing?country=${encodeURIComponent(country.name)}`}
              className={styles.ctaPrimary}
            >
              See all {country.name} openings →
            </Link>
            <Link href="/countries" className={styles.ctaSecondary}>
              Browse other destinations
            </Link>
          </div>
        </section>

        <div className={styles.formSection}>
          <LeadForm source="country_detail_page" jobTitle={`${country.name} roles`} />
        </div>
      </div>
    </main>
  );
}
