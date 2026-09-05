import { User } from 'lucide-react';
import styles from '@/styles/NavAction.module.css';

const NavActions = () => {
  return (
    <div className={`flex items-center justify-end gap-4 ${styles.mobileActions}`}>
      <button
        className={`btn btn-primary ${styles.jobPostActions}`}
      >
        <a href="/post-job">Post a Job</a>
      </button>

      <button className={`${styles.profileActions}`}>
        <a href="/profile">
          <User size={20} />
        </a>
      </button>
    </div>
  );
};

export default NavActions;
