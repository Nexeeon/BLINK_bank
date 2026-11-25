import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight, X } from 'lucide-react';
import { formatRupiah } from '@/lib/format';

export interface PendingTransaction {
  type: 'transfer' | 'qris' | 'bill' | 'topup';
  title: string;
  serviceLabel: string;
  destination: string;
  amount: number;
  rawDetail: string;
}

interface TransactionPinModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pendingTx: PendingTransaction | null;
  customerPin: string;
}

export default function TransactionPinModal({
  open,
  onClose,
  onSuccess,
  pendingTx,
  customerPin,
}: TransactionPinModalProps) {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state whenever modal opens or closes
  useEffect(() => {
    if (open) {
      setPin('');
      setError(null);
      setShowPin(false);
    }
  }, [open]);

  if (!open || !pendingTx) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const targetPin = customerPin || '123456';

    if (!pin) {
      setError('Sandi salah, silakan coba lagi');
      return;
    }

    if (pin !== targetPin) {
      setError('Sandi salah, silakan coba lagi');
      return;
    }

    // Success!
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-md rounded-bento-lg bg-white p-6 sm:p-7 shadow-lift border border-primary-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center text-inkSoft hover:bg-primary-50 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-pinky-400 text-white flex items-center justify-center shadow-soft mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="mt-3 text-lg font-extrabold text-ink">
            Masukkan Sandi / PIN Transaksi
          </h3>
          <p className="mt-1 text-xs text-inkSoft max-w-xs mx-auto">
            Konfirmasi keamanan untuk menyelesaikan transaksi secara aman.
          </p>
        </div>

        {/* Summary Card */}
        <div className="mt-5 rounded-2xl bg-gradient-to-br from-primary-50/70 to-pinky-50/70 border border-primary-100 p-4">
          <div className="text-center pb-3 border-b border-primary-100/70">
            <p className="text-[11px] font-bold text-inkSoft uppercase tracking-wide">Total Nominal Transaksi</p>
            <p className="text-2xl font-extrabold text-primary-700 tabular-nums mt-0.5">
              {formatRupiah(pendingTx.amount)}
            </p>
          </div>

          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-inkSoft">Jenis Layanan</span>
              <span className="font-bold text-ink">{pendingTx.serviceLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-inkSoft">Tujuan / Penerima</span>
              <span className="font-bold text-ink max-w-[14rem] truncate text-right">
                {pendingTx.destination}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-inkSoft">Biaya Transaksi</span>
              <span className="font-extrabold text-emerald-600">Rp 0 (Gratis)</span>
            </div>
          </div>
        </div>

        {/* PIN Input Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-inkSoft uppercase tracking-wide flex items-center justify-between">
              <span>Sandi / PIN Akun</span>
              <span className="text-[10px] text-inkSoft/75 lowercase font-normal">
                (bawaan awal: 123456)
              </span>
            </label>
            <div className="relative mt-1.5">
              <input
                type={showPin ? 'text' : 'password'}
                autoFocus
                required
                className={`input-field !pr-11 font-mono tracking-wider font-extrabold text-center text-base ${
                  error ? '!border-pinky-500 bg-pinky-50/50' : ''
                }`}
                placeholder="Masukkan Sandi / PIN"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(null);
                }}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-inkSoft hover:text-primary-600 transition-colors p-1"
                aria-label={showPin ? 'Sembunyikan' : 'Tampilkan'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-xl bg-pinky-100/80 border border-pinky-300 p-2.5 text-xs text-pinky-700 flex items-center gap-2 animate-pop-in">
              <AlertCircle className="w-4 h-4 text-pinky-600 shrink-0" />
              <span className="font-bold">{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline flex-1 !py-2.5 !text-xs font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 !py-2.5 !text-xs font-bold"
            >
              Konfirmasi & Bayar
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

