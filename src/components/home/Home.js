import dynamic from 'next/dynamic';

import { countries, serviceList } from '../../constants/Data';
import styles from '@/styles/Home/Home.module.css';
import { PlaneIcon } from '../ui/Icons';
import SearchForm from '../common/SearchForm';
import Link from 'next/link';
import LazySection from '../common/LazySection';

import LatestJobs from './LatestJobs'; // SSR

const FeaturedRecruitment = dynamic(() => import('./FeaturedRecruitment'), {
  loading: () => <div style={{ minHeight: 300 }} />,
});

const LeadForm = dynamic(() => import('../forms/LeadForm'), {
  loading: () => <div style={{ minHeight: 400 }} />,
});

export default function Home() {
  return (
    <div className={styles.page} id="top">
      <main>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div>
              <div className={styles.heroEyebrowRow}>
                <span className={styles.eyebrow}>Licensed Overseas Recruitment · Est. 2018</span>
              </div>
              <h1 id="hero-heading" className={styles.heroTitle}>
                Your next job
                <br />
                is <em>a flight away.</em>
              </h1>
              <p className={styles.lede}>
                Alzareen International connects skilled and semi-skilled candidates with verified
                employers across the Gulf, Europe, and beyond — from first application to the day
                you land.
              </p>
              <SearchForm page={'Home'} />
              <dl className={styles.heroStats}>
                <div>
                  <dt>
                    <strong>5000+</strong>
                  </dt>
                  <dd>candidates placed</dd>
                </div>
                <div>
                  <dt>
                    <strong>28</strong>
                  </dt>
                  <dd>destination countries</dd>
                </div>
                <div>
                  <dt>
                    <strong>96%</strong>
                  </dt>
                  <dd>visa approval rate</dd>
                </div>
              </dl>
            </div>

            <div className={styles.passWrap}>
              <span className={styles.passTag}>Boarding confirmed</span>
              <figure className={styles.pass}>
                <div className={styles.passMain}>
                  <div className={styles.passRoute}>
                    <div>
                      <div className={styles.city}>DEL</div>
                      <div className={styles.code}>Delhi, India</div>
                    </div>
                    <PlaneIcon className={styles.plane} />
                    <div>
                      <div className={styles.city}>DXB</div>
                      <div className={styles.code}>Dubai, UAE</div>
                    </div>
                  </div>
                  <div className={styles.passRow}>
                    <div>
                      <div className={styles.label}>Passenger</div>
                      <div className={styles.value}>A. Sharma</div>
                    </div>
                    <div>
                      <div className={styles.label}>Role</div>
                      <div className={styles.value}>HVAC Technician</div>
                    </div>
                  </div>
                  <div className={styles.passRow}>
                    <div>
                      <div className={styles.label}>Employer</div>
                      <div className={styles.value}>Al Futtaim Group</div>
                    </div>
                    <div>
                      <div className={styles.label}>Contract</div>
                      <div className={styles.value}>24 Months</div>
                    </div>
                  </div>
                </div>
                <div className={styles.passStub}>
                  <div className={styles.qr} aria-hidden="true" />
                  <div className={styles.seat}>
                    SEAT
                    <br />
                    12-C
                  </div>
                </div>
                <figcaption
                  className="sr-only"
                  style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}
                >
                  Sample boarding pass for a candidate placed as an HVAC Technician with Al Futtaim
                  Group in Dubai, UAE
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        {/* Latest Featured Jobs */}
        <LatestJobs />
        {/* Recruitment Drives */}
        <LazySection>
          <FeaturedRecruitment />
        </LazySection>
        {/* Services */}
        <section id="services" className={styles.section} aria-labelledby="services-heading">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>Overseas Recruitment Services</span>

                <h2 id="services-heading">Complete Recruitment Support</h2>
              </div>

              <p>
                From job matching and interviews to documentation, visa processing, medical
                examinations and deployment assistance, we support candidates throughout the
                overseas recruitment journey.
              </p>
            </div>
            <div className={styles.servicesBand}>
              <div className={styles.servicesGrid}>
                {serviceList.map((service) => (
                  <div className={styles.serviceCell} key={service.title}>
                    <div className={styles.stamp} aria-hidden="true">
                      <service.logo size={22} className={styles.servicesLogo} />
                    </div>

                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Countries */}
        <section id="countries" className={styles.section} aria-labelledby="countries-heading">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>Destinations</span>
                <h2 id="countries-heading" style={{ marginTop: 12 }}>
                  Where candidates go
                </h2>
              </div>
              <p>
                Every destination is backed by our on-ground partners for documentation,
                orientation, and after-landing support.
              </p>
            </div>

            <div className={styles.countriesGrid}>
              {countries.map((country) => (
                <article className={styles.countryCard} key={country.code}>
                  <Link
                    href={country.link}
                    className={styles.countryLink}
                    aria-label={`View open roles in ${country.name}`}
                  >
                    <div
                      className={styles.flagchip}
                      style={{ background: country.color }}
                      aria-hidden="true"
                    >
                      {country.code}
                    </div>
                    <h3>{country.name}</h3>
                    <p className={styles.countryRoles}>{country.roles}</p>
                    <div className={styles.countryMeta}>
                      <span>{country.roleCount}</span>
                      <span>{country.salaryRange}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* Reviews */}
        {/* <section id="reviews" className={styles.section} aria-labelledby="reviews-heading">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>Landed &amp; working</span>
                <h2 id="reviews-heading" style={{ marginTop: 12 }}>
                  What candidates say
                </h2>
              </div>
              <p>
                Every review is from a candidate we&apos;ve placed and stayed in touch with after
                arrival.
              </p>
            </div>

            <div className={styles.reviewsGrid}>
              {reviews.map((review) => (
                <figure className={styles.stubCard} key={review.name}>
                  <div className={styles.stars} aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <blockquote className={styles.quote}>&ldquo;{review.quote}&rdquo;</blockquote>
                  <figcaption className={styles.stubFoot}>
                    <div className={styles.avatar} aria-hidden="true">
                      {review.initial}
                    </div>
                    <div className={styles.who}>
                      <strong>{review.name}</strong>
                      <span>{review.role}</span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section> */}
        {/* Blog */}
        {/* <section id="blog" className={styles.section} aria-labelledby="blog-heading">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>Departure lounge reading</span>
                <h2 id="blog-heading" style={{ marginTop: 12 }}>
                  Guides before you go
                </h2>
              </div>
              <p>
                Visa processes, salary benchmarks, and interview prep, written by our own placement
                counsellors.
              </p>
            </div>

            <div className={styles.blogGrid}>
              {articles.map((article) => (
                <article className={styles.blogCard} key={article.title}>
                  <div className={styles.blogThumb} style={{ background: article.gradient }}>
                    <span>{article.tag}</span>
                  </div>
                  <div className={styles.blogBody}>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <a href="#">Read the guide →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section> */}
        {/* Contact */}
        <LazySection rootMargin="500px">
          <LeadForm jobTitle="Counsellor" />
        </LazySection>{' '}
      </main>
    </div>
  );
}
