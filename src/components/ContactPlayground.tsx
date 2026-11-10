import { contactPieces } from '@/content/portfolio';

export function ContactPlayground() {
  return (
    <div className="contact-playground" data-contact-playground>
      {contactPieces.map(({ label, tone, icon }) => (
        <button key={label} type="button" className="contact-piece" data-tone={tone} data-icon={icon || undefined}
          aria-label={label} aria-haspopup="dialog" data-open-dialog="contact-dialog">
          {icon === 'mail' ? (
            <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="4" y="7" width="24" height="18" rx="3" /><path d="m5 9 11 9 11-9" />
            </svg>
          ) : icon === 'message' ? (
            <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M28 15a12 10 0 0 1-12 10H6l2-5a9 9 0 0 1-4-7C4 7 9 4 16 4s12 5 12 11Z" />
            </svg>
          ) : label}
        </button>
      ))}
    </div>
  );
}
