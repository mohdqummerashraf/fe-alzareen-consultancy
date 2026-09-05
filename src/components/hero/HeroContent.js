import styles from './HeroContent.module.css';

export default function HeroContent() {
  return (
    <div>
      <div className={styles.subContent}>
        <span className={styles.eyeBrow}>Licensed Overseas Recruitment · Est. 2016</span>
      </div>

      <div className="space-y-4">
        <h1 className={styles.heading}>
          Your next job is <span className={styles.highlight}>a flight away.</span>
        </h1>
        <p className={styles.description}>
          Alzareen International connects skilled and semi-skilled candidates with verified
          employers across the Gulf, Europe, and beyond - from first application to the day you
          land.
        </p>
      </div>

      <div className={styles.imagePlaceholder} />
    </div>
  );
}
