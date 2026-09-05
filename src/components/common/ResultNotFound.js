import React from 'react';
import styles from '@/styles/ResultNotFound.module.css';

const VARIANTS = {
  search: {
    icon: '🔍',
    title: 'No results found',
    message:
      "We couldn't find anything matching your search. Try different keywords or clear your filters.",
  },
  jobs: {
    icon: '💼',
    title: 'No jobs found',
    message:
      'No openings match your current filters right now. Try adjusting country, industry, or posted date.',
  },
  drives: {
    icon: '🌍',
    title: 'No recruitment drives found',
    message:
      'No active drives match your filters at the moment. Check back soon or broaden your search.',
  },
  blog: {
    icon: '📰',
    title: 'No articles found',
    message: "We couldn't find any guides matching that topic. Try a different keyword.",
  },
  reviews: {
    icon: '⭐',
    title: 'No reviews yet',
    message: 'There are no reviews to show here yet. Check back soon.',
  },
  generic: {
    icon: '📭',
    title: 'Nothing here yet',
    message: 'We couldn’t find anything to show.',
  },
};

function ResultNotFound({ type = 'generic', title, message, actionLabel, onAction, actionHref }) {
  const variant = VARIANTS[type] || VARIANTS.generic;

  return (
    <div className={styles.wrap} role="status">
      <div className={styles.icon} aria-hidden="true">
        {variant.icon}
      </div>
      <h3 className={styles.title}>{title || variant.title}</h3>
      <p className={styles.message}>{message || variant.message}</p>

      {actionLabel && actionHref && (
        <a href={actionHref} className={styles.action}>
          {actionLabel}
        </a>
      )}
      {actionLabel && onAction && !actionHref && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default ResultNotFound;
