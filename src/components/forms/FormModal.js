'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './FormModal.module.css';

export default function Modal({ isOpen, onClose, children, labelledBy }) {
  const panelRef = useRef(null);

  // Close on Escape, lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the modal for keyboard/screen-reader users
    panelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        // Only close if the backdrop itself was clicked, not the panel
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={styles.panel}
      >
        <button type="button" onClick={onClose} aria-label="Close" className={styles.closeBtn}>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
