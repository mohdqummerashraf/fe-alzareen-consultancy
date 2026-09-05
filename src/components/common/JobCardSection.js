import Link from 'next/link';
import JobCard from './JobCard';
import styles from '@/styles/Job/JobCardSection.module.css';

export default function JobCardSection({ title, items, viewAllHref }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>

        {viewAllHref && (
          <Link href={viewAllHref} className={styles.viewAllBtn}>
            View All →
          </Link>
        )}
      </div>

      <div className={styles.grid}>
        {items.slice(0, 3).map((item) => (
          <JobCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
