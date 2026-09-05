import Breadcrumb from '@/components/SEO/Breadcrumb';
import styles from './CountriesShared.module.css';
import { countries } from './data';
import CountryCard from './CountryCard';
import LeadForm from '@/components/forms/LeadForm';
import HeroSection from '@/components/common/HeroSection';
import ResultNotFound from '@/components/common/ResultNotFound';
import { getCountryJobCount, getJobCountsByCountry } from '@/services/getJobCountsByCountry';

export default async function CountryDetail() {
  const jobCounts = await getJobCountsByCountry();

  const countriesWithJobs = countries
    .map((c) => ({ ...c, liveJobCount: getCountryJobCount(jobCounts, c) }))
    .filter((c) => c.liveJobCount > 0);

  const gccCountries = countriesWithJobs.filter((c) => c.region === 'GCC');
  const asianCountries = countriesWithJobs.filter((c) => c.region === 'Asia');
  const europeanCountries = countriesWithJobs.filter((c) => c.region === 'Europe');
  const africanCountries = countriesWithJobs.filter((c) => c.region === 'Africa');
  const otherCountries = countriesWithJobs.filter(
    (c) => c.region === 'Other' || c.region === 'Other Destinations'
  );

  return (
    <div className={styles.page}>
      <HeroSection
        eyebrow="Global Opportunities"
        title="Explore Overseas Jobs In"
        highlight="Top Destinations"
        description="Discover employment opportunities across Gulf countries, Europe, Asia, and other international destinations."
        stats={[
          { icon: '🌍', value: `${countriesWithJobs.length}+`, label: 'Countries' },
          { icon: '🏙️', value: '150+', label: 'Cities' },
          { icon: '💼', value: '1000+', label: 'Jobs' },
          { icon: '✈️', value: 'Visa Support', label: 'Available' },
        ]}
      />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Countries' }]} />

      <section className={styles.otherCountries} aria-labelledby="other-countries-heading">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>International Job Opportunities</span>
              <h2 id="other-countries-heading" className={styles.sectionTitle}>
                Countries Hiring Indian Workers in 2026
              </h2>
              <p className={styles.sectionDescription}>
                We help candidates find verified overseas employment opportunities across Gulf
                countries, Europe, and Asia. Our recruitment drives connect job seekers with
                employers hiring for construction, engineering, healthcare, logistics, hospitality,
                manufacturing, and technical trade positions. Browse country-specific opportunities,
                salary expectations, visa requirements, and active recruitment campaigns before
                applying for your preferred destination.
              </p>
            </div>
          </div>

          <div className={styles.seoTags}>
            <span>Jobs in UAE</span>
            <span>Jobs in Saudi Arabia</span>
            <span>Jobs in Qatar</span>
            <span>Construction Jobs Abroad</span>
            <span>Gulf Jobs</span>
            <span>Overseas Recruitment</span>
            <span>Free Visa Jobs</span>
            <span>Hiring for Dubai</span>
          </div>

          {countriesWithJobs.length === 0 ? (
            <ResultNotFound
              type="generic"
              title="No active destinations right now"
              message="We're updating our recruitment drives. Check back soon for new country openings."
            />
          ) : (
            <>
              {gccCountries.length > 0 && (
                <>
                  <div className={styles.regionHeader}>
                    <h2>🇦🇪 GCC Countries</h2>
                    <span>{gccCountries.length} destinations</span>
                  </div>
                  <div className={styles.gccGrid}>
                    {gccCountries.map((country) => (
                      <CountryCard key={country.slug} country={country} jobCount={country.liveJobCount} />
                    ))}
                  </div>
                </>
              )}

              {asianCountries.length > 0 && (
                <>
                  <div className={styles.regionHeader}>
                    <h2>🌏 Asia</h2>
                    <span>{asianCountries.length} destinations</span>
                  </div>
                  <div className={styles.grid}>
                    {asianCountries.map((country) => (
                      <CountryCard key={country.slug} country={country} jobCount={country.liveJobCount} />
                    ))}
                  </div>
                </>
              )}

              {europeanCountries.length > 0 && (
                <>
                  <div className={styles.regionHeader}>
                    <h2>🇪🇺 Europe</h2>
                    <span>{europeanCountries.length} destinations</span>
                  </div>
                  <div className={styles.grid}>
                    {europeanCountries.map((country) => (
                      <CountryCard key={country.slug} country={country} jobCount={country.liveJobCount} />
                    ))}
                  </div>
                </>
              )}

              {africanCountries.length > 0 && (
                <>
                  <div className={styles.regionHeader}>
                    <h2>🌍 Africa</h2>
                    <span>{africanCountries.length} destinations</span>
                  </div>
                  <div className={styles.grid}>
                    {africanCountries.map((country) => (
                      <CountryCard key={country.slug} country={country} jobCount={country.liveJobCount} />
                    ))}
                  </div>
                </>
              )}

              {otherCountries.length > 0 && (
                <>
                  <div className={styles.regionHeader}>
                    <h2>🌎 Other Destinations</h2>
                    <span>{otherCountries.length} destinations</span>
                  </div>
                  <div className={styles.grid}>
                    {otherCountries.map((country) => (
                      <CountryCard key={country.slug} country={country} jobCount={country.liveJobCount} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <LeadForm source="countries_page" />
    </div>
  );
}