'use client';

import { useState } from 'react';
import SavedJobs from './SavedJobCard';
import AppliedJobsCard from './AppliedJobsCard';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import PersonalInfo from './PersonalInfoCard';
import CreateProfilePrompt from './CreateProfilePrompt';
import styles from '@/styles/profile/Profile.module.css';
import Resume from './Resume';
import Documents from './Document';
import AccountCard from './AccountCard';
import { useProfile } from './useProfile';

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState('profile');
  const [welcomeMsg, setWelcomeMsg] = useState(null);
  const { data, loading, error, reload } = useProfile();

  const handleCreated = async (wasNew) => {
    await reload();
    setWelcomeMsg(wasNew ? 'Profile created successfully!' : 'Welcome back!');
    setTimeout(() => setWelcomeMsg(null), 4000);
  };

  if (loading) {
    return (
      <section className={styles.profilePage}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading…</div>
        </div>
      </section>
    );
  }

  if (error === 'unauthenticated' || !data) {
    return (
      <section className={styles.profilePage}>
        <div className={styles.container}>
          <CreateProfilePrompt onCreated={handleCreated} />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.profilePage}>
      <div className={styles.container}>
        {welcomeMsg && <div className={styles.welcomeToast}>{welcomeMsg}</div>}

        <ProfileHeader onEdit={() => setActiveTab('profile')} />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className={styles.content}>
          {activeTab === 'profile' && <PersonalInfo />}
          {activeTab === 'saved' && <SavedJobs />}
          {activeTab === 'applied' && <AppliedJobsCard />}
          {/* {activeTab === 'resume' && <Resume />} */}
          {activeTab === 'documents' && <Documents />}
          {activeTab === 'account' && <AccountCard />}
        </div>
      </div>
    </section>
  );
}