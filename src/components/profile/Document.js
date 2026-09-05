'use client';

import { useEffect, useRef, useState } from 'react';
import apiService from '@/services/apiService';
import styles from '@/styles/profile/Document.module.css';

const DOC_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'certificate', label: 'Certificate' },
  { value: 'id_proof', label: 'ID Proof' },
  { value: 'experience_letter', label: 'Experience Letter' },
  { value: 'other', label: 'Other' },
];

export default function Document() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [docType, setDocType] = useState('other');
  const fileInputRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await apiService.get('/accounts/documents/');
      setDocuments(res.data?.results || res.data || []);
    } catch (err) {
      console.error('Failed to load documents', err);
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
    formData.append('document_type', docType);
    formData.append('name', file.name);

    try {
      const res = await apiService.post('/accounts/documents/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDocuments((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error('Failed to upload document', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleDelete(id) {
    try {
      await apiService.delete(`/accounts/documents/${id}/`);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error('Failed to delete document', err);
    }
  }

  if (loading) return <div className={styles.loading}>Loading documents…</div>;

  return (
    <div className={styles.wrap}>
      <div className={styles.uploadRow}>
        <select value={docType} onChange={(e) => setDocType(e.target.value)}>
          {DOC_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <input ref={fileInputRef} type="file" onChange={handleUpload} disabled={uploading} />
      </div>

      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul className={styles.list}>
          {documents.map((doc) => (
            <li key={doc.id}>
              <a href={doc.file} target="_blank" rel="noopener noreferrer">
                {doc.name || doc.document_type}
              </a>
              <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
              <button type="button" onClick={() => handleDelete(doc.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}