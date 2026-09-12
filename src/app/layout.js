import { Geist_Mono, IBM_Plex_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Navbar/Header';
import WhatsappSticky from '@/components/ui/WhatsappSticky';

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Alzareen Global Overseas | GCC Jobs',
  description: 'Trusted GCC manpower recruitment and overseas jobs platform',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-default text-heading bg-paper">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N30Z3FMVR9"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-N30Z3FMVR9');
          `}
        </Script>

        <Header />
        {children}
        <WhatsappSticky />
        <Footer />
      </body>
    </html>
  );
}
