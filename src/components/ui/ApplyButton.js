'use client';

import { useState } from 'react';
import Modal from '@/components/forms/FormModal';
import RegistrationForm from '@/components/forms/RegistrationForm';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Apply button for a single job's detail page.
 *
 * - isAuthenticated: computed server-side in JobDetailPage.jsx via cookies(),
 *   passed down as a plain prop (this component itself stays a client
 *   component only for the click/modal interaction, not for the auth check).
 * - jobId / jobTitle: identify which job the application is for.
 * - className: pass the page's existing `styles.ctaButton` so this renders
 *   identically to the original <a> button — no visual change needed.
 * - label / arrow: lets the two call sites (hero vs. CTA band) keep their
 *   own wording ("Apply for this role →" vs "Apply now ↓").
 */
export default function ApplyButton({
  isAuthenticated = false,
  jobId,
  jobTitle,
  className,
  label = 'Apply for this role',
  arrow = '→',
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  // TODO: point this at your real Django endpoint for recording an
  // application (e.g. POST /api/applications/ with { job: jobId }).
  // Adjust the payload/response shape to match your serializer.
  async function submitApplication() {
    setStatus('submitting');
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ job: jobId }),
      });
      if (!res.ok) throw new Error('Failed to submit application');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  }

  function handleClick() {
    if (isAuthenticated) {
      submitApplication();
    } else {
      setModalOpen(true);
    }
  }

  if (status === 'success') {
    return (
      <span className={className} aria-live="polite">
        Application sent — we'll call you within 24 hours
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === 'submitting'}
        className={className}
        style={status === 'submitting' ? { opacity: 0.7, cursor: 'not-allowed' } : undefined}
      >
        {status === 'submitting' ? 'Submitting…' : label}
        <span aria-hidden="true">{arrow}</span>
      </button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} labelledBy="apply-auth-heading">
        {jobTitle && (
          <p
            style={{
              marginBottom: '0.75rem',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Applying for: {jobTitle}
          </p>
        )}
        <RegistrationForm
          onSuccess={() => {
            setModalOpen(false);
            submitApplication();
          }}
        />
      </Modal>
    </>
  );
}
