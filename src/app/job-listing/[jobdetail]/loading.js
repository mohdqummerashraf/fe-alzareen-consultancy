import styles from '@/styles/Job/JobDetailPage.module.css';

export default function Loading() {
  return (
    <section className={styles.jobDetail} aria-busy="true" aria-label="Loading job details">
      <div className={styles.jobHero}>
        <div className={`${styles.heroBanner} ${styles.skeletonBlock}`} />

        <div className={styles.heroTopRow}>
          <span className={`${styles.companyLogoFallback} ${styles.skeletonBlock}`} />
          <div style={{ flex: 1 }}>
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
          </div>
        </div>

        <div className={styles.jobMeta}>
          <span className={`${styles.skeletonPill}`} />
          <span className={`${styles.skeletonPill}`} />
          <span className={`${styles.skeletonPill}`} />
        </div>
      </div>

      <div className={styles.infoGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div className={styles.infoCard} key={i}>
            <span className={`${styles.infoIconWrap} ${styles.skeletonBlock}`} />
            <div style={{ flex: 1 }}>
              <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
            </div>
          </div>
        ))}
      </div>

      <section className={styles.section}>
        <div className={`${styles.skeletonLine} ${styles.skeletonHeading}`} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
      </section>
    </section>
  );
}