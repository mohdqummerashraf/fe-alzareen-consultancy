import styles from '@/styles/Breadcrumb.module.css';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alzareenglobaloverseas.com';

export default function Breadcrumb({ items = [] }) {
  if (items.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',

    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',

      position: index + 1,

      name: item.label,

      ...(item.href && {
        item: `${SITE_URL}${item.href}`,
      }),
    })),
  };

  return (
    <>
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* Visible breadcrumb */}
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <div className={styles.container}>
          <ol className={styles.list}>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <li key={`${item.label}-${index}`} className={styles.item}>
                  {isLast ? (
                    <span aria-current="page" className={styles.current}>
                      {item.label}
                    </span>
                  ) : (
                    <>
                      <Link href={item.href}>{item.label}</Link>

                      <span aria-hidden="true" className={styles.separator}>
                        /
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
