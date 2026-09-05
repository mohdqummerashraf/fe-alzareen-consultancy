import styles from './SkeletonLoader.module.css';

function Line({ className = '' }) {
  return <div className={`${styles.line} ${className}`} />;
}

export default function SkeletonLoader() {
  return (
    <main className={styles.page} aria-busy="true" aria-live="polite">
      <span className={styles.srOnly}>Loading country details…</span>

      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Line className={styles.breadcrumbShort} />
          <Line className={styles.breadcrumbLong} />
        </div>

        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div className={styles.badge} />
            <div className={styles.heroCopy}>
              <Line className={styles.title} />
              <Line className={styles.tagline} />
            </div>
          </div>

          <Line className={styles.description} />
          <Line className={`${styles.description} ${styles.descriptionShort}`} />

          <div className={styles.statsGrid}>
            {[1, 2, 3].map((item) => (
              <div className={styles.statCard} key={item}>
                <div className={styles.statIcon} />
                <Line className={styles.statLabel} />
                <Line className={styles.statValue} />
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
