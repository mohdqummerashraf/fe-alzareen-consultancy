'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '@/services/apiService';
import { getStoredAuth, clearStoredAuth } from '@/services/auth';
import styles from '@/styles/profile/AccountCard.module.css';

export default function AccountCard() {
  const router = useRouter();
  const auth = getStoredAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setLoggingOut(true);
    setError(null);
    try {
      await apiService.post('/accounts/logout/', {});
    } catch (err) {
      // Even if the server call fails (e.g. token already invalid), we
      // still want to clear local state so the user isn't stuck.
      console.error('Logout request failed', err);
    } finally {
      clearStoredAuth();
      setLoggingOut(false);
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>Account Settings</h2>

      <section className={styles.section}>
        <h3>Account Details</h3>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Username</span>
          <span className={styles.detailValue}>{auth?.user?.username || '—'}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Phone</span>
          <span className={styles.detailValue}>{auth?.profile?.phone || '—'}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Member since</span>
          <span className={styles.detailValue}>
            {auth?.user?.date_joined
              ? new Date(auth.user.date_joined).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : '—'}
          </span>
        </div>
      </section>

      <section className={styles.section}>
        <h3>Sign Out</h3>
        <p className={styles.sectionNote}>
          You'll need your phone number to sign back in. There's no password to remember.
        </p>

        {error && <p className={styles.errorMsg}>{error}</p>}

        {!confirmOpen ? (
          <button
            type="button"
            className={styles.dangerButton}
            onClick={() => setConfirmOpen(true)}
          >
            Log Out
          </button>
        ) : (
          <div className={styles.confirmRow}>
            <span>Are you sure you want to log out?</span>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.dangerButton}
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? 'Logging out…' : 'Yes, log out'}
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setConfirmOpen(false)}
                disabled={loggingOut}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}