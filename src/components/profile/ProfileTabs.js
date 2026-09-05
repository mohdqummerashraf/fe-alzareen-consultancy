import { User, Heart, Briefcase, FileText, Folder, Settings, Shield } from 'lucide-react';

import styles from '@/styles/profile/Profile.module.css';

const tabs = [
  {
    id: 'profile',
    title: 'Profile',
    icon: User,
  },
  {
    id: 'saved',
    title: 'Saved Jobs',
    icon: Heart,
  },
  {
    id: 'applied',
    title: 'Applied',
    icon: Briefcase,
  },
  // {
  //   id: 'resume',
  //   title: 'Resume',
  //   icon: FileText,
  // },
  {
    id: 'documents',
    title: 'Documents',
    icon: Folder,
  },
  {
    id: 'account',
    title: 'Account',
    icon: Settings,
  },
];

export default function ProfileTabs({ activeTab, setActiveTab }) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
          >
            <Icon size={18} />

            {tab.title}
          </button>
        );
      })}
    </div>
  );
}
