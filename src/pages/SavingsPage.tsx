import { useState } from 'react';
import { PiggyBank, Landmark, Vault, CheckCircle2, Eye, EyeOff, Send, QrCode, Receipt, Wallet, ArrowDownToLine, PartyPopper, LogOut } from 'lucide-react';
import { useBank } from '@/context/BankContext';
import LogoutModal from '@/components/LogoutModal';
import Modal from '@/components/Modal';
import Binky from '@/components/Binky';
import VirtualCard from '@/components/VirtualCard';
import { formatRupiah, parseRupiah, generateAccountNumber } from '@/lib/format';
import DepositoSection from '@/components/DepositoSection';
import GiroSection from '@/components/GiroSection';
import SavingsSimulation from '@/components/SavingsSimulation';

type ProductKey = 'savers' | 'giro' | 'depo';

interface SavingFormProps {
  open: boolean;
  onClose: () => void;
}

const products: {
  key: ProductKey;
  name: string;
  tag: string;
  desc: string;
  icon: typeof PiggyBank;
  gradient: string;
}[] = [
  { key: 'savers', name: 'BLINK Savers', tag: 'Tabungan', desc: 'Tabungan bebas admin buat hidup sehari-hari.', icon: PiggyBank, gradient: 'from-primary-500 to-primary-400' },
  { key: 'giro', name: 'BLINK BizGiro', tag: 'Giro', desc: 'Rekening bisnis untuk transaksi nominal besar.', icon: Landmark, gradient: 'from-pinky-500 to-pinky-400' },
  { key: 'depo', name: 'BLINK TimeVault', tag: 'Deposito', desc: 'Kunci duitmu, panen bunga hingga 6% p.a.', icon: Vault, gradient: 'from-primary-700 to-pinky-500' },
];

function OpenSavingsModal({ open, onClose }: SavingFormProps) {
  const { setAccount, showToast } = useBank();
  const [form, setForm] = useState({ name: '', nik: '', phone: '', email: '', deposit: '50000' });
  const [done, setDone] = useState(false);

  const depositValue = parseRupiah(form.deposit);
  const valid =
    form.name.trim().length >= 3 &&
    /^\d{16}$/.test(form.nik) &&
    /^\d{9,13}$/.test(form.phone.replace(/\D/g, '')) &&
    depositValue >= 50000;

  const submit = () => {
    if (!valid) return;
    setAccount({
      name: form.name.trim(),
      nik: form.nik,
      phone: form.phone,
      email: form.email,
      number: generateAccountNumber(),
      balance: depositValue,
    });
    if (depositValue > 50000) {
      showToast(`Selamat datang, ${form.name.split(' ')[0]}! Rekening BLINK Savers aktif.`);
    }
    setDone(true);
  };

  return (
    <Modal open={open} onClose={onClose} title={done ? 'Rekening Berhasil Dibuat!' : 'Buka Rekening BLINK Savers'} maxWidth="max-w-lg">
      {done ? (
        <div className="text-center py-4">
          <div className="flex justify-center animate-float">
            <Binky size={170} mood="excited" accessory="piggy" />
          </div>
          <h4 className="mt-2 text-xl font-extrabold flex items-center justify-center gap-2">
            <PartyPopper className="w-5 h-5 text-pinky-500" />
            Yeay, Rekenemu Aktif!
          </h4>
          <p className="mt-2 text-sm text-inkSoft">
            Nomor rekening sudah dibuat otomatis dan saldomu siap dipakai untuk simulasi
            transaksi. Cek dashboard mini di bawah, ya!
          </p>
          <button
            onClick={() => {
              setDone(false);
              onClose();
            }}
            className="btn-primary mt-5 w-full"
          >
            Lihat Dashboard Mini
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nama Lengkap</label>
            <input
              className="input-field mt-1.5"
              placeholder="cth. Budi Santoso"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">NIK (Simulasi)</label>
              <input
                className="input-field mt-1.5"
                placeholder="16 digit NIK"
                inputMode="numeric"
                maxLength={16}
                value={form.nik}
                onChange={(e) => setForm({ ...form, nik: e.target.value.replace(/\D/g, '') })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">No. HP</label>
              <input
                className="input-field mt-1.5"
                placeholder="cth. 081234567890"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Email (opsional)</label>
            <input
              className="input-field mt-1.5"
              placeholder="cth. budi@email.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">
              Setoran Awal <span className="text-primary-600 normal-case">(min. Rp 50.000)</span>
            </label>
            <div className="relative mt-1.5">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary-600">Rp</span>
              <input
                className="input-field !pl-11 font-bold tabular-nums"
                inputMode="numeric"
                value={form.deposit ? formatRupiah(depositValue).replace('Rp ', '') : ''}
                onChange={(e) => setForm({ ...form, deposit: e.target.value.replace(/\D/g, '') })}
                placeholder="50.000"
              />
            </div>
            <p className="mt-1.5 text-xs text-inkSoft flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Bebas biaya admin, saldo minimum Rp 10.000.
            </p>
          </div>
          <button
            onClick={submit}
            disabled={!valid}
            className={`btn-primary w-full ${!valid ? 'opacity-40 cursor-not-allowed hover:scale-100' : ''}`}
          >
            Buat Rekening Sekarang
          </button>
        </div>
      )}
    </Modal>
  );
}

export default function SavingsPage() {
  const { account, balanceVisible, setBalanceVisible, showToast, logout } = useBank();
  const [tab, setTab] = useState<ProductKey>('savers');
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const deposit = (amount: number) => {
    showToast(`Setoran ${formatRupiah(amount)} berhasil masuk!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 pt-24 pb-20 animate-pop-in">
      <div className="text-center">
        <span className="section-badge">Produk Simpanan</span>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
          Pilih Tempat Duitmu <span className="text-primary-600">Tumbuh</span>
        </h1>
        <p className="mt-3 text-inkSoft max-w-xl mx-auto">
          Tiga produk simpanan untuk setiap momen hidup — harian, bisnis, dan masa depan.
        </p>
      </div>

      {/* Pill tabs */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex glass rounded-full p-1.5 gap-1 flex-wrap justify-center">
          {products.map((p) => (
            <button
              key={p.key}
              onClick={() => setTab(p.key)}
              className={`relative flex items-center gap-2 rounded-full px-4 md:px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                tab === p.key
                  ? 'bg-gradient-to-r ' + p.gradient + ' text-white shadow-lift'
                  : 'text-inkSoft hover:text-primary-600'
              }`}
            >
              <p.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{p.name}</span>
              <span className="sm:hidden">{p.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= SAVERS ================= */}
      {tab === 'savers' && (
        <div className="mt-10 animate-pop-in">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* info card */}
            <div className="card-bento p-7 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-primary-100/70" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center shadow-soft">
                    <PiggyBank className="w-6 h-6 text-white" />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold">BLINK Savers</h3>
                    <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">Tabungan Harian</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Setoran Awal', value: 'Rp 50.000' },
                    { label: 'Biaya Admin', value: 'Rp 0 (Gratis)' },
                    { label: 'Saldo Minimum', value: 'Rp 10.000' },
                    { label: 'Suku Bunga', value: '3,5% p.a.' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl bg-primary-50 border border-primary-100 px-4 py-3 transition-transform hover:scale-[1.02]">
                      <p className="text-[11px] font-bold text-inkSoft uppercase tracking-wide">{s.label}</p>
                      <p className="font-extrabold text-primary-700 mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-2">Manfaat</p>
                  <ul className="space-y-1.5 text-sm text-ink">
                    {[
                      'Bebas biaya admin bulanan, selamanya',
                      'Gratis transfer antarbank hingga 20x/bulan',
                      'Langsung terhubung ke QRIS & e-wallet favoritmu',
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => setModalOpen(true)} className="btn-primary w-full mt-6">
                  Buka Rekening Tabungan
                </button>
              </div>
            </div>

            {/* dashboard mini */}
            <div className="card-bento p-7">
              {account ? (
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-inkSoft uppercase tracking-wide">Dashboard Mini Rekening Aktif</p>
                      <h3 className="text-xl font-extrabold mt-0.5">Halo, {account.name.split(' ')[0]}!</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Binky size={66} mood="wink" accessory="piggy" />
                      <button
                        onClick={() => setLogoutOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white border border-pinky-200 px-3.5 py-1.5 text-[11px] font-bold text-pinky-600 hover:bg-pinky-50 hover:scale-105 active:scale-95 transition-all"
                        title="Keluar dari simulasi"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <VirtualCard />
                  </div>
                  <p className="mt-4 text-[11px] text-inkSoft text-center">Klik kartu untuk membalik & lihat info lengkap</p>
                  <div className="mt-auto pt-5">
                    <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-2">Saldo {balanceVisible ? 'Saat Ini' : ''}</p>
                    <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary-100 to-pinky-100 px-5 py-4">
                      <p className="text-2xl font-extrabold tabular-nums">
                        {balanceVisible ? formatRupiah(account.balance) : 'Rp ••••••••'}
                      </p>
                      <button
                        onClick={() => setBalanceVisible(!balanceVisible)}
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary-600 hover:scale-110 transition-transform"
                        aria-label="Tampilkan/sembunyikan saldo"
                      >
                        {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <SavingsSimulation onDeposit={deposit} />
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="animate-float">
                    <Binky size={160} mood="happy" accessory="piggy" />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold">Belum Ada Rekening Aktif</h3>
                  <p className="mt-2 text-sm text-inkSoft max-w-xs">
                    Buka rekening BLINK Savers dulu yuk! Nanti dashboard mini + kartu virtualmu
                    muncul di sini.
                  </p>
                  <button onClick={() => setModalOpen(true)} className="btn-primary mt-5">
                    Buka Rekening Tabungan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= GIRO ================= */}
      {tab === 'giro' && <GiroSection />}

      {/* ================= DEPOSITO ================= */}
      {tab === 'depo' && <DepositoSection />}

      {/* Comparison table */}
      <div className="mt-16">
        <h2 className="text-2xl font-extrabold text-center tracking-tight">Perbandingan Produk Simpanan</h2>
        <p className="text-center text-inkSoft text-sm mt-2">Bandingkan semua produk BLINK dalam satu tabel.</p>
        <div className="mt-6 overflow-x-auto card-bento">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-primary-100 bg-primary-50/60">
                <th className="text-left px-5 py-4 font-bold text-inkSoft">Fitur</th>
                {products.map((p) => (
                  <th key={p.key} className="text-left px-5 py-4 font-extrabold text-ink">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-gradient-to-r ${p.gradient} text-white text-xs`}>
                      <p.icon className="w-3.5 h-3.5" />
                      {p.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Setoran Awal', 'Rp 50.000', 'Rp 1.000.000', 'Rp 1.000.000'],
                ['Biaya Admin', 'Rp 0 / bulan', 'Rp 25.000 / bulan', 'Rp 0 / bulan'],
                ['Saldo Minimum', 'Rp 10.000', 'Rp 1.000.000', 'Sesuai penempatan'],
                ['Suku Bunga', '3,5% p.a.', 'Bunga giro berlaku', '4,5% – 6,0% p.a.'],
                ['Cocok Untuk', 'Transaksi harian', 'Bisnis & perusahaan', 'Investasi jangka pendek'],
              ].map((row, i) => (
                <tr key={row[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-primary-50/40'}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-5 py-3.5 ${j === 0 ? 'font-bold text-ink' : 'text-inkSoft'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OpenSavingsModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          logout();
        }}
        customerName={account?.name}
      />

      {/* quick actions hint */}
      {account && (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Send, label: 'Transfer' },
            { icon: QrCode, label: 'QRIS' },
            { icon: Receipt, label: 'Tagihan' },
            { icon: Wallet, label: 'Top Up' },
          ].map((q) => (
            <div key={q.label} className="card-bento p-4 flex flex-col items-center gap-2 text-inkSoft hover:text-primary-600 hover:-translate-y-1 transition-all duration-300 cursor-default">
              <q.icon className="w-5 h-5" />
              <span className="text-xs font-bold">{q.label}</span>
            </div>
          ))}
        </div>
      )}
      {account && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => showToast('Setor tunai tidak tersedia di simulasi ini. Yuk pakai fitur simulasi transaksi di atas!')}
            className="text-xs text-inkSoft underline underline-offset-4 hover:text-primary-600 transition-colors flex items-center gap-1"
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            Tambah setoran lewat simulasi mutasi
          </button>
        </div>
      )}
    </div>
  );
}
