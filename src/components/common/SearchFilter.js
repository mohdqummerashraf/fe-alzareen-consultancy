'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/SearchFilter.module.css';
import apiService from '@/services/apiService';

const POSTED_WITHIN = [
  { value: '', label: 'All Time' },
  { value: '7', label: 'Last 7 Days' },
  { value: '15', label: 'Last 15 Days' },
  { value: '30', label: 'Last 30 Days' },
  { value: '45', label: '45+ Days' },
];

/**
 * Shared filter bar for any listing page (jobs, recruitment drives, etc).
 *
 * @param {string} basePath        - route to push filtered results to, e.g. '/job-listing'
 * @param {string} searchPlaceholder
 * @param {string} submitLabel
 * @param {boolean} showIndustry   - whether to render the Industry/Category dropdown
 * @param {boolean} showInterviewMode - whether to render the Interview Mode dropdown
 */
function SearchFilter({
  basePath,
  searchPlaceholder = 'Search...',
  submitLabel = 'Search',
  showIndustry = false,
  showInterviewMode = false,
}) {
  const [countries, setCountries] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [interviewModes, setInterviewModes] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const emptyFilters = {
    country: '',
    industry: '',
    interviewMode: '',
    postedWithin: '',
    search: '',
  };

  const [filters, setFilters] = useState(emptyFilters);

  useEffect(() => {
    loadFilters();
  }, []);

  async function loadFilters() {
    try {
      const calls = [apiService.get('/countries/countries/')];
      if (showIndustry) calls.push(apiService.get('/categories/'));
      if (showInterviewMode) calls.push(apiService.get('/interview-modes/'));

      const results = await Promise.all(calls);
      const countriesRes = results[0];
      let index = 1;
      const categoriesRes = showIndustry ? results[index++] : null;
      const modesRes = showInterviewMode ? results[index++] : null;

      let allCountries = countriesRes.data?.results || [];
      let nextUrl = countriesRes.data?.next;
      while (nextUrl) {
        const response = await apiService.get(nextUrl.replace(process.env.NEXT_PUBLIC_API_URL, ''));
        allCountries = [...allCountries, ...(response.data?.results || [])];
        nextUrl = response.data?.next;
      }

      setCountries(allCountries);
      if (categoriesRes) setIndustries(categoriesRes.data?.results || []);
      if (modesRes) setInterviewModes(modesRes.data?.results || []);
    } catch (error) {
      // console.error('Failed to load filters', error);
    }
  }

  useEffect(() => {
    setFilters({
      country: searchParams.get('country') || '',
      industry: searchParams.get('industry') || '',
      interviewMode: searchParams.get('interview_mode') || '',
      postedWithin: searchParams.get('posted_within') || '',
      search: searchParams.get('search') || '',
    });
  }, [searchParams]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (filters.country) params.set('country', filters.country);
    if (filters.industry) params.set('industry', filters.industry);
    if (filters.interviewMode) params.set('interview_mode', filters.interviewMode);
    if (filters.postedWithin) params.set('posted_within', filters.postedWithin);
    if (filters.search) params.set('search', filters.search);

    router.push(`${basePath}?${params.toString()}`);
  };

  const handleClear = () => {
    setFilters(emptyFilters);
    router.push(basePath);
  };

  return (
    <section className={styles.filterBar}>
      <div className={styles.filterField}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder={searchPlaceholder}
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div className={styles.filterField}>
        <label htmlFor="country">Country</label>
        <select id="country" name="country" value={filters.country} onChange={handleChange}>
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {showIndustry && (
        <div className={styles.filterField}>
          <label htmlFor="industry">Industry</label>
          <select id="industry" name="industry" value={filters.industry} onChange={handleChange}>
            <option value="">All Industries</option>
            {industries.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {showInterviewMode && (
        <div className={styles.filterField}>
          <label htmlFor="interviewMode">Interview Mode</label>
          <select
            id="interviewMode"
            name="interviewMode"
            value={filters.interviewMode}
            onChange={handleChange}
          >
            <option value="">Any Mode</option>
            {interviewModes.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.filterField}>
        <label htmlFor="postedWithin">Posted Within</label>
        <select
          id="postedWithin"
          name="postedWithin"
          value={filters.postedWithin}
          onChange={handleChange}
        >
          {POSTED_WITHIN.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterActions}>
        <button type="button" className={styles.filterButton} onClick={handleSubmit}>
          {submitLabel}
        </button>
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          disabled={!hasActiveFilters}
        >
          Clear
        </button>
      </div>
    </section>
  );
}

export default SearchFilter;
