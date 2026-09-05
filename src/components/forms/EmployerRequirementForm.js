'use client';

import { useState } from 'react';
import styles from '@/styles/forms/EmployerRequirementForm.module.css';

// Point this at your Django backend, e.g. http://localhost:8000
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const COUNTRY_OPTIONS = [
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Germany',
  'Other',
];

const EXPERIENCE_OPTIONS = ['Any experience', 'Entry Level', '1-3 Years', '3-5 Years', '5+ Years'];

const TIMELINE_OPTIONS = [
  'Immediately',
  'Within 1 month',
  '1-3 months',
  '3+ months',
  'Just exploring options',
];

const emptyRole = {
  title: '',
  openings: '',
  experience: EXPERIENCE_OPTIONS[0],
  country: COUNTRY_OPTIONS[0],
};

const emptyForm = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  website: '',
  industry: '',
  timeline: TIMELINE_OPTIONS[0],
  salaryBudget: '',
  message: '',
};

export default function EmployerRequirementForm() {
  const [form, setForm] = useState(emptyForm);
  const [roles, setRoles] = useState([{ ...emptyRole }]);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateRole(index, field, value) {
    setRoles((r) => r.map((role, i) => (i === index ? { ...role, [field]: value } : role)));
  }

  function addRole() {
    setRoles((r) => [...r, { ...emptyRole }]);
  }

  function removeRole(index) {
    setRoles((r) => r.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.companyName.trim() ||
      !form.contactName.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setError('Company name, contact name, email, and phone are required.');
      return;
    }
    const validRoles = roles.filter((r) => r.title.trim());
    if (validRoles.length === 0) {
      setError('Add at least one role you need to hire for.');
      return;
    }

    setError('');
    setStatus('submitting');

    try {
      const res = await fetch(`${API_BASE_URL}/api/employer-requirements/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...form,
          roles: validRoles.map((r) => ({
            title: r.title,
            openings: r.openings ? Number(r.openings) : null,
            experience: r.experience,
            country: r.country,
          })),
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        // non-JSON error response, ignore and fall back to generic message
      }

      if (!res.ok) {
        const message =
          data.detail ||
          data.error ||
          (typeof data === 'object' ? Object.values(data).flat().join(' ') : '');
        throw new Error(message || 'Something went wrong. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  const busy = status === 'submitting';

  if (status === 'success') {
    return (
      <div className={styles.card}>
        <div className={styles.successCard}>
          <div className={styles.successIcon} aria-hidden="true">
            <CheckIcon width={26} height={26} />
          </div>
          <h2 className={styles.successTitle}>Requirement received</h2>
          <p className={styles.successText}>
            Thanks — a Alzareen International account manager will reach out within 1 business day
            to discuss your hiring needs in detail.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.card}>
      {error && (
        <div role="alert" className={styles.errorBox}>
          <AlertIcon width={16} height={16} className={styles.errorIcon} />
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      {/* ===== Company & contact ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Company &amp; contact details</h2>
        <p className={styles.sectionSubtext}>Who should we get in touch with?</p>

        <div className={styles.grid2} style={{ marginBottom: 18 }}>
          <TextField
            id="companyName"
            label="Company name"
            required
            value={form.companyName}
            onChange={(v) => update('companyName', v)}
            placeholder="e.g. Al Futtaim Group"
          />
          <TextField
            id="contactName"
            label="Contact person"
            required
            value={form.contactName}
            onChange={(v) => update('contactName', v)}
            placeholder="e.g. Fatima Al Suwaidi"
          />
        </div>

        <div className={styles.grid2} style={{ marginBottom: 18 }}>
          <TextField
            id="email"
            label="Work email"
            type="email"
            required
            value={form.email}
            onChange={(v) => update('email', v)}
            placeholder="you@company.com"
          />
          <TextField
            id="phone"
            label="Phone / WhatsApp"
            type="tel"
            required
            value={form.phone}
            onChange={(v) => update('phone', v)}
            placeholder="+971 5X XXX XXXX"
          />
        </div>

        <div className={styles.grid2}>
          <TextField
            id="website"
            label="Company website"
            optional
            value={form.website}
            onChange={(v) => update('website', v)}
            placeholder="https://"
          />
          <TextField
            id="industry"
            label="Industry / sector"
            optional
            value={form.industry}
            onChange={(v) => update('industry', v)}
            placeholder="e.g. Construction, Healthcare"
          />
        </div>
      </section>

      {/* ===== Roles needed ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Roles you need to hire</h2>
        <p className={styles.sectionSubtext}>Add every role you're currently hiring for.</p>

        <div className={styles.roleList}>
          {roles.map((role, index) => (
            <div className={styles.roleRow} key={index}>
              {roles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRole(index)}
                  aria-label={`Remove role ${index + 1}`}
                  className={styles.roleRemove}
                >
                  ✕
                </button>
              )}

              <div className={styles.field}>
                <label htmlFor={`role-title-${index}`} className={styles.label}>
                  Job title <span className={styles.required}>*</span>
                </label>
                <input
                  id={`role-title-${index}`}
                  type="text"
                  value={role.title}
                  onChange={(e) => updateRole(index, 'title', e.target.value)}
                  placeholder="e.g. Electrician"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor={`role-openings-${index}`} className={styles.label}>
                  Openings
                </label>
                <input
                  id={`role-openings-${index}`}
                  type="number"
                  min="1"
                  value={role.openings}
                  onChange={(e) => updateRole(index, 'openings', e.target.value)}
                  placeholder="e.g. 10"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor={`role-experience-${index}`} className={styles.label}>
                  Experience
                </label>
                <select
                  id={`role-experience-${index}`}
                  value={role.experience}
                  onChange={(e) => updateRole(index, 'experience', e.target.value)}
                  className={styles.select}
                >
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor={`role-country-${index}`} className={styles.label}>
                  Location
                </label>
                <select
                  id={`role-country-${index}`}
                  value={role.country}
                  onChange={(e) => updateRole(index, 'country', e.target.value)}
                  className={styles.select}
                >
                  {COUNTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <button type="button" onClick={addRole} className={styles.addRoleBtn}>
          <PlusIcon width={14} height={14} />
          Add another role
        </button>
      </section>

      {/* ===== Additional details ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Additional details</h2>
        <p className={styles.sectionSubtext}>
          Anything else that helps us match the right candidates.
        </p>

        <div className={styles.grid2} style={{ marginBottom: 18 }}>
          <div className={styles.field}>
            <label htmlFor="timeline" className={styles.label}>
              Hiring timeline
            </label>
            <select
              id="timeline"
              value={form.timeline}
              onChange={(e) => update('timeline', e.target.value)}
              className={styles.select}
            >
              {TIMELINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <TextField
            id="salaryBudget"
            label="Salary budget (optional)"
            optional
            value={form.salaryBudget}
            onChange={(v) => update('salaryBudget', v)}
            placeholder="e.g. AED 2,500–3,000/month"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="message" className={styles.label}>
            Additional requirements <span className={styles.optionalTag}>(optional)</span>
          </label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder="Certifications required, accommodation you provide, contract length, etc."
            className={styles.textarea}
          />
        </div>
      </section>

      <div className={styles.submitRow}>
        <p className={styles.submitNote}>
          An account manager will review your requirement and follow up within 1 business day.
        </p>
        <button type="submit" disabled={busy} className={styles.submitBtn}>
          {busy && <Spinner className={styles.spinner} />}
          {busy ? 'Submitting…' : 'Submit requirement'}
        </button>
      </div>
    </form>
  );
}

function TextField({ id, label, type = 'text', value, onChange, placeholder, required, optional }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
        {optional && <span className={styles.optionalTag}>(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Small inline icon set                                                   */
/* ---------------------------------------------------------------------- */

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function AlertIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Spinner(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
