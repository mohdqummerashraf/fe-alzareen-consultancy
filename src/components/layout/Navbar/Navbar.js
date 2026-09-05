import { MessageCircle } from 'lucide-react';

import Logo from './Logo';
import NavLinks from './NavLinks';
import NavActions from './NavActions';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-paper-3 bg-paper/95 backdrop-blur-lg">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        <Logo />

        <NavLinks />
        <NavActions />

        <button className="hidden items-center gap-3 rounded-full bg-teal px-8 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-ink hover:shadow-card lg:flex">
          <MessageCircle size={20} />
          WhatsApp Us
        </button>
      </div>
    </header>
  );
}
