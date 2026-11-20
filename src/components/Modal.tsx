import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-[pop-in_0.2s_ease-out]"
        onClick={onClose}
      />
      <div
        className={`relative ${maxWidth} w-full bg-white rounded-t-bento-lg sm:rounded-bento-lg shadow-lift max-h-[92vh] overflow-y-auto animate-pop-in`}
      >
        <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-primary-100 px-6 py-4 flex items-center justify-between rounded-t-bento-lg">
          <h3 className="font-extrabold text-ink">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-inkSoft hover:bg-primary-100 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
