'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/SearchForm.module.css';
import apiService from '@/services/apiService';

const POSTED_WITHIN = [
  { value: '', label: 'All Time' },
  { value: '7', label: 'Last 7 Days' },
  { value: '15', label: 'Last 15 Days' },
  { value: '30', label: 'Last 30 Days' },
  { value: '45', label: '45+ Days' },
];

function SearchForm({ onSearch, page }) {
  const [filters, setFilters] = useState({
    industry: '',
    country: '',
    postedWithin: '',
  });

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      const [categoriesRes, countriesRes] = await Promise.all([
        apiService.get('/categories/'),
        apiService.get('/countries/countries/'),
      ]);

      setCategories(categoriesRes.data?.results || []);

      // if pagination exists
      let allCountries = countriesRes.data?.results || [];
      let nextUrl = countriesRes.data?.next;

      while (nextUrl) {
        const url = nextUrl.replace(process.env.NEXT_PUBLIC_API_URL, '');

        const response = await apiService.get(url);

        allCountries = [...allCountries, ...(response.data?.results || [])];

        nextUrl = response.data?.next;
      }

      setCountries(allCountries);
    } catch (error) {
      // console.error('Failed to load search filters', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch?.({
      category: filters.industry,
      country: filters.country,
      postedWithin: filters.postedWithin,
    });
  };

  return (
    <form
      className={styles.searchCard}
      role="search"
      aria-label="Search jobs"
      onSubmit={handleSubmit}
    >
      <div className={`${styles.field} ${styles.fieldDivider}`}>
        <label htmlFor="industry">Industry</label>

        <select
          id="industry"
          name="industry"
          value={filters.industry}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="">All Industries</option>

          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={`${styles.field} ${styles.fieldDivider}`}>
        <label htmlFor="country">Country</label>

        <select
          id="country"
          name="country"
          value={filters.country}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="">Any Country</option>

          {countries.map((country) => (
            <option key={country.id} value={country.slug}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {page !== 'Home' && (
        <div className={styles.field}>
          <label htmlFor="postedWithin">Posted Within</label>

          <select
            id="postedWithin"
            name="postedWithin"
            value={filters.postedWithin}
            onChange={handleChange}
          >
            {POSTED_WITHIN.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit" className={styles.searchBtn}>
        Search Jobs
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          aria-hidden="true"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}

export default SearchForm;
