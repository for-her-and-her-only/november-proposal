import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const NO_RESPONSES = [
  'Segmentation fault (core dumped)',
  'Error 403: Permission denied',
  'Option deprecated in v2.0',
  'NullPointerException',
  'Please reconsider',
];

export function getNoResponse(attempt: number) {
  return NO_RESPONSES[(attempt - 1) % NO_RESPONSES.length];
}

interface NoPopupProps {
  response: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function NoPopup({ response, onClose, onConfirm }: NoPopupProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-5"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg border border-rose-bright bg-[#120D0E]"
      >
        <div className="flex items-center justify-between border-b border-rose/60 px-4 py-2.5">
          <span className="font-mono text-[11px] tracking-wide text-blush/70">
            shalini@relationship: ~ (bash)
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            className="text-warm/60 transition-colors duration-500 hover:text-warm"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="space-y-3 px-5 py-6 font-mono text-sm leading-relaxed text-blush sm:text-[15px]">
          <p>
            <span className="text-rose-bright">shalini@relationship:~$</span> ./say_no
          </p>
          <p className="text-warm">{response}</p>
          <p className="text-blush/75">
            // 'No' is not implemented in this version. (You could say no so easily, though, huh?)
          </p>
        </div>

        <div className="flex justify-end border-t border-rose/60 px-5 py-4">
          <button
            type="button"
            onClick={onConfirm}
            className="bg-rose-bright px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-warm transition-colors duration-500 hover:bg-rose"
          >
            sudo say yes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
