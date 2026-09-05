'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/forms/LeadForm.module.css';
import { UserIcon, PhoneIcon, MailIcon, AlertIcon, Spinner } from '@/components/ui/Icons';
import apiService from '@/services/apiService';
import { storeAuth, getStoredAuth } from '@/services/auth';

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  country: '',
};

export default function LeadForm({ jobId, jobTitle, source = 'website', onSuccess }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [auth, setAuth] = useState(undefined); // undefined = not checked yet
  const [applyState, setApplyState] = useState('idle'); // idle | applying | applied | error
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved | error
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    setAuth(getStoredAuth());
  }, []);

  const isLoggedIn = Boolean(auth?.token);

  // Pre-check whether this specific job is already saved/applied, so the
  // buttons show the correct state on load instead of always starting
  // as "Save Job" / "Apply" even for jobs the user has already actioned.
  useEffect(() => {
    if (!isLoggedIn || !jobId) return;

    async function checkExistingStatus() {
      try {
        const [savedRes, appliedRes] = await Promise.all([
          apiService.get(`/accounts/saved-jobs/?job=${jobId}`),
          apiService.get(`/accounts/applied-jobs/?job=${jobId}`),
        ]);

        const savedCount = savedRes.data?.results?.length ?? savedRes.data?.length ?? 0;
        const appliedCount = appliedRes.data?.results?.length ?? appliedRes.data?.length ?? 0;

        if (savedCount > 0) setSaveState('saved');
        if (appliedCount > 0) setApplyState('applied');
      } catch (err) {
        console.error('Failed to check saved/applied status', err);
      }
    }

    checkExistingStatus();
  }, [isLoggedIn, jobId]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, phone } = form;

    if (!name.trim() || !phone.trim()) {
      setError('Name and phone number are required.');
      return;
    }
    if (phone.trim().replace(/\D/g, '').length < 8) {
      setError('Please enter a valid phone number.');
      return;
    }

    setError('');
    setStatus('submitting');

    try {
      const result = await apiService.post('/accounts/quick-apply/', {
        full_name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        interested_country: form.country || undefined,
        job: jobId || undefined,
      });

      storeAuth(result.data);
      setAuth(result.data);
      setStatus('success');
      setForm(emptyForm);
      onSuccess?.(result.data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  async function handleApply() {
    if (!jobId || applyState === 'applying' || applyState === 'applied') return;
    setApplyState('applying');
    setActionError('');

    try {
      const result = await apiService.post('/accounts/quick-apply/', {
        full_name: auth.profile?.full_name || auth.user?.username,
        phone: auth.profile?.phone,
        email: auth.user?.email || undefined,
        interested_country: auth.profile?.interested_country || undefined,
        job: jobId,
      });
      storeAuth(result.data);
      setAuth(result.data);
      setApplyState('applied');
      onSuccess?.(result.data);
    } catch (err) {
      setActionError(err.message || 'Failed to apply. Please try again.');
      setApplyState('error');
    }
  }

  async function handleSaveJob() {
    if (!jobId || saveState === 'saving' || saveState === 'saved') return;
    setSaveState('saving');
    setActionError('');

    try {
      await apiService.post('/accounts/saved-jobs/', { job: jobId });
      setSaveState('saved');
    } catch (err) {
      const alreadySaved = err?.errors?.non_field_errors?.[0]?.toLowerCase().includes('unique');
      if (alreadySaved) {
        setSaveState('saved');
      } else {
        setActionError(err.message || 'Failed to save job. Please try again.');
        setSaveState('error');
      }
    }
  }

  useEffect(() => {
    async function loadCountries() {
      try {
        let allCountries = [];
        let nextUrl = '/countries/countries/';

        while (nextUrl) {
          const response = await apiService.get(nextUrl);

          allCountries = [...allCountries, ...(response.data?.results || [])];

          nextUrl = response.data?.next
            ? response.data.next.replace(process.env.NEXT_PUBLIC_API_URL, '')
            : null;
        }

        setCountries(allCountries);
      } catch (error) {
        // silent -- dropdown just stays empty
      } finally {
        setLoadingCountries(false);
      }
    }

    if (!isLoggedIn) loadCountries();
  }, [isLoggedIn]);

  const busy = status === 'submitting';

  // Still checking localStorage -- avoid a flash of the wrong state.
  if (auth === undefined) return null;

  return (
    <div className={styles.wrap}>
      {isLoggedIn ? (
        jobId ? (
          <div className={styles.card}>
            <div className={styles.headerBand}>
              <div className={styles.headerIconWrap}>
                <PhoneIcon className={styles.headerIcon} />
              </div>
              <h2 className={styles.headerTitle}>{jobTitle || 'This role'}</h2>
              <p className={styles.headerSubtitle}>
                We already have your details on file, {auth.profile?.full_name || 'there'}.
              </p>
            </div>

            <div className={styles.body}>
              {actionError && (
                <div role="alert" className={styles.errorBox}>
                  <AlertIcon className={styles.errorIcon} />
                  <p className={styles.errorText}>{actionError}</p>
                </div>
              )}

              <div className={styles.loggedInActions}>
                <button
                  type="button"
                  className={styles.loggedInButtonSave}
                  onClick={handleSaveJob}
                  disabled={saveState === 'saving' || saveState === 'saved'}
                >
                  {saveState === 'saving' && <Spinner className={styles.spinner} />}
                  {saveState === 'saved'
                    ? 'Saved ✓'
                    : saveState === 'saving'
                      ? 'Saving…'
                      : 'Save Job'}
                </button>
                <button
                  type="button"
                  className={styles.loggedInButton}
                  onClick={handleApply}
                  disabled={applyState === 'applying' || applyState === 'applied'}
                >
                  {applyState === 'applying' && <Spinner className={styles.spinner} />}
                  {applyState === 'applied'
                    ? 'Applied ✓'
                    : applyState === 'applying'
                      ? 'Applying…'
                      : 'Apply'}
                </button>
              </div>
            </div>

            {applyState === 'applied' && (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <div>
                  <h3 className={styles.successTitle}>Application Submitted!</h3>
                  <p className={styles.successText}>
                    Thank you — our recruitment team will contact you shortly about {jobTitle}.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : null // logged in, no job tied to this LeadForm instance -- nothing to show
      ) : (
        <div className={styles.card}>
          <div className={styles.headerBand}>
            <div className={styles.headerIconWrap}>
              <PhoneIcon className={styles.headerIcon} />
            </div>
            <h2 className={styles.headerTitle}>
              {jobTitle ? `Get a call about ${jobTitle}` : "We'll call you back"}
            </h2>
            <p className={styles.headerSubtitle}>
              Submit your details and our recruitment team will contact you with suitable
              overseas opportunities.
            </p>
          </div>

          <div className={styles.body}>
            {error && (
              <div role="alert" className={styles.errorBox}>
                <AlertIcon className={styles.errorIcon} />
                <p className={styles.errorText}>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className={styles.form}>
              <div>
                <label htmlFor="lead-name" className={styles.fieldLabel}>
                  Full Name <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <UserIcon />
                  </span>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Rakesh Patil"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={`${styles.input} ${styles.inputWithIcon}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-phone" className={styles.fieldLabel}>
                  Phone Number <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <PhoneIcon />
                  </span>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="e.g. 98XXX XXXXX"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={`${styles.input} ${styles.inputWithIcon}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-email" className={styles.fieldLabel}>
                  Email <span className={styles.optionalTag}>(optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <MailIcon />
                  </span>
                  <input
                    id="lead-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={`${styles.input} ${styles.inputWithIcon}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-country" className={styles.fieldLabel}>
                  Interested Country <span className={styles.optionalTag}>(optional)</span>
                </label>
                <select
                  id="lead-country"
                  value={form.country}
                  onChange={(e) => update('country', e.target.value)}
                  className={styles.input}
                  disabled={loadingCountries}
                >
                  <option value="">Any Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={busy} className={styles.submitBtn}>
                {busy && <Spinner className={styles.spinner} />}
                {busy ? 'Sending…' : 'Send My Details'}
              </button>
            </form>

            <p className={styles.footerNote}>
              By continuing, you agree to be contacted by Alzareen International Careers about
              matching roles.
            </p>
          </div>

          {status === 'success' && (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <div>
                <h3 className={styles.successTitle}>Details Submitted Successfully!</h3>
                <p className={styles.successText}>
                  Thank you for your interest. Our recruitment team will contact you shortly
                  regarding suitable overseas job opportunities.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}