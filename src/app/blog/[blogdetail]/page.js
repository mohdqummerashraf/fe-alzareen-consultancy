import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { posts, getPostBySlug } from '@/constants/BlogData';
import styles from './BlogPost.module.css';

// True per-request SSR, same as the blog index — no static pre-rendering.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { blogdetail } = await params;
  const post = getPostBySlug(blogdetail);

  if (!post) {
    return { title: 'Post not found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, 'Alzareen International Careers', 'overseas jobs blog'],
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.coverImageAlt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: post.coverImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }) {
  const { blogdetail } = await params;
  const post = getPostBySlug(blogdetail);

  if (!post) {
    notFound();
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author, jobTitle: post.authorRole },
    publisher: {
      '@type': 'Organization',
      name: 'Alzareen International Careers',
      logo: { '@type': 'ImageObject', url: 'https://www.wayportcareers.com/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.wayportcareers.com/blog/${post.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: '/blog' },
      { '@type': 'ListItem', position: 2, name: post.title, item: `/blog/${post.slug}` },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <a href="#main-content" className={styles.skipLink}>
        Skip to article
      </a>

      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <div className={styles.container}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{post.title}</li>
          </ol>
          <Link href="/blog" className={styles.backLink}>
            <ArrowLeftIcon width={14} height={14} aria-hidden="true" />
            All articles
          </Link>
        </div>
      </nav>

      <header className={styles.header}>
        <div className={styles.container}>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.byline}>
            <span className={styles.avatar} aria-hidden="true">
              {post.author.charAt(0)}
            </span>
            <span className={styles.bylineAuthor}>
              <span className={styles.bylineName}>{post.author}</span>
              <span className={styles.bylineRole}>{post.authorRole}</span>
            </span>

            <span className={styles.bylineMeta}>
              <span className={styles.bylineMetaItem}>
                <CalendarIcon
                  width={15}
                  height={15}
                  className={styles.bylineIcon}
                  aria-hidden="true"
                />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              <span className={styles.bylineMetaItem}>
                <ClockIcon
                  width={15}
                  height={15}
                  className={styles.bylineIcon}
                  aria-hidden="true"
                />
                <span>{post.readTimeMinutes} min read</span>
              </span>
            </span>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {post.coverImage && (
          <div className={styles.coverImageWrap}>
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 760px"
              className={styles.coverImage}
            />
            <div className={styles.coverScrim} aria-hidden="true" />
          </div>
        )}

        <main id="main-content">
          <article className={styles.article}>
            {post.content.map((block) => (
              <section key={block.heading}>
                <h2>{block.heading}</h2>
                <p>{block.body}</p>
              </section>
            ))}
          </article>

          <section className={styles.ctaBand} aria-labelledby="cta-heading">
            <h2 id="cta-heading">Ready to start your own application?</h2>
            <p>Browse open roles or talk to a counsellor about your documents.</p>
            <Link href="/job-listing" className={styles.ctaButton}>
              Browse open roles
              <ArrowRightIcon width={16} height={16} aria-hidden="true" />
            </Link>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related-heading">
              <h2 id="related-heading" className={styles.relatedHeading}>
                More guides
              </h2>
              <div className={styles.relatedList}>
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className={styles.relatedItem}>
                    <span>{r.title}</span>
                    <ArrowRightIcon
                      width={16}
                      height={16}
                      className={styles.relatedArrow}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className={styles.footerLink}>
            <Link href="/blog">See all articles</Link>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Small inline icon set — no extra dependency                             */
/* ---------------------------------------------------------------------- */

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
