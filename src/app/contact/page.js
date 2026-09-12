import LeadForm from '@/components/forms/LeadForm';
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import styles from './Contact.module.css';

const OFFICE_ADDRESS = 'Alzareen International Careers, 3rd Floor, Nehru Place, New Delhi, 110019';

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`;
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed`;

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>We’re here to help</span>
        <h1 className={styles.title}>Talk to a real person</h1>
        <p className={styles.subtitle}>
          Call us, send a WhatsApp message, or visit our office. We are happy to guide you.
        </p>
      </header>

      <section className={styles.tilesSection} aria-label="Contact options">
        <div className={styles.tilesGrid}>
          <a href="tel:+917479744885" className={styles.tile}>
            <span className={`${styles.tileIcon} ${styles.tileIconCall}`}>
              <Phone size={28} aria-hidden="true" />
            </span>
            <h2 className={styles.tileTitle}>Call Us</h2>
            <p className={styles.tileSub}>Monday–Saturday, 9 AM–7 PM</p>
            <p className={styles.tileValue}>+91 7479744885</p>
          </a>

          <a
            href="https://wa.me/917479744885"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tile}
          >
            <span className={`${styles.tileIcon} ${styles.tileIconWhatsapp}`}>
              <MessageCircle size={28} aria-hidden="true" />
            </span>
            <h2 className={styles.tileTitle}>WhatsApp Us</h2>
            <p className={styles.tileSub}>Fastest reply, usually under one hour</p>
            <p className={styles.tileValue}>Chat Now</p>
          </a>

          <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className={styles.tile}>
            <span className={`${styles.tileIcon} ${styles.tileIconVisit}`}>
              <MapPin size={28} aria-hidden="true" />
            </span>
            <h2 className={styles.tileTitle}>Visit Our Office</h2>
            <p className={styles.tileSub}>Nehru Place, New Delhi</p>
            <p className={styles.tileValue}>Get Directions</p>
          </a>
        </div>
      </section>

      <section id="office" className={styles.officeSection}>
        <div className={styles.officeCard}>
          <div className={styles.officeRow}>
            <span className={styles.officeIcon}>
              <MapPin size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className={styles.officeTitle}>Office Address</h2>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.officeText}
              >
                {OFFICE_ADDRESS}
              </a>
            </div>
          </div>

          <div className={styles.officeRow}>
            <span className={styles.officeIcon}>
              <Clock size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className={styles.officeTitle}>Office Hours</h2>
              <p className={styles.officeText}>Monday–Saturday, 9:00 AM to 7:00 PM</p>
            </div>
          </div>

          <div className={styles.officeRow}>
            <span className={styles.officeIcon}>
              <Mail size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className={styles.officeTitle}>Email</h2>
              <a href="mailto:hello@alzareenglobaloverseas.com" className={styles.officeText}>
                hello@alzareenglobaloverseas.com
              </a>
            </div>
          </div>

          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsButton}
          >
            <Navigation size={17} aria-hidden="true" />
            Open in Google Maps
          </a>
        </div>

        <div className={styles.mapCard}>
          <iframe
            className={styles.map}
            title="Map to Alzareen International Careers"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className={styles.formSection}>
        <LeadForm source="contact_page" />
      </section>
    </main>
  );
}
