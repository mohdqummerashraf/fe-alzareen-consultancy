'use client';

import { useCallback, useEffect, useState } from 'react';
import apiService from '@/services/apiService';
import api from '@/services/api';

export function useProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.get('/accounts/profile/');
      setData(res.data);
    } catch (err) {
      console.error('Failed to load profile', err);
      const isAuthError =
        err?.message === 'Authentication credentials were not provided.' ||
        err?.message === 'Invalid token.';
      setError(isAuthError ? 'unauthenticated' : 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

// Fields that are nullable on the backend (DateField/IntegerField with
// null=True) -- these must become `null` when empty, since DRF rejects
// "" for them. All other fields are plain CharFields with blank=True,
// default="" -- these must stay as "" when empty, since DRF rejects
// null for CharField by default.
const NULLABLE_FIELDS = new Set(['date_of_birth', 'experience_years']);

const updateProfile = async (fields) => {
  setSaving(true);
  try {
    const payload = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => {
        if (value === '' && NULLABLE_FIELDS.has(key)) {
          return [key, null];
        }
        return [key, value];
      })
    );

    const response = await api.put('/accounts/profile/', payload);
    setData(response.data);
    return { ok: true };
  } catch (err) {
    console.error('Failed to update profile', err);
    const message = err.response?.data?.detail || 'Failed to update profile';
    return { ok: false, error: message };
  } finally {
    setSaving(false);
  }
};

  return { data, loading, error, saving, updateProfile, reload: load };
}