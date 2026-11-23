import type { AuthUser } from '@/api/types';
import { FloatingPanel } from '@meridiani/components';
import { useEffect, useRef, useState } from 'react';
import { gameText } from './gameText';
import styles from './page.module.css';

type AccountControlsProps = {
  user: AuthUser | null;
  onLogin: () => void;
  onLogout: () => void;
};

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
  </svg>
);

function AccountControls({ user, onLogin, onLogout }: AccountControlsProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProfileOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isProfileOpen]);

  if (!user) {
    return (
      <button type="button" className={styles.account} onClick={onLogin}>
        <UserIcon />
        {gameText.auth.openLabel}
      </button>
    );
  }

  return (
    <div ref={menuRef} className={`${styles.account} ${styles.accountMenu}`}>
      <button
        type="button"
        className={styles.accountProfile}
        aria-expanded={isProfileOpen}
        aria-haspopup="dialog"
        onClick={() => setIsProfileOpen((open) => !open)}
      >
        <UserIcon />
        <span className={styles.accountName}>{user.username}</span>
      </button>
      <button type="button" className={styles.logout} onClick={onLogout}>
        {gameText.auth.logoutLabel}
      </button>
      {isProfileOpen && (
        <FloatingPanel
          position="top-left"
          priority="high"
          className={styles.profilePanel}
          role="dialog"
          aria-label={gameText.profile.title}
        >
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.profileAvatar} aria-hidden="true">
                {user.username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className={styles.profileEyebrow}>{gameText.profile.eyebrow}</p>
                <h2 className={styles.profileTitle}>{user.username}</h2>
              </div>
            </div>
            <dl className={styles.profileDetails}>
              <div>
                <dt>{gameText.profile.emailLabel}</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt>{gameText.profile.memberSinceLabel}</dt>
                <dd>
                  {new Intl.DateTimeFormat('sl-SI', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format(new Date(user.createdAt))}
                </dd>
              </div>
            </dl>
            <div className={styles.profileActions}>
              <button type="button" className={styles.profileAction}>
                {gameText.profile.editProfile}
              </button>
              <button type="button" className={styles.profileAction}>
                {gameText.profile.myChallenges}
              </button>
              <button type="button" className={styles.profileAction}>
                {gameText.profile.createChallenge}
              </button>
            </div>
          </div>
        </FloatingPanel>
      )}
    </div>
  );
}

export default AccountControls;
