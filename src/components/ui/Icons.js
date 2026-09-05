export function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M4 5c0-1.1.9-2 2-2h1.5a1 1 0 0 1 1 .8l.8 3.6a1 1 0 0 1-.5 1.1L7.2 9.7a12 12 0 0 0 6 6l1.2-1.6a1 1 0 0 1 1.1-.5l3.6.8a1 1 0 0 1 .8 1V17c0 1.1-.9 2-2 2h-1C10.4 19 4 12.6 4 6V5z" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

export function AlertIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export function Spinner(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PlaneIcon(props) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5z" />
    </svg>
  );
}
