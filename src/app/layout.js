import { IBM_Plex_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Navbar/Header';
import Footer from '@/components/layout/Footer/Footer';
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
  title: 'Alzareen International | GCC Jobs',
  description: 'Trusted GCC manpower recruitment platform',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-default text-heading bg-paper">
        <Header />
        {children}
        <WhatsappSticky />
        <Footer />
      </body>
    </html>
  );
}
