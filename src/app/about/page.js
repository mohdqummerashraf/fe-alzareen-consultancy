import AboutPageDetail from './AboutPageDetail';

export const metadata = {
  title: 'About Us | Alzareen International Manpower Consultancy',
  description:
    'Alzareen International Manpower Consultancy connects skilled and unskilled talent from India with formal and informal sector opportunities across the GCC, ASEAN, Russia, Georgia, Turkey, Maldives, Mauritius, and Central Asia.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alzareeninternational.com'}/about`,
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return <AboutPageDetail />;
}