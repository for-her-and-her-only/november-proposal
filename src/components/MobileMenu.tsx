import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/navItems';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink px-6 pb-10"
        >
          <div className="flex h-14 shrink-0 items-center justify-between">
            <span className="font-mono text-xs text-blush/70">ls ~/relationship</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex items-center text-warm/80 transition-colors duration-500 hover:text-warm"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav aria-label="Files" className="mt-10 flex flex-col">
            {NAV_ITEMS.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-end justify-between gap-4 border-b border-rose/40 py-5 transition-colors duration-500 ${
                    isActive ? 'text-blush' : 'text-warm hover:text-blush'
                  }`
                }
              >
                <span className="flex flex-col">
                  <span className="font-serif text-4xl leading-none">{item.file}</span>
                  <span className="mt-2 font-mono text-[11px] text-warm/55">{item.note}</span>
                </span>
                <span className="font-mono text-[11px] text-warm/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
