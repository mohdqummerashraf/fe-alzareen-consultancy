import {
  FaShieldAlt,
  FaClock,
  FaFileContract,
  FaGlobe,
  FaHardHat,
  FaConciergeBell,
  FaBriefcaseMedical,
  FaIndustry,
  FaTruck,
  FaHome,
  FaStore,
  FaLaptopCode,
  FaClipboardList,
  FaUserCheck,
  FaComments,
  FaHandshake,
} from 'react-icons/fa';
import EmployerRequirementForm from '@/components/forms/EmployerRequirementForm';
import styles from './postJob.module.css';

export const metadata = {
  title: 'Hire Through Alzareen International — Submit Your Requirement',
  description:
    'Tell us the roles you need to fill, your timeline, and budget — a Alzareen International account manager will follow up within 1 business day with matched candidates.',
  alternates: { canonical: '/employers' },
  openGraph: {
    title: 'Hire Through Alzareen International Careers',
    description:
      'Submit your hiring requirement and get matched candidates from our verified talent pool.',
    url: '/employers',
    type: 'website',
  },
};

// Same 6-color palette as JobDetailPage.module.css's iconBlue/iconPurple/
// iconTeal/iconAmber/iconRose/iconIndigo -- reused here for visual
// consistency with the job detail page.
const COLORS = ['blue', 'purple', 'teal', 'amber', 'rose', 'indigo'];

function tintClass(color) {
  return `${styles.tint} ${styles[`tint${color[0].toUpperCase()}${color.slice(1)}`]}`;
}

function iconClass(color) {
  return `${styles.icon} ${styles[`icon${color[0].toUpperCase()}${color.slice(1)}`]}`;
}

const benefits = [
  {
    icon: FaShieldAlt,
    color: 'blue',
    title: 'Verified Talent Pool',
    body: 'Every candidate is screened for identity, trade certification, and prior work experience before being shortlisted to you.',
  },
  {
    icon: FaClock,
    color: 'purple',
    title: 'Fast Turnaround',
    body: 'Submit your requirement once and hear back from an account manager within 1 business day with matched profiles.',
  },
  {
    icon: FaFileContract,
    color: 'teal',
    title: 'End-to-End Compliance',
    body: 'We handle documentation, visa coordination, and deployment logistics so you receive a ready-to-deploy hire, not just a resume.',
  },
  {
    icon: FaGlobe,
    color: 'amber',
    title: 'GCC & Beyond Coverage',
    body: 'Active sourcing pipelines across the GCC, ASEAN, Russia, Georgia, Turkey, Maldives, Mauritius, and Central Asia.',
  },
];

const sectors = [
  { label: 'Construction', icon: FaHardHat, color: 'blue' },
  { label: 'Hospitality', icon: FaConciergeBell, color: 'purple' },
  { label: 'Healthcare', icon: FaBriefcaseMedical, color: 'teal' },
  { label: 'Oil, Gas & Industrial', icon: FaIndustry, color: 'amber' },
  { label: 'Logistics & Drivers', icon: FaTruck, color: 'rose' },
  { label: 'Domestic Staffing', icon: FaHome, color: 'indigo' },
  { label: 'Retail & Sales', icon: FaStore, color: 'blue' },
  { label: 'IT & Office Support', icon: FaLaptopCode, color: 'purple' },
];

const processSteps = [
  {
    icon: FaClipboardList,
    color: 'rose',
    title: 'Submit Your Requirement',
    body: 'Fill in the roles, headcount, location, and timeline below — takes about 2 minutes.',
  },
  {
    icon: FaUserCheck,
    color: 'indigo',
    title: 'Account Manager Review',
    body: 'A dedicated account manager reviews your requirement and begins sourcing from our verified pool within 1 business day.',
  },
  {
    icon: FaComments,
    color: 'blue',
    title: 'Candidate Shortlist',
    body: 'You receive a shortlist of pre-screened, matched candidates along with documentation and experience summaries.',
  },
  {
    icon: FaHandshake,
    color: 'purple',
    title: 'Interview & Deploy',
    body: 'Interview directly with shortlisted candidates, confirm your hire, and we manage visa and deployment through to arrival.',
  },
];

const faqs = [
  {
    q: 'How much does it cost to hire through Alzareen International?',
    a: 'Pricing depends on role type, headcount, and destination country. Your account manager will share a clear quote after reviewing your requirement — there is no cost to submit a requirement or receive an initial shortlist.',
    color: 'amber',
  },
  {
    q: 'How fast can candidates be deployed?',
    a: 'Typical timelines range from 2-6 weeks depending on role complexity and visa processing for the destination country. Urgent/bulk recruitment drives can move faster — mention your timeline in the form.',
    color: 'teal',
  },
  {
    q: 'Do you handle visa and travel logistics?',
    a: 'Yes. Once a candidate is confirmed, we manage documentation, medicals, visa processing, and travel coordination through to final deployment.',
    color: 'indigo',
  },
  {
    q: 'Can you source for informal/domestic sector roles too?',
    a: 'Yes — alongside formal, contract-based hiring, we also support informal sector and household staffing placements.',
    color: 'rose',
  },
];

export default function page() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.eyebrow}>For Employers</span>
        <h1 className={styles.title}>Tell us who you need to hire</h1>
        <p className={styles.lede}>
          Share your requirement once — roles, headcount, timeline — and our team matches you with
          pre-vetted candidates from our talent pool.
        </p>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>1 business day</span>
            <span className={styles.statLabel}>Initial response time</span>
          </div>
          <div className={styles.statDivider} aria-hidden="true" />
          <div className={styles.statItem}>
            <span className={styles.statValue}>6+ countries</span>
            <span className={styles.statLabel}>GCC & international coverage</span>
          </div>
          <div className={styles.statDivider} aria-hidden="true" />
          <div className={styles.statItem}>
            <span className={styles.statValue}>Formal & informal</span>
            <span className={styles.statLabel}>Sectors supported</span>
          </div>
        </div>
      </div>

      {/* Why hire through us */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Employers Hire Through Us</h2>
        <div className={styles.benefitsGrid}>
          {benefits.map(({ icon: Icon, color, title, body }) => (
            <div className={`${styles.benefitCard} ${tintClass(color)}`} key={title}>
              <span className={iconClass(color)}>
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className={styles.sectionAlt}>
        <h2 className={styles.sectionTitle}>Sectors We Staff</h2>
        <div className={styles.sectorGrid}>
          {sectors.map(({ label, icon: Icon, color }) => (
            <div className={`${styles.sectorItem} ${tintClass(color)}`} key={label}>
              <Icon
                className={styles[`text${color[0].toUpperCase()}${color.slice(1)}`]}
                aria-hidden="true"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.processGrid}>
          {processSteps.map(({ icon: Icon, color, title, body }, i) => (
            <div className={`${styles.processCard} ${tintClass(color)}`} key={title}>
              <span className={styles.processNumber}>{i + 1}</span>
              <Icon
                className={styles[`text${color[0].toUpperCase()}${color.slice(1)}`]}
                style={{ fontSize: '22px', marginTop: '6px', marginBottom: '12px' }}
                aria-hidden="true"
              />
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The actual form */}
      <section className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Submit Your Requirement</h2>
        <p className={styles.formLede}>
          The more detail you share, the faster we can put together a matched shortlist — role(s),
          number of positions, target start date, and destination location all help.
        </p>
        <EmployerRequirementForm />
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Employer FAQs</h2>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div className={`${styles.faqCard} ${tintClass(faq.color)}`} key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
