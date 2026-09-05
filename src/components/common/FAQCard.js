import React from 'react';
import styles from '@/styles/FAQCard.module.css';
import { FaQuestionCircle } from 'react-icons/fa';

function FAQCard({ faq }) {
  return faq && faq.length > 0 ? (
    <section className={`${styles.section} ${styles.sectionFaqs}`}>
      <div className={styles.sectionHeading}>
        <span className={`${styles.sectionIcon} ${styles.iconGold}`}>
          <FaQuestionCircle aria-hidden="true" />
        </span>
        <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
      </div>
      <div className={styles.faqList}>
        {faq.map((item, index) => (
          <React.Fragment key={item.q}>
            <div className={styles.faqCard}>
              <div className={styles.faqHeader}>
                <span className={styles.faqNumber}>{index + 1}.</span>
                <h3 className={styles.faqQuestion}>{item.q}</h3>
              </div>

              <p className={styles.faqAnswer}>{item.a}</p>
            </div>

            {index < faq.length - 1 && <div className={styles.faqDivider} />}
          </React.Fragment>
        ))}
      </div>
    </section>
  ) : null;
}

export default FAQCard;
