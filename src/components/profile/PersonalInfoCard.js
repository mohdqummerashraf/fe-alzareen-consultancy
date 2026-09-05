'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/profile/PersonalInfo.module.css';
import { useProfile } from './useProfile';

const EMPTY_FORM = {
  full_name: '',
  interested_country: '',
  bio: '',
  date_of_birth: '',
  nationality: '',
  current_location: '',
  experience_years: '',
};

export default function PersonalInfoCard() {
  const { data, loading, error, saving, updateProfile } = useProfile();
  const [form, setForm] = useState(EMPTY_FORM);
  const [saveState, setSaveState] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    if (!data?.profile) return;
    setForm({
      full_name: data.profile.full_name || '',
      interested_country: data.profile.interested_country || '',
      bio: data.profile.bio || '',
      date_of_birth: data.profile.date_of_birth || '',
      nationality: data.profile.nationality || '',
      current_location: data.profile.current_location || '',
      experience_years: data.profile.experience_years ?? '',
    });
  }, [data]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveState(null);
    const result = await updateProfile(form);
    setSaveState(result.ok ? 'success' : 'error');
  };

  if (loading) return <div className={styles.loading}>Loading profile…</div>;

  if (error === 'unauthenticated') {
    return (
      <div className={styles.emptyState}>
        <p>Please apply to a job or log in to view your profile.</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.emptyState}>Couldn't load your profile. Please try again.</div>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section>
        <h2 className={styles.heading}>Personal Information</h2>
        <div className={styles.grid}>
          <Field label="Full Name" value={form.full_name} onChange={handleChange('full_name')} />
          <Field label="Email" value={data?.user?.email || ''} disabled note="Update via account settings" />
          <Field label="Phone" value={data?.profile?.phone || ''} disabled note="Locked to your quick-apply number" />
          <Field
            label="Date of Birth"
            type="date"
            value={form.date_of_birth}
            onChange={handleChange('date_of_birth')}
          />
          <Field label="Nationality" value={form.nationality} onChange={handleChange('nationality')} />
          <Field label="Current Location" value={form.current_location} onChange={handleChange('current_location')} />
        </div>
      </section>

      <section>
        <h2 className={styles.heading}>Professional Information</h2>
        <div className={styles.grid}>
          <Field
            label="Experience (years)"
            type="number"
            min="0"
            value={form.experience_years}
            onChange={handleChange('experience_years')}
          />
          <Field
            label="Preferred Country"
            value={form.interested_country}
            onChange={handleChange('interested_country')}
          />
        </div>
      </section>

      <section>
        <h2 className={styles.heading}>About</h2>
        <div className={styles.grid}>
          <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" rows={4} value={form.bio} onChange={handleChange('bio')} />
          </div>
        </div>
      </section>

      {saveState === 'success' && <p className={styles.successMsg}>Profile updated successfully.</p>}
      {saveState === 'error' && <p className={styles.errorMsg}>Something went wrong saving your changes.</p>}

      <button type="submit" className={styles.button} disabled={saving}>
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, disabled, note, type = 'text', ...rest }) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} disabled={disabled} {...rest} />
      {note && <span className={styles.fieldNote}>{note}</span>}
    </div>
  );
}