import { CheckCircle2, Share2, Check, Download, PiggyBank, Copy, X } from 'lucide-react';
import { useState } from 'react';
import Binky from '@/components/Binky';
import { formatRupiah } from '@/lib/format';

export interface ReceiptData {
  id: string;
  title: string;
  serviceLabel: string;
  destination: string;
  amount: number;
  timestamp: number;
  sourceName: string;
  sourceNumber: string;
}

interface TransactionReceiptModalProps {
  open: boolean;
  onClose: () => void;
  receipt: ReceiptData | null;
  onToast: (msg: string) => void;
}

export default function TransactionReceiptModal({
  open,
  onClose,
  receipt,
  onToast,
}: TransactionReceiptModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open || !receipt) return null;

  const isTransfer = receipt.serviceLabel.toLowerCase().includes('transfer');
  const modalTitle = isTransfer ? 'Transfer Berhasil!' : 'Pembayaran Berhasil!';

  const formattedDate = new Date(receipt.timestamp).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' WIB';

  const handleShareOrCopy = () => {
    const textToCopy = `==================================
        STRUK TRANSAKSI BLINK
       Smart Banking, Happy Living
==================================
Judul: ${modalTitle}
No. Referensi: ${receipt.id}
Waktu: ${formattedDate}
Nominal: ${formatRupiah(receipt.amount)}
Layanan: ${receipt.serviceLabel}
Tujuan: ${receipt.destination}
Sumber: Tabungan BLINK (${receipt.sourceName} • ${receipt.sourceNumber})
Biaya Admin: Rp 0 (Gratis)
Status: BERHASIL (LUNAS)
==================================`;

    navigator.clipboard?.writeText(textToCopy).catch(() => {});
    setCopied(true);
    onToast('Bukti transaksi berhasil disalin/disimpan!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-md bg-white rounded-bento-lg shadow-lift border-2 border-primary-100 overflow-hidden">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 w-8 h-8 rounded-full bg-white/80 border border-primary-100 flex items-center justify-center text-inkSoft hover:bg-primary-50 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* E-Receipt Card Container */}
        <div className="p-6 sm:p-7 relative">
          {/* Top Header: Logo BLINK & Mascot Binky */}
          <div className="flex items-center justify-between pb-4 border-b border-primary-100/70">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-pinky-400 flex items-center justify-center shadow-soft">
                <PiggyBank className="w-4.5 h-4.5 text-white" />
              </span>
              <div className="leading-tight">
                <p className="font-extrabold text-base tracking-tight text-ink">
                  BLINK<span className="text-primary-600">.</span>
                </p>
                <p className="text-[9px] font-semibold text-inkSoft uppercase tracking-wider">
                  Smart Banking, Happy Living
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="animate-float">
                <Binky size={58} mood="happy" accessory="piggy" />
              </div>
            </div>
          </div>

          {/* Success Title & Big Nominal */}
          <div className="text-center py-5">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft mb-2">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-ink tracking-tight">{modalTitle}</h3>
            <p className="text-3xl sm:text-4xl font-extrabold text-primary-700 tabular-nums mt-1.5">
              {formatRupiah(receipt.amount)}
            </p>
            <p className="text-[11px] text-inkSoft mt-1">Saldo rekening telah dipotong secara real-time</p>
          </div>

          {/* Perforated / Dashed Divider with Notches ala DANA / m-banking */}
          <div className="relative my-2">
            <div className="absolute -left-10 -top-3 w-6 h-6 rounded-full bg-cream border-r-2 border-primary-100" />
            <div className="border-t-2 border-dashed border-primary-200" />
            <div className="absolute -right-10 -top-3 w-6 h-6 rounded-full bg-cream border-l-2 border-primary-100" />
          </div>

          {/* Receipt Breakdown (Left Label, Right Value) */}
          <div className="py-4 space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-inkSoft font-medium">Status</span>
              <span className="inline-flex items-center gap-1 font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[11px]">
                <Check className="w-3 h-3 stroke-[3]" />
                Berhasil
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-inkSoft font-medium">Tanggal & Waktu</span>
              <span className="font-semibold text-ink">{formattedDate}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-inkSoft font-medium">ID Transaksi / No. Ref</span>
              <span className="font-mono text-[11px] font-extrabold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-100">
                {receipt.id}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-inkSoft font-medium">Jenis Layanan</span>
              <span className="font-bold text-ink">{receipt.serviceLabel}</span>
            </div>

            <div className="flex justify-between items-start gap-4">
              <span className="text-inkSoft font-medium shrink-0">Tujuan / Merchant</span>
              <span className="font-bold text-ink text-right break-words">{receipt.destination}</span>
            </div>

            <div className="flex justify-between items-start gap-4">
              <span className="text-inkSoft font-medium shrink-0">Sumber Dana</span>
              <span className="font-semibold text-ink text-right">
                Tabungan BLINK ({receipt.sourceName} • {receipt.sourceNumber})
              </span>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-primary-100/60">
              <span className="text-inkSoft font-medium">Biaya Admin</span>
              <span className="font-extrabold text-emerald-600">Rp 0 (Gratis)</span>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-3 flex gap-2.5">
            <button
              onClick={handleShareOrCopy}
              className="btn-outline flex-1 !py-2.5 !text-xs font-bold flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Bagikan / Simpan Bukti'}</span>
            </button>

            <button
              onClick={onClose}
              className="btn-primary flex-1 !py-2.5 !text-xs font-bold"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

