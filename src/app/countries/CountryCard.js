import Link from 'next/link';
import styles from './CountriesShared.module.css';

const CountryCard = ({ country, jobCount }) => {
  const displayCount = jobCount ?? country.roleCount;

  return (
    <Link href={`/countries/${country.slug}`} className={styles.countryCard}>
      <div className={styles.countryHeader} style={{ background: country.color }}>
        <span>{country.isoCode}</span>
      </div>

      <div className={styles.countryContent}>
        <h3>{country.name}</h3>
        <p>{country.tagline}</p>
        <div className={styles.salaryTag}>{country.salaryRange}</div>

        <div className={styles.cityList}>
          {country.cities.slice(0, 3).map((city) => (
            <span key={city}>{city}</span>
          ))}
        </div>

        <div className={styles.bottomRow}>
          <strong>{displayCount} Open {displayCount === 1 ? 'Job' : 'Jobs'}</strong>
          <span>Explore →</span>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;