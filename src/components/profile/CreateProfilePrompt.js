'use client';

import { useEffect, useState } from 'react';
import apiService from '@/services/apiService';
import styles from '@/styles/profile/CreateProfilePrompt.module.css';
import { storeAuth } from '@/services/auth';

const EMPTY_FORM = {
  full_name: '',
  phone: '',
  email: '',
  interested_country: '',
};

export default function CreateProfilePrompt({ onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCountries();
  }, []);

  async function loadCountries() {
    setCountriesLoading(true);
    try {
      const res = await apiService.get('/countries/countries/');
      let allCountries = res.data?.results || [];
      let nextUrl = res.data?.next;

      while (nextUrl) {
        const response = await apiService.get(
          nextUrl.replace(process.env.NEXT_PUBLIC_API_URL, '')
        );
        allCountries = [...allCountries, ...(response.data?.results || [])];
        nextUrl = response.data?.next;
      }

      setCountries(allCountries);
    } catch (err) {
    //   console.error('Failed to load countries', err);
    } finally {
      setCountriesLoading(false);
    }
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.full_name.trim() || !form.phone.trim()) {
      setError('Name and phone number are required.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiService.post('/accounts/quick-apply/', form);
      console.log('Quick apply response', res?.data?.token);
      storeAuth(res.data);
      onCreated?.(res.data.created);
    } catch (err) {
      console.error('Failed to continue', err);
      const apiError =
        err.response?.data?.phone?.[0] ||
        err.response?.data?.detail ||
        'Something went wrong. Please check your details and try again.';
      setError(apiError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h2>Welcome</h2>
        <p className={styles.subtitle}>
          Enter your name and phone number to continue. If you've applied to a job with us
          before, we'll bring back your existing profile automatically — no password needed.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="full_name">Full Name *</label>
            <input
              id="full_name"
              type="text"
              value={form.full_name}
              onChange={handleChange('full_name')}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange('phone')}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email (optional)</label>
            <input id="email" type="email" value={form.email} onChange={handleChange('email')} />
          </div>

          <div className={styles.field}>
            <label htmlFor="interested_country">Interested Country (optional)</label>
            <select
              id="interested_country"
              value={form.interested_country}
              onChange={handleChange('interested_country')}
              disabled={countriesLoading}
            >
              <option value="">
                {countriesLoading ? 'Loading countries…' : 'Select a country'}
              </option>
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? 'Please wait…' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}