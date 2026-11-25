import { useState } from 'react';
import { Eye, EyeOff, Copy, Nfc, Check, RotateCcw } from 'lucide-react';
import { useBank } from '@/context/BankContext';
import { formatRupiah } from '@/lib/format';
import Binky from '@/components/Binky';

export default function VirtualCard() {
  const { account, balanceVisible, setBalanceVisible, showToast } = useBank();
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!account) return null;

  const safeNumber = account.number || '8888000012';
  const safeName = account.name || 'Nasabah BLINK';
  const safeBalance = account.balance ?? 0;

  const maskedNumber = () => `•••• •••• •••• ${safeNumber.slice(-4)}`;

  const copyNumber = () => {
    navigator.clipboard?.writeText(safeNumber).catch(() => {});
    setCopied(true);
    showToast('Nomor rekening disalin!');
    setTimeout(() => setCopied(false), 1500);
  };

  const cvv = safeNumber.slice(-3).padStart(3, '9');

  return (
    <div className="[perspective:1400px]">
      <div
        className={`relative w-full max-w-sm mx-auto aspect-[8/5] cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : 'hover:[transform:rotateY(8deg)] hover:scale-[1.02]'
        } ${flipped ? '' : 'transition-transform'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.2, 0.2, 1)' }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* ===== FRONT ===== */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-bento-lg bg-gradient-to-br from-primary-500 via-primary-400 to-pinky-400 p-5 shadow-lift overflow-hidden">
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/15" />
          <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-pinky-300/30" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10 blur-xl" />

          <div className="relative h-full flex flex-col justify-between text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-white/95 flex items-center justify-center shadow-soft">
                    <span className="block w-3 h-3 rounded-full bg-gradient-to-br from-primary-500 to-pinky-400" />
                  </span>
                  <p className="text-lg font-extrabold tracking-tight">BLINK.</p>
                  {account.productType === 'puresave' && (
                    <span className="text-[9px] font-extrabold bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      PureSave
                    </span>
                  )}
                </div>
                <p className="text-[9px] font-semibold tracking-[0.18em] uppercase mt-0.5 opacity-90">
                  Smart Banking, Happy Living
                </p>
              </div>
              <Nfc className="w-6 h-6 opacity-80" />
            </div>

            <p className="text-base md:text-lg font-bold tracking-[0.18em] tabular-nums" data-number>
              {balanceVisible
                ? safeNumber.replace(/(\d{4})(?=\d)/g, '$1 ')
                : maskedNumber()}
            </p>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] opacity-75">Nama Nasabah</p>
                <p className="text-sm font-bold max-w-[10rem] truncate uppercase">{safeName}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.15em] opacity-75">Saldo</p>
                <p className="text-lg font-extrabold tabular-nums">
                  {balanceVisible ? formatRupiah(safeBalance) : 'Rp •••••••'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BACK ===== */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-bento-lg bg-gradient-to-br from-ink via-primary-900 to-primary-800 shadow-lift overflow-hidden">
          {/* magnetic strip */}
          <div className="absolute top-5 inset-x-0 h-9 bg-black/80" />
          <div className="absolute top-[52px] inset-x-0 h-px bg-white/10" />

          <div className="relative h-full flex flex-col justify-end pb-4">
            {/* Binky center */}
            <div className="absolute inset-0 flex items-center justify-center pt-6 pointer-events-none">
              <Binky size={120} mood="wink" />
            </div>

            <div className="relative flex items-center justify-between px-5">
              <div className="flex items-center gap-2">
                <div className="h-8 w-32 rounded-md bg-gradient-to-r from-white/90 to-white/70 flex items-center px-2">
                  <p className="text-[9px] font-bold text-ink/60 italic">Tanda Tangan</p>
                </div>
                <div className="h-8 rounded-md bg-white/90 px-2.5 flex items-center">
                  <p className="text-xs font-extrabold text-ink tabular-nums italic">CVV {cvv}</p>
                </div>
              </div>
              <p className="text-lg font-extrabold text-white/90 tracking-tight">BLINK.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        <button
          onClick={() => setFlipped(!flipped)}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-600 to-pinky-400 px-4 py-2 text-xs font-bold text-white shadow-soft hover:scale-105 active:scale-95 transition-transform"
        >
          <RotateCcw className={`w-3.5 h-3.5 transition-transform duration-500 ${flipped ? 'rotate-180' : ''}`} />
          {flipped ? 'Lihat Depan' : 'Balik Kartu'}
        </button>
        <button
          onClick={() => setBalanceVisible(!balanceVisible)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-primary-200 px-4 py-2 text-xs font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
        >
          {balanceVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {balanceVisible ? 'Sembunyikan' : 'Tampilkan'}
        </button>
        <button
          onClick={copyNumber}
          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-primary-200 px-4 py-2 text-xs font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Tersalin' : 'Salin No. Rek'}
        </button>
      </div>
    </div>
  );
}
