import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/constants/BlogData';
import styles from './Blog.module.css';
import NotFound from '../not-found';

// Forces this page to render on every request instead of being statically
// generated at build time — true SSR, as opposed to Next.js's default of
// pre-rendering server components once and reusing the output.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog — Visa Guides, Salary Insights & Interview Tips',
  description:
    'Practical guides on overseas work visas, real salary breakdowns by experience level, and interview prep notes from our placement counsellors.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Alzareen International Careers Blog',
    description: 'Visa guides, salary insights, and interview tips for overseas job seekers.',
    url: '/blog',
    type: 'website',
  },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogIndexPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Alzareen International Careers Blog',
    url: 'https://www.wayportcareers.com/blog',
    hasPart: sorted.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://www.wayportcareers.com/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { '@type': 'Person', name: post.author },
    })),
  };

  return (
    // <div>
    //   <script
    //     type="application/ld+json"
    //     dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    //   />

    //   <section className={styles.hero}>
    //     <div className={styles.container}>
    //       <span className={styles.eyebrow}>Departure lounge reading</span>
    //       <h1 className={styles.title}>Guides before you go</h1>
    //       <p className={styles.lede}>
    //         Visa processes, salary benchmarks, and interview prep, written by our own placement
    //         counsellors.
    //       </p>
    //     </div>
    //   </section>

    //   <section>
    //     <div className={`${styles.container} ${styles.grid}`}>
    //       {sorted.map((post) => (
    //         <article className={styles.card} key={post.slug}>
    //           <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
    //             <div className={styles.cardImageWrap}>
    //               {post.coverImage && (
    //                 <Image
    //                   src={post.coverImage}
    //                   alt={post.coverImageAlt || post.title}
    //                   fill
    //                   sizes="(max-width: 768px) 100vw, 400px"
    //                   className={styles.cardImage}
    //                 />
    //               )}
    //             </div>
    //             <div className={styles.cardBody}>
    //               <span className={styles.cardCategory}>{post.category}</span>
    //               <h2 className={styles.cardTitle}>{post.title}</h2>
    //               <p className={styles.cardExcerpt}>{post.excerpt}</p>
    //               <div className={styles.cardMeta}>
    //                 <span>{formatDate(post.publishedAt)}</span>
    //                 <span>{post.readTimeMinutes} min read</span>
    //               </div>
    //             </div>
    //           </Link>
    //         </article>
    //       ))}
    //     </div>
    //   </section>
    // </div>
    <>
      <NotFound />
    </>
  );
}
