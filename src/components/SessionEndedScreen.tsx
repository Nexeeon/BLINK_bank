import { useState } from 'react';
import { LogIn, UserPlus, PiggyBank, ShieldCheck, CheckCircle2, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Binky from '@/components/Binky';
import { useBank } from '@/context/BankContext';

interface SessionEndedScreenProps {
  onResume: () => void;
  onNewAccount: () => void;
}

export default function SessionEndedScreen({ onResume, onNewAccount }: SessionEndedScreenProps) {
  const { account, showToast } = useBank();
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validPin = account?.pin || '123456';

    if (!pinInput) {
      setError('Masukkan sandi / PIN akunmu terlebih dahulu.');
      return;
    }

    if (pinInput !== validPin) {
      setError('Sandi / PIN salah. Masukkan sandi/PIN yang sesuai dengan akunmu!');
      return;
    }

    showToast(`Selamat datang kembali, ${account?.name.split(' ')[0]}!`);
    onResume();
  };

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
            <Binky size={160} mood="happy" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">Sesi Berakhir</h1>
          <p className="mt-2 text-sm text-inkSoft leading-relaxed">
            {account
              ? `Hai ${account.name.split(' ')[0]}, akun rekenemu tetap aman terkunci rapi dijagain Binky.`
              : 'Kamu sudah keluar dari simulasi BLINK. Duit & data rekenemu tetap aman terkunci rapi.'}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-inkSoft">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-white px-3 py-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Data tersimpan aman
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-white px-3 py-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-pinky-500" />
              Simulasi 100% lokal
            </span>
          </div>

          {/* Form Login Kembali dengan PIN */}
          {account && (
            <form onSubmit={handleLogin} className="mt-6 text-left space-y-3">
              <div>
                <label className="text-xs font-bold text-inkSoft uppercase tracking-wide flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-primary-600" />
                  Masukkan Sandi / PIN Keamanan
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showPin ? 'text' : 'password'}
                    required
                    className="input-field !pr-11 font-mono tracking-wider font-bold text-center"
                    placeholder="Sandi / PIN Akun"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
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
                <p className="text-[10px] text-inkSoft/80 mt-1 text-center">
                  PIN awal: <strong>123456</strong> (atau PIN baru yang kamu ubah di Profil Saya)
                </p>
              </div>

              {error && (
                <div className="rounded-xl bg-pinky-50 border border-pinky-200 p-2.5 text-xs text-pinky-700 flex items-center gap-2 animate-pop-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-pinky-600" />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="btn-primary w-full !py-3">
                <LogIn className="w-4 h-4" />
                Masuk Kembali
              </button>
            </form>
          )}

          {!account && (
            <div className="mt-6">
              <button onClick={onResume} className="btn-primary w-full">
                <LogIn className="w-4 h-4" />
                Masuk Kembali
              </button>
            </div>
          )}

          <div className="mt-3">
            <button onClick={onNewAccount} className="btn-outline w-full !py-2.5 !text-sm">
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
