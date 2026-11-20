import { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, History, Landmark, Wallet, Smartphone } from 'lucide-react';
import { useBank } from '@/context/BankContext';
import { formatRupiah, parseRupiah } from '@/lib/format';
import Binky from '@/components/Binky';

export default function SavingsSimulation({ onDeposit }: { onDeposit: (amount: number) => void }) {
  const { account, addTransaction, transactions, showToast } = useBank();
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'in' | 'out'>('in');

  if (!account) return null;

  const value = parseRupiah(amount);
  const canSubmit = value > 0;

  const submit = () => {
    if (!canSubmit) return;
    const ok = addTransaction({
      type: 'deposit',
      title: mode === 'in' ? 'Setor Tabungan' : 'Tarik Tabungan',
      detail: mode === 'in' ? 'Setoran tunai simulasi' : 'Penarikan tunai simulasi',
      amount: mode === 'in' ? value : -value,
    });
    if (ok) {
      if (mode === 'in') onDeposit(value);
      showToast(mode === 'in' ? 'Setoran berhasil dicatat!' : 'Penarikan berhasil dicatat!');
      setAmount('');
    }
  };

  const recent = transactions.slice(0, 5);

  return (
    <div className="mt-6">
      <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-2 flex items-center gap-1.5">
        <Landmark className="w-3.5 h-3.5" />
        Simulasi Mutasi Rekening
      </p>

      <div className="rounded-2xl border border-primary-100 bg-primary-50/40 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('in')}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all ${
              mode === 'in' ? 'bg-emerald-500 text-white shadow-soft' : 'bg-white text-inkSoft border border-primary-100'
            }`}
          >
            <ArrowDownCircle className="w-3.5 h-3.5" />
            Setor
          </button>
          <button
            onClick={() => setMode('out')}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all ${
              mode === 'out' ? 'bg-pinky-500 text-white shadow-soft' : 'bg-white text-inkSoft border border-primary-100'
            }`}
          >
            <ArrowUpCircle className="w-3.5 h-3.5" />
            Tarik
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-primary-600">Rp</span>
            <input
              className="input-field !pl-9 !py-2.5 text-sm font-bold tabular-nums"
              placeholder="0"
              inputMode="numeric"
              value={amount ? formatRupiah(value).replace('Rp ', '') : ''}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
            />
          </div>
          <button
            onClick={submit}
            disabled={!canSubmit}
            className={`rounded-2xl px-5 text-sm font-bold transition-all ${
              canSubmit
                ? 'bg-gradient-to-r from-primary-600 to-pinky-400 text-white hover:scale-105 active:scale-95'
                : 'bg-primary-100 text-inkSoft/50 cursor-not-allowed'
            }`}
          >
            Kirim
          </button>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {[50000, 100000, 250000].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(String(v))}
              className="rounded-full bg-white border border-primary-100 px-3 py-1 text-[11px] font-bold text-primary-700 hover:bg-primary-100 transition-colors"
            >
              {formatRupiah(v)}
            </button>
          ))}
        </div>
      </div>

      {/* mini history */}
      <div className="mt-4">
        <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <History className="w-3.5 h-3.5" />
          Mutasi Terakhir
        </p>
        {recent.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-primary-100 p-5 text-center">
            <div className="flex justify-center">
              <Binky size={80} mood="wink" />
            </div>
            <p className="text-xs text-inkSoft mt-1">
              Belum ada mutasi. Coba setor atau tarik dana, Binky ikut senang!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-xl bg-white border border-primary-100 px-4 py-2.5 hover:shadow-soft transition-shadow"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      tx.amount >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-pinky-100 text-pinky-600'
                    }`}
                  >
                    {tx.type === 'deposit' ? (
                      <Wallet className="w-4 h-4" />
                    ) : (
                      <Smartphone className="w-4 h-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-ink truncate">{tx.title}</p>
                    <p className="text-[11px] text-inkSoft truncate">{tx.detail}</p>
                  </div>
                </div>
                <p className={`text-sm font-extrabold tabular-nums ${tx.amount >= 0 ? 'text-emerald-600' : 'text-pinky-600'}`}>
                  {tx.amount >= 0 ? '+' : ''}
                  {formatRupiah(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
