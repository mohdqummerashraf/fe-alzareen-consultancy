import HeroSection from '@/components/common/HeroSection';
import { serviceList } from '@/constants/Data';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import LeadForm from '@/components/forms/LeadForm';
import FAQCard from '@/components/common/FAQCard';

import styles from './servicePage.module.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alzareeninternational.com';
const PAGE_PATH = '/services';
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const howItWorks = [
  {
    title: 'Consultation',
    text: 'Share your career goals and overseas job preferences with our recruitment team.',
  },
  {
    title: 'Documentation & Visa Support',
    text: 'We assist with visa processing, documentation, and compliance for your overseas employment.',
  },
  {
    title: 'Training & Certification',
    text: 'Get access to training programs and certifications required for your target job roles.',
  },
  {
    title: 'Medical Coordination',
    text: 'We help schedule and coordinate medical examinations as per the destination country requirements.',
  },
  {
    title: 'Travel Assistance',
    text: 'Receive guidance on travel arrangements, including flight bookings and accommodation support.',
  },
];

// Replace these answers with your actual fee structure, timelines, and
// certification policy before this goes live -- schema that doesn't
// match reality risks a structured-data quality flag from Google.
const serviceFaqs = [
  {
    q: 'Do you charge candidates for visa processing?',
    a: 'Our fee structure is explained clearly during your initial consultation, and many employer-sponsored roles cover visa costs directly — we confirm this upfront before you commit to anything.',
  },
  {
    q: 'How long does the full process take, from registration to deployment?',
    a: 'Timelines vary by destination country and role, typically ranging from a few weeks to a couple of months once documentation and medical clearance are complete.',
  },
  {
    q: 'Do I need prior certification before applying?',
    a: 'It depends on the role — our training and certification support helps you obtain any qualification required for your target job before deployment.',
  },
];

export const metadata = {
  title: 'Overseas Recruitment Services | Visa, Training & Travel Support | Alzareen International',
  description:
    'Alzareen International Manpower Consultancy provides end-to-end support for overseas employment, including visa processing, documentation, training, medical coordination, and travel assistance for GCC and international placements.',
  keywords: [
    'overseas recruitment services',
    'visa processing India',
    'documentation support for overseas jobs',
    'training and certification for GCC jobs',
    'medical coordination overseas employment',
    'travel assistance for overseas workers',
    'international job placement services',
    'manpower consultancy services India',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Overseas Recruitment Services | Alzareen International',
    description:
      'End-to-end support for overseas employment — visa processing, documentation, training, medical coordination, and travel assistance.',
    url: PAGE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Overseas Recruitment Services | Alzareen International',
    description:
      'End-to-end support for overseas employment — visa processing, documentation, training, medical coordination, and travel assistance.',
  },
  robots: { index: true, follow: true },
  authors: [{ name: 'Alzareen International Manpower Consultancy' }],
  publisher: 'Alzareen International Manpower Consultancy',
};

export default function ServicesPage() {
  const organization = {
    '@type': 'Organization',
    name: 'Alzareen International Manpower Consultancy',
    url: SITE_URL,
  };

  const serviceListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: serviceList.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: organization,
        areaServed: 'Worldwide',
      },
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: serviceFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HeroSection
        eyebrow="Overseas Recruitment Services"
        title="Complete Immigration & Recruitment"
        highlight="Support Services"
        description="From visa processing and documentation to medical coordination, training, certification, and travel arrangements, we provide end-to-end support for overseas employment."
        stats={[
          { icon: '📄', value: 'Visa', label: 'Documentation' },
          { icon: '🎓', value: 'Training', label: 'Certification' },
          { icon: '🏥', value: 'Medical', label: 'Coordination' },
          { icon: '✈️', value: 'Travel', label: 'Assistance' },
        ]}
      />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />

      <main className={styles.container}>
        <section className={styles.introSection}>
          <h2>Overseas Recruitment Support Services</h2>
          <p>
            Working abroad involves much more than finding a job. Candidates often require
            support with documentation, visa processing, medical examinations, training,
            certifications, and travel preparation. Our team helps simplify every stage of the
            overseas employment journey.
          </p>
          <p>
            Whether you're applying for jobs in the UAE, Saudi Arabia, Qatar, Kuwait, Oman,
            Europe, or Asia, we provide reliable guidance to ensure smoother processing and
            faster deployment.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="services-heading">
          <h2 id="services-heading">Our Recruitment Services</h2>
          <div className={styles.servicesGrid}>
            {serviceList.map((service) => {
              const Icon = service.logo;
              return (
                <article key={service.title} className={styles.serviceCard}>
                  <div className={styles.serviceIcon} aria-hidden="true">
                    <Icon size={22} />
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceText}>{service.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-it-works-heading">
          <h2 id="how-it-works-heading">How It Works</h2>
          <div className={styles.stepsList}>
            {howItWorks.map((step, index) => (
              <article key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <FAQCard faq={serviceFaqs} />

        <section className={styles.ctaSection}>
          <h2>Ready to Start Your Overseas Career?</h2>
          <p>
            Get professional assistance with visas, documentation, training, medical
            coordination, and travel support.
          </p>
        </section>

        <section className={styles.formSection}>
          <LeadForm source="services_page" />
        </section>
      </main>
    </div>
  );
}