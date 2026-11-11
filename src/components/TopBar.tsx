import { Heart } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MobileMenu from '@/components/MobileMenu';
import { NAV_ITEMS } from '@/lib/navItems';

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rose bg-ink">
      <div className="flex h-14 items-stretch justify-between">
        <div className="flex items-center gap-2.5 px-5 sm:px-8">
          <Heart size={14} strokeWidth={1.5} className="fill-rose-bright text-rose-bright" />
          <span className="font-mono text-xs text-blush">shalini@relationship</span>
        </div>

        <nav aria-label="Files" className="hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center border-l border-rose/40 px-4 font-mono text-xs transition-colors duration-500 xl:px-5 ${
                  isActive
                    ? 'bg-rose/15 text-warm shadow-[inset_0_-2px_0_0_#F6B8C6]'
                    : 'text-warm/60 hover:text-blush'
                }`
              }
            >
              {item.file}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex items-center px-5 text-warm/80 transition-colors duration-500 hover:text-warm lg:hidden"
        >
          <span className="font-mono text-xs tracking-[0.2em]">MENU</span>
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
