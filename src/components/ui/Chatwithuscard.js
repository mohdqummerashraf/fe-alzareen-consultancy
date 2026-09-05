import styles from './ChatWithUsCard.module.css';

/**
 * Reusable "chat with us" sidebar card. Drop this on any page — job detail,
 * services, contact — wherever a WhatsApp escape hatch makes sense next to
 * a longer form or content block.
 *
 * - phone: digits only, no +/spaces (e.g. '9198XXXXXXXX') — used to build
 *   the wa.me link.
 * - title / subtitle: override the copy per page if useful
 *   (e.g. "Questions about this role?" vs "Questions about our services?").
 */
export default function Chatwithuscard({
  phone = '9198XXXXXXXX',
  title = 'Have questions?',
  subtitle = 'Chat with a counsellor on WhatsApp — free advice, no obligation.',
}) {
  return (
    <div className={styles.card}>
      <span className={styles.iconWrap} aria-hidden="true">
        <ChatIcon />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        WhatsApp Us
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.3-1.4C8.6 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}
