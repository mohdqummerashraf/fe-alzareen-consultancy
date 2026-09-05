'use client';

import styles from '@/styles/profile/Profile.module.css';
import { useProfile } from './useProfile';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

export default function ProfileHeader({ onEdit }) {
  const { data, loading, error } = useProfile();

  if (loading) {
    return (
      <div className={styles.header}>
        <div className={`${styles.avatar} ${styles.avatarSkeleton}`} />
        <div className={styles.userInfo}>
          <div className={styles.skeletonLine} style={{ width: 160, height: 22 }} />
          <div className={styles.skeletonLine} style={{ width: 220, height: 14, marginTop: 8 }} />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.header}>
        <div className={styles.avatar}>?</div>
        <div className={styles.userInfo}>
          <h1>Welcome</h1>
          <p>Apply to a job to set up your profile.</p>
        </div>
      </div>
    );
  }

  const { user, profile } = data;
  const displayName = profile?.full_name || user?.username || 'Candidate';

  const metaParts = [
    profile?.nationality,
    profile?.current_location,
    profile?.interested_country && `Interested: ${profile.interested_country}`,
  ].filter(Boolean);

  return (
    <div className={styles.header}>
      {profile?.avatar ? (
        <img src={profile.avatar} alt={displayName} className={styles.avatarImg} />
      ) : (
        <div className={styles.avatar}>{getInitials(displayName)}</div>
      )}

      <div className={styles.userInfo}>
        <h1>{displayName}</h1>
        {profile?.bio && <p>{profile.bio}</p>}
        {metaParts.length > 0 && <span>{metaParts.join(' • ')}</span>}
      </div>

      <button className={styles.editButton} onClick={onEdit} type="button">
        Edit Profile
      </button>
    </div>
  );
}