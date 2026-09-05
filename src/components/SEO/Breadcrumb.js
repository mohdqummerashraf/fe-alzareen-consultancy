import Link from 'next/link';
import styles from '@/styles/Breadcrumb.module.css';

export default function Breadcrumb({ items = [] }) {
  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://www.alzareeninternational.com${item.href}` }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <div className={styles.container}>
          <ol className={styles.list}>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <li key={item.label} className={styles.item}>
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