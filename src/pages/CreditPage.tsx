import { useState } from 'react';
import { CreditCard, Store, CheckCircle2, FileCheck2, ArrowRight } from 'lucide-react';
import Modal from '@/components/Modal';
import Binky from '@/components/Binky';
import { useBank } from '@/context/BankContext';
import { formatRupiah, parseRupiah } from '@/lib/format';

interface CreditFormModalProps {
  kind: 'konsumtif' | 'umkm';
  open: boolean;
  onClose: () => void;
}

function CreditFormModal({ kind, open, onClose }: CreditFormModalProps) {
  const { setCreditApplication, showToast } = useBank();
  const [amount, setAmount] = useState(kind === 'konsumtif' ? '20000000' : '50000000');
  const [tenor, setTenor] = useState(24);
  const [purpose, setPurpose] = useState('');
  const [done, setDone] = useState(false);

  const isK = kind === 'konsumtif';
  const value = parseRupiah(amount);
  const rate = isK ? 0.09 : 0.075;
  const monthly = Math.round((value * rate * (tenor / 12)) / tenor + value / tenor);

  const valid = value >= (isK ? 5000000 : 10000000) && purpose.trim().length >= 5;

  const submit = () => {
    if (!valid) return;
    setCreditApplication({
      type: isK ? 'Kredit Konsumtif' : 'Kredit Produktif UMKM',
      amount: value,
      tenor,
      status: 'Menunggu verifikasi',
    });
    showToast('Pengajuan kredit terkirim! Binky lagi periksa berkasnya.');
    setDone(true);
  };

  return (
    <Modal open={open} onClose={onClose} title={done ? 'Pengajuan Terkirim!' : isK ? 'Ajukan Kredit Konsumtif' : 'Ajukan Kredit UMKM'} maxWidth="max-w-lg">
      {done ? (
        <div className="text-center py-4">
          <div className="flex justify-center animate-float">
            <Binky size={160} mood="excited" accessory="shield" />
          </div>
          <h4 className="mt-2 text-xl font-extrabold">Berkas Kamu Diproses!</h4>
          <p className="mt-2 text-sm text-inkSoft">
            Status pengajuan bisa kamu pantau di kartu status di halaman Kredit. Tim BLINK
            simulasi akan "menghubungimu" maksimal 1x24 jam.
          </p>
          <button
            onClick={() => {
              setDone(false);
              onClose();
            }}
            className="btn-primary mt-5 w-full"
          >
            Mengerti
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Plafon Kredit</label>
            <div className="relative mt-1.5">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary-600">Rp</span>
              <input
                className="input-field !pl-11 font-bold tabular-nums"
                inputMode="numeric"
                value={amount ? formatRupiah(value).replace('Rp ', '') : ''}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Tenor: {tenor} bulan</label>
            <input
              type="range"
              min={12}
              max={60}
              step={12}
              value={tenor}
              onChange={(e) => setTenor(parseInt(e.target.value, 10))}
              className="w-full mt-2 accent-primary-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-inkSoft">
              <span>12 bln</span>
              <span>60 bln</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">
              {isK ? 'Tujuan Penggunaan' : 'Tujuan Usaha'}
            </label>
            <textarea
              className="input-field mt-1.5 min-h-20 resize-none"
              placeholder={isK ? 'cth. Renovasi rumah & beli laptop kerja' : 'cth. Modal stok warung & pembelian freezer'}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="rounded-2xl bg-primary-50 border border-primary-100 px-4 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-inkSoft font-semibold">Estimasi angsuran / bulan</span>
              <span className="font-extrabold text-primary-700 tabular-nums">{formatRupiah(monthly)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-inkSoft font-semibold">Bunga flat</span>
              <span className="font-extrabold text-ink tabular-nums">{(rate * 100).toLocaleString('id-ID')}% p.a.</span>
            </div>
          </div>
          <button
            onClick={submit}
            disabled={!valid}
            className={`btn-primary w-full ${!valid ? 'opacity-40 cursor-not-allowed hover:scale-100' : ''}`}
          >
            Kirim Pengajuan
          </button>
        </div>
      )}
    </Modal>
  );
}

export default function CreditPage() {
  const { creditApplication } = useBank();
  const [modal, setModal] = useState<'konsumtif' | 'umkm' | null>(null);

  const cards = [
    {
      kind: 'konsumtif' as const,
      icon: CreditCard,
      name: 'Kredit Konsumtif',
      desc: 'Wujudkan keinginan — renovasi rumah, gadget baru, atau liburan impian.',
      plafon: 'Rp 5 Jt – Rp 500 Jt',
      tenor: '12 – 60 bulan',
      bunga: 'Mulai 9% p.a. flat',
      tujuan: 'Kebutuhan personal & konsumsi',
      accent: 'from-primary-500 to-primary-400',
      bg: 'from-primary-50 to-primary-100/50',
      badge: 'bg-primary-100 text-primary-700',
    },
    {
      kind: 'umkm' as const,
      icon: Store,
      name: 'Kredit Produktif UMKM',
      desc: 'Mesin kas untuk usahamu — modal stok, alat produksi, hingga ekspansi cabang.',
      plafon: 'Rp 10 Jt – Rp 2 M',
      tenor: '12 – 60 bulan',
      bunga: 'Mulai 7,5% p.a. flat',
      tujuan: 'Modal kerja & investasi usaha',
      accent: 'from-pinky-500 to-pinky-400',
      bg: 'from-pinky-50 to-pinky-100/50',
      badge: 'bg-pinky-100 text-pinky-700',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 pt-24 pb-20 animate-pop-in">
      <div className="text-center">
        <span className="section-badge">Kredit BLINK</span>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
          Dana Terpercaya, <span className="text-pinky-500">Prosesnya Enteng</span>
        </h1>
        <p className="mt-3 text-inkSoft max-w-xl mx-auto">
          Ajukan kredit konsumtif untuk kebutuhan personal, atau kredit produktif untuk
          mengembangkan usahamu.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {cards.map((c) => (
          <div
            key={c.kind}
            className={`rounded-bento bg-gradient-to-br ${c.bg} border border-white/80 p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift relative overflow-hidden`}
          >
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/50" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.accent} flex items-center justify-center shadow-soft`}>
                  <c.icon className="w-7 h-7 text-white" />
                </span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ${c.badge}`}>
                  {c.kind === 'konsumtif' ? 'Personal' : 'UMKM'}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold">{c.name}</h3>
              <p className="mt-1.5 text-sm text-inkSoft leading-relaxed">{c.desc}</p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {[
                  ['Plafon', c.plafon],
                  ['Tenor', c.tenor],
                  ['Bunga', c.bunga],
                  ['Tujuan', c.tujuan],
                ].map(([label, val]) => (
                  <div key={label} className="rounded-xl bg-white/80 border border-white px-3 py-2.5">
                    <p className="text-[10px] font-bold text-inkSoft uppercase tracking-wide">{label}</p>
                    <p className="text-xs font-extrabold mt-0.5">{val}</p>
                  </div>
                ))}
              </div>

              <button onClick={() => setModal(c.kind)} className="btn-primary w-full mt-6 !text-sm">
                <FileCheck2 className="w-4 h-4" />
                Ajukan Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>

      {creditApplication && (
        <div className="mt-8 card-bento p-6 max-w-xl mx-auto border-2 border-emerald-200 bg-emerald-50/50 animate-pop-in">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6 text-emerald-600" />
            </span>
            <div className="flex-1">
              <h4 className="font-extrabold flex items-center gap-2">
                Status Pengajuan Kredit
                <span className="rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5 text-[10px] font-extrabold uppercase">
                  {creditApplication.status}
                </span>
              </h4>
              <p className="text-sm text-inkSoft mt-1">
                {creditApplication.type} • {formatRupiah(creditApplication.amount)} •{' '}
                {creditApplication.tenor} bulan
              </p>
              <p className="text-xs text-inkSoft mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Berkas diterima. Verifikasi simulasi berjalan 1x24 jam.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 card-bento p-7 bg-gradient-to-r from-primary-100/60 to-pinky-100/60 flex flex-col sm:flex-row items-center gap-6 max-w-3xl mx-auto">
        <div className="shrink-0 animate-float">
          <Binky size={130} mood="happy" accessory="shield" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-extrabold">Tips dari Binky</h3>
          <p className="text-sm text-inkSoft mt-1 leading-relaxed">
            "Ajukan kredit sesuai kemampuanmu, ya! Idealnya angsuran maksimal 30% dari
            penghasilan bulanan biar keuangan tetap sehat dan hati pun tenang."
          </p>
        </div>
      </div>

      <CreditFormModal kind={modal ?? 'konsumtif'} open={modal !== null} onClose={() => setModal(null)} />
    </div>
  );
}
