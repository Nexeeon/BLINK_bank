import { useState } from 'react';
import { ExternalLink, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import Binky from '@/components/Binky';
import { formatRupiah, parseRupiah } from '@/lib/format';
import Modal from '@/components/Modal';

const DEPO_FORM_URL = 'https://forms.google.com/contoh-deposito-blink';

const tenors = [
  { months: 1, rate: 4.5, label: '1 Bulan' },
  { months: 3, rate: 4.75, label: '3 Bulan' },
  { months: 6, rate: 5.25, label: '6 Bulan' },
  { months: 12, rate: 6.0, label: '12 Bulan' },
];

export default function DepositoSection() {
  const [nominal, setNominal] = useState(10000000);
  const [tenorIdx, setTenorIdx] = useState(3);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const tenor = tenors[tenorIdx];
  const interest = Math.round((nominal * tenor.rate * tenor.months) / (12 * 100));
  const total = nominal + interest;
  const monthlyAvg = Math.round(interest / tenor.months);

  return (
    <div className="mt-10 animate-pop-in grid lg:grid-cols-2 gap-6 items-stretch">
      {/* Info card */}
      <div className="card-bento p-7 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-primary-100/70" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-700 to-pinky-500 flex items-center justify-center shadow-soft">
              <Sparkles className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="text-xl font-extrabold">BLINK TimeVault</h3>
              <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">Deposito Berjangka</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-2">Suku Bunga per Tenor</p>
            <div className="grid grid-cols-4 gap-2">
              {tenors.map((t) => (
                <div
                  key={t.months}
                  className={`rounded-2xl px-2 py-3 text-center border transition-all ${
                    t.rate === tenor.rate
                      ? 'bg-gradient-to-b from-primary-500 to-pinky-400 text-white border-transparent shadow-lift scale-105'
                      : 'bg-primary-50 border-primary-100 text-primary-700'
                  }`}
                >
                  <p className="text-[11px] font-bold">{t.label}</p>
                  <p className="text-sm font-extrabold mt-0.5">{t.rate.toLocaleString('id-ID')}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-primary-50 border border-primary-100 px-4 py-3">
              <p className="text-[11px] font-bold text-inkSoft uppercase tracking-wide">Minimum Penempatan</p>
              <p className="font-extrabold text-primary-700 mt-0.5">Rp 1.000.000</p>
            </div>
            <div className="rounded-2xl bg-primary-50 border border-primary-100 px-4 py-3">
              <p className="text-[11px] font-bold text-inkSoft uppercase tracking-wide">Kelipatan</p>
              <p className="font-extrabold text-primary-700 mt-0.5">Rp 500.000</p>
            </div>
          </div>

          <ul className="mt-5 space-y-1.5 text-sm text-ink">
            <li className="flex gap-2"><TrendingUp className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />Bunga kompetitif hingga 6% p.a. untuk tenor 12 bulan</li>
            <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />Dana dijamin LPS, aman & terkendali</li>
          </ul>
        </div>
      </div>

      {/* Calculator */}
      <div className="card-bento p-7 bg-gradient-to-br from-primary-50 to-pinky-50">
        <p className="text-xs font-bold text-inkSoft uppercase tracking-wide">Kalkulator Estimasi Bagi Hasil</p>
        <h3 className="text-lg font-extrabold mt-1">Geser, Lihat, & Kira-kira Sendiri</h3>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nominal Penempatan</label>
            <span className="text-sm font-extrabold text-primary-700 tabular-nums">{formatRupiah(nominal)}</span>
          </div>
          <input
            type="range"
            min={1000000}
            max={500000000}
            step={500000}
            value={nominal}
            onChange={(e) => setNominal(parseInt(e.target.value, 10))}
            className="w-full mt-3 accent-primary-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-inkSoft mt-1">
            <span>Rp 1 Jt</span>
            <span>Rp 500 Jt</span>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Pilih Tenor</label>
          <div className="mt-2 flex gap-2 flex-wrap">
            {tenors.map((t, i) => (
              <button
                key={t.months}
                onClick={() => setTenorIdx(i)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                  tenorIdx === i
                    ? 'bg-gradient-to-r from-primary-600 to-pinky-400 text-white shadow-soft scale-105'
                    : 'bg-white border border-primary-100 text-inkSoft hover:border-primary-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-bento bg-white p-5 shadow-soft border border-primary-100">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[11px] font-bold text-inkSoft uppercase">Estimasi Bunga</p>
              <p className="text-sm md:text-base font-extrabold text-emerald-600 tabular-nums mt-1">{formatRupiah(interest)}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-inkSoft uppercase">Rata-rata /Bulan</p>
              <p className="text-sm md:text-base font-extrabold text-pinky-600 tabular-nums mt-1">{formatRupiah(monthlyAvg)}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-inkSoft uppercase">Total Diterima</p>
              <p className="text-sm md:text-base font-extrabold text-primary-700 tabular-nums mt-1">{formatRupiah(total)}</p>
            </div>
          </div>
          {/* visual bar */}
          <div className="mt-4">
            <div className="flex h-3 rounded-full overflow-hidden bg-primary-100">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-500"
                style={{ width: '100%' }}
              />
            </div>
            <div className="flex h-3 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                style={{ width: `${Math.max(2, Math.min(100, (interest / total) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-inkSoft mt-1">
              <span>Pokok</span>
              <span>Estimasi bunga</span>
            </div>
          </div>
        </div>

        <button onClick={() => setConfirmOpen(true)} className="btn-primary w-full mt-5">
          <ExternalLink className="w-4 h-4" />
          Buka Deposito Sekarang
        </button>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Simulasi Buka Deposito">
        <div className="text-center">
          <div className="flex justify-center">
            <Binky size={120} mood="chill" accessory="shield" />
          </div>
          <p className="mt-3 text-sm text-inkSoft leading-relaxed">
            Untuk pembukaan deposito <strong>BLINK TimeVault</strong>, kamu akan diarahkan ke
            formulir pendaftaran (Google Form). Estimasi temuanmu:{' '}
            <strong>{formatRupiah(nominal)}</strong> selama <strong>{tenor.label}</strong> dengan
            bunga <strong>{tenor.rate.toLocaleString('id-ID')}% p.a.</strong>
          </p>
          <div className="mt-4 rounded-2xl bg-primary-50 border border-primary-100 px-4 py-3 text-left">
            <p className="text-xs font-bold text-inkSoft uppercase tracking-wide">Tujuan Formulir</p>
            <p className="text-xs text-primary-700 font-semibold break-all mt-0.5">{DEPO_FORM_URL}</p>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setConfirmOpen(false)} className="btn-outline flex-1 !text-sm">
              Nanti Dulu
            </button>
            <a
              href={DEPO_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 !text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Lanjut ke Form
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
