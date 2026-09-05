import styles from '@/styles/Pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={styles.pagination}>
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        ← Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? styles.pageActive : ''}
        >
          {index + 1}
        </button>
      ))}

      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next →
      </button>
    </div>
  );
}
