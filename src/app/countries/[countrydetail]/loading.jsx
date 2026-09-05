import styles from '@/styles/SkeletonLoader.module.css';

const Line = ({ className = '' }) => <span className={`${styles.line} ${className}`} />;

export default function Loading() {
  return (
    <main className={styles.page} aria-busy="true" aria-live="polite">
      <span className={styles.srOnly}>Loading country details…</span>

      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Line className={styles.breadcrumbFirst} />
          <Line className={styles.breadcrumbSecond} />
        </div>

        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <span className={styles.badge} />
            <div className={styles.heroText}>
              <Line className={styles.title} />
              <Line className={styles.tagline} />
            </div>
          </div>

          <Line className={styles.description} />
          <Line className={`${styles.description} ${styles.descriptionShort}`} />

          <div className={styles.stats}>
            {[1, 2, 3].map((item) => (
              <div className={styles.statCard} key={item}>
                <span className={styles.icon} />
                <Line className={styles.label} />
                <Line className={styles.value} />
              </div>
            ))}
          </div>
        </section>

        {[1, 2, 3].map((item) => (
          <section className={styles.section} key={item}>
            <Line className={styles.sectionTitle} />
            <Line className={styles.sectionText} />
            <Line className={`${styles.sectionText} ${styles.sectionTextShort}`} />
          </section>
        ))}
      </div>
    </main>
  );
}
