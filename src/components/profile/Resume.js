'use client';

import { useEffect, useRef, useState } from 'react';
import apiService from '@/services/apiService';
import styles from '@/styles/profile/Resume.module.css';

export default function Resume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await apiService.get('/accounts/resume/');
      setResume(res.data);
    } catch (err) {
      if (err.response?.status !== 404) console.error('Failed to load resume', err);
      setResume(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await apiService.put('/accounts/resume/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResume(res.data);
    } catch (err) {
      console.error('Failed to upload resume', err);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    try {
      await apiService.delete('/accounts/resume/');
      setResume(null);
    } catch (err) {
      console.error('Failed to delete resume', err);
    }
  }

  if (loading) return <div className={styles.loading}>Loading resume…</div>;

  return (
    <div className={styles.wrap}>
      {resume ? (
        <div className={styles.current}>
          <a href={resume.file} target="_blank" rel="noopener noreferrer">
            View current resume
          </a>
          <span>Uploaded {new Date(resume.uploaded_at).toLocaleDateString()}</span>
          <button type="button" onClick={handleDelete}>Remove</button>
        </div>
      ) : (
        <p>No resume uploaded yet.</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
      <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
        {uploading ? 'Uploading…' : resume ? 'Replace Resume' : 'Upload Resume'}
      </button>
    </div>
  );
}