import { LogIn, UserPlus, PiggyBank, ShieldCheck, Sparkles } from 'lucide-react';
import Binky from '@/components/Binky';

interface SessionEndedScreenProps {
  onResume: () => void;
  onNewAccount: () => void;
}

export default function SessionEndedScreen({ onResume, onNewAccount }: SessionEndedScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-5 py-10 animate-pop-in">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-200 via-pinky-100 to-primary-100" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-300/40 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-pinky-300/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="glass rounded-bento-lg shadow-lift p-8 text-center border-2 border-white/80">
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-pinky-400 flex items-center justify-center shadow-soft">
            <PiggyBank className="w-6 h-6 text-white" />
          </div>
          <p className="mt-3 text-xs font-bold text-primary-700 tracking-[0.18em] uppercase">
            Smart Banking, Happy Living
          </p>

          <div className="mt-2 flex justify-center animate-float">
            <Binky size={180} mood="happy" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">Sesi Berakhir</h1>
          <p className="mt-2 text-sm text-inkSoft leading-relaxed">
            Kamu sudah keluar dari simulasi BLINK. Duit & data rekenemu tetap aman terkunci
            rapi — Binky yang jagain!
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-inkSoft">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-white px-3 py-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Data tersimpan aman
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-white px-3 py-1 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-pinky-500" />
              Simulasi 100% lokal
            </span>
          </div>

          <div className="mt-7 space-y-3">
            <button onClick={onResume} className="btn-primary w-full">
              <LogIn className="w-4 h-4" />
              Masuk Kembali (Simulasi Instan)
            </button>
            <button onClick={onNewAccount} className="btn-outline w-full">
              <UserPlus className="w-4 h-4" />
              Buka Rekening Baru
            </button>
          </div>

          <p className="mt-5 text-[11px] text-inkSoft/80">
            BLINK Digital Bank — simulasi edukasi, bukan bank sungguhan.
          </p>
        </div>
      </div>
    </div>
  );
}
