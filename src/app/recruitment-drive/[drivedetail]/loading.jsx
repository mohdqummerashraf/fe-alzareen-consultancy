import styles from '@/styles/recruitment/RecruitmentDetailPage.module.css';

export default function Loading() {
  return (
    <section className={styles.driveDetail} aria-busy="true" aria-label="Loading recruitment drive">
      <div className={styles.driveHero}>
        <div className={`${styles.heroBanner} ${styles.skeletonBlock}`} />
        <div className={styles.heroContent}>
          <div className={`${styles.skeletonLine} ${styles.skeletonPill}`} style={{ width: 130 }} />
          <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
        </div>
      </div>

      <div className={styles.infoGrid}>
        {Array.from({ length: 5 }).map((_, i) => (
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