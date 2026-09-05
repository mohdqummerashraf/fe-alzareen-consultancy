import React from 'react';
import styles from '@/styles/HeroSection.module.css';

function HeroSection({ eyebrow, title, highlight, description, stats }) {
  return (
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{eyebrow}</span>

        <h1 className={styles.heroTitle}>
          {title}
          <span>{highlight}</span>
        </h1>

        <p className={styles.heroText}>{description}</p>

        <div className={styles.stats}>
          {stats?.map((item) => (
            <div key={item.label} className={styles.statCard}>
              <div className={styles.statIcon}>{item.icon}</div>

              <div>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
