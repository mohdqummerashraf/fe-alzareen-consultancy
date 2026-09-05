import Link from 'next/link';
import styles from '@/styles/Job/JobCard.module.css';

export default function JobCard({ title, country, type, vacancies, image, slug }) {
  return (
    <Link href={`/jobs/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {image}

        <span className={styles.badge}>{type}</span>
      </div>

      <div className={styles.content}>
        <h3>{title}</h3>

        <p className={styles.country}>{country}</p>

        <div className={styles.meta}>
          <span>{vacancies}+ Vacancies</span>
        </div>
      </div>
    </Link>
  );
}
