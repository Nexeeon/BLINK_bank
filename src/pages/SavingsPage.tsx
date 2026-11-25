import { useState } from 'react';
import {
  PiggyBank,
  Landmark,
  Vault,
  CheckCircle2,
  Eye,
  EyeOff,
  Send,
  QrCode,
  Receipt,
  Wallet,
  ArrowDownToLine,
  PartyPopper,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useBank } from '@/context/BankContext';
import LogoutModal from '@/components/LogoutModal';
import Modal from '@/components/Modal';
import Binky from '@/components/Binky';
import VirtualCard from '@/components/VirtualCard';
import { formatRupiah, parseRupiah, generateAccountNumber } from '@/lib/format';
import DepositoSection from '@/components/DepositoSection';
import GiroSection from '@/components/GiroSection';
import SavingsSimulation from '@/components/SavingsSimulation';

type ProductKey = 'savers' | 'puresave' | 'giro' | 'depo';

interface SavingFormProps {
  open: boolean;
  onClose: () => void;
  defaultProduct?: 'savers' | 'puresave';
}

const products: {
  key: ProductKey;
  name: string;
  tag: string;
  desc: string;
  icon: typeof PiggyBank | typeof ShieldCheck | typeof Landmark | typeof Vault;
  gradient: string;
}[] = [
  {
    key: 'savers',
    name: 'BLINK Savers',
    tag: 'Tabungan',
    desc: 'Tabungan bebas admin buat hidup sehari-hari.',
    icon: PiggyBank,
    gradient: 'from-primary-500 to-primary-400',
  },
  {
    key: 'puresave',
    name: 'BLINK PureSave',
    tag: 'Bebas Bunga (0%)',
    desc: 'Simpanan murni 0% bunga, transparan & bebas riba.',
    icon: ShieldCheck,
    gradient: 'from-pinky-500 via-primary-500 to-pinky-400',
  },
  {
    key: 'giro',
    name: 'BLINK BizGiro',
    tag: 'Giro',
    desc: 'Rekening bisnis untuk transaksi nominal besar.',
    icon: Landmark,
    gradient: 'from-pinky-500 to-pinky-400',
  },
  {
    key: 'depo',
    name: 'BLINK TimeVault',
    tag: 'Deposito',
    desc: 'Kunci duitmu, panen bunga hingga 6% p.a.',
    icon: Vault,
    gradient: 'from-primary-700 to-pinky-500',
  },
];

function OpenSavingsModal({ open, onClose, defaultProduct = 'savers' }: SavingFormProps) {
  const { setAccount, showToast } = useBank();
  const [selectedProduct, setSelectedProduct] = useState<'savers' | 'puresave'>(defaultProduct);
  const [form, setForm] = useState({ name: '', nik: '', phone: '', email: '', deposit: '50000' });
  const [done, setDone] = useState(false);

  // keep in sync when defaultProduct changes
  const [lastOpen, setLastOpen] = useState(false);
  if (open && !lastOpen) {
    setLastOpen(true);
    setSelectedProduct(defaultProduct);
  } else if (!open && lastOpen) {
    setLastOpen(false);
  }

  const depositValue = parseRupiah(form.deposit);
  const valid =
    form.name.trim().length >= 3 &&
    /^\d{16}$/.test(form.nik) &&
    /^\d{9,13}$/.test(form.phone.replace(/\D/g, '')) &&
    depositValue >= 50000;

  const submit = () => {
    if (!valid) return;
    const isPure = selectedProduct === 'puresave';
    setAccount({
      name: form.name.trim(),
      nik: form.nik,
      phone: form.phone,
      email: form.email,
      number: generateAccountNumber(),
      balance: depositValue,
      productType: selectedProduct,
      productName: isPure ? 'BLINK PureSave' : 'BLINK Savers',
      pin: '123456',
      birthDate: '2001-08-17',
      occupation: 'Wirausaha / Pelaku UMKM',
      address: 'Jl. Melati Pastel No. 28, Menteng, Jakarta Pusat',
    });
    showToast(
      `Selamat datang, ${form.name.split(' ')[0]}! Rekening ${
        isPure ? 'BLINK PureSave (Bebas Bunga)' : 'BLINK Savers'
      } aktif.`
    );
    setDone(true);
  };

  const isPure = selectedProduct === 'puresave';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        done
          ? 'Rekening Berhasil Dibuat!'
          : isPure
          ? 'Buka Rekening BLINK PureSave'
          : 'Buka Rekening BLINK Savers'
      }
      maxWidth="max-w-lg"
    >
      {done ? (
        <div className="text-center py-4">
          <div className="flex justify-center animate-float">
            <Binky size={170} mood="excited" accessory="piggy" />
          </div>
          <h4 className="mt-2 text-xl font-extrabold flex items-center justify-center gap-2">
            <PartyPopper className="w-5 h-5 text-pinky-500" />
            {isPure ? 'Yeay, Rekening PureSave Aktif!' : 'Yeay, Rekeningmu Aktif!'}
          </h4>
          <p className="mt-2 text-sm text-inkSoft">
            {isPure
              ? 'Rekening Simpanan Bebas Bunga (0%) kamu sudah siap digunakan untuk transaksi tanpa biaya admin bulanan.'
              : 'Nomor rekening sudah dibuat otomatis dan saldomu siap dipakai untuk simulasi transaksi. Cek dashboard mini di bawah, ya!'}
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
          {/* Product selector */}
          <div>
            <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Pilih Jenis Tabungan</label>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              <button
                type="button"
                onClick={() => setSelectedProduct('savers')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedProduct === 'savers'
                    ? 'border-primary-500 bg-primary-50/80 shadow-soft'
                    : 'border-primary-100 bg-white hover:border-primary-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-primary-600" />
                  <p className="font-extrabold text-xs text-ink">BLINK Savers</p>
                </div>
                <p className="text-[11px] text-inkSoft mt-1">Tabungan harian bebas biaya admin.</p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedProduct('puresave')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedProduct === 'puresave'
                    ? 'border-pinky-500 bg-pinky-50/80 shadow-soft'
                    : 'border-primary-100 bg-white hover:border-primary-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-pinky-600" />
                  <p className="font-extrabold text-xs text-ink">BLINK PureSave</p>
                </div>
                <span className="inline-block mt-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                  0% Bebas Bunga
                </span>
              </button>
            </div>
          </div>

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
            <div className="mt-2 space-y-1 text-xs text-inkSoft">
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                Bebas biaya admin bulanan (Rp 0), saldo minimum Rp 10.000.
              </p>
              {isPure && (
                <p className="flex items-center gap-1.5 text-pinky-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-pinky-500 shrink-0" />
                  Suku Bunga 0% (Simpanan murni bebas bunga & bebas riba).
                </p>
              )}
            </div>
          </div>
          <button
            onClick={submit}
            disabled={!valid}
            className={`btn-primary w-full ${!valid ? 'opacity-40 cursor-not-allowed hover:scale-100' : ''}`}
          >
            {isPure ? 'Buat Rekening BLINK PureSave' : 'Buat Rekening BLINK Savers'}
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
  const [formProduct, setFormProduct] = useState<'savers' | 'puresave'>('savers');
  const [logoutOpen, setLogoutOpen] = useState(false);

  const deposit = (amount: number) => {
    showToast(`Setoran ${formatRupiah(amount)} berhasil masuk!`);
  };

  const openAccountModal = (prod: 'savers' | 'puresave') => {
    setFormProduct(prod);
    setModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 pt-24 pb-20 animate-pop-in">
      <div className="text-center">
        <span className="section-badge">Produk Simpanan</span>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
          Pilih Tempat Duitmu <span className="text-primary-600">Tumbuh</span>
        </h1>
        <p className="mt-3 text-inkSoft max-w-xl mx-auto">
          Empat pilihan produk simpanan untuk setiap preferensi hidup — tabungan harian, bebas bunga (0%), bisnis, dan masa depan.
        </p>
      </div>

      {/* Pill tabs */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex glass rounded-full p-1.5 gap-1 flex-wrap justify-center">
          {products.map((p) => (
            <button
              key={p.key}
              onClick={() => setTab(p.key)}
              className={`relative flex items-center gap-2 rounded-full px-4 md:px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                tab === p.key
                  ? 'bg-gradient-to-r ' + p.gradient + ' text-white shadow-lift'
                  : 'text-inkSoft hover:text-primary-600'
              }`}
            >
              <p.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{p.name}</span>
              <span className="sm:hidden">{p.tag}</span>
              {p.key === 'puresave' && (
                <span className="hidden md:inline text-[10px] bg-white/25 px-1.5 py-0.5 rounded-full font-extrabold uppercase">
                  0% Bunga
                </span>
              )}
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
                    <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">Tabungan Reguler Harian</p>
                  </div>
                </div>

                {/* Tanpa informasi suku bunga */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Setoran Awal', value: 'Rp 50.000' },
                    { label: 'Biaya Admin', value: 'Rp 0 (Gratis)' },
                    { label: 'Saldo Minimum', value: 'Rp 10.000' },
                    { label: 'Layanan Digital', value: '24/7 QRIS & App' },
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
                      'Akses penuh kartu ATM virtual 3D interaktif',
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-1.5">Persyaratan</p>
                  <div className="flex flex-wrap gap-2">
                    {['e-KTP WNI', 'Setoran awal min. Rp 50.000', 'No. HP aktif'].map((r) => (
                      <span key={r} className="rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-xs font-bold text-primary-700">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <button onClick={() => openAccountModal('savers')} className="btn-primary w-full mt-6">
                  Buka Rekening BLINK Savers
                </button>
              </div>
            </div>

            {/* dashboard mini */}
            <div className="card-bento p-7">
              {account ? (
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-inkSoft uppercase tracking-wide">Dashboard Mini Rekening Aktif</p>
                        <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-extrabold text-primary-700">
                          {account.productName || 'BLINK Savers'}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold mt-0.5">Halo, {(account.name || 'Nasabah').split(' ')[0]}!</h3>
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
                  <button onClick={() => openAccountModal('savers')} className="btn-primary mt-5">
                    Buka Rekening Tabungan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= PURESAVE (BEBAS BUNGA / 0%) ================= */}
      {tab === 'puresave' && (
        <div className="mt-10 animate-pop-in">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* info card */}
            <div className="card-bento p-7 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-pinky-100/70" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pinky-500 to-pinky-400 flex items-center justify-center shadow-soft">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-extrabold">BLINK PureSave</h3>
                      <p className="text-xs font-bold text-pinky-600 uppercase tracking-wider">
                        Tabungan Bebas Bunga (0% Interest)
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-extrabold">
                    0% Bunga
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Setoran Awal', value: 'Rp 50.000', badge: null },
                    { label: 'Biaya Admin', value: 'Rp 0 / bulan (Gratis)', badge: null },
                    { label: 'Saldo Minimum', value: 'Rp 10.000', badge: null },
                    { label: 'Suku Bunga', value: '0% (Bebas Bunga)', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={`rounded-2xl px-4 py-3 transition-transform hover:scale-[1.02] border ${
                        s.badge ? 'bg-emerald-50/60 border-emerald-200' : 'bg-pinky-50/70 border-pinky-100'
                      }`}
                    >
                      <p className="text-[11px] font-bold text-inkSoft uppercase tracking-wide">{s.label}</p>
                      <p className={`font-extrabold mt-0.5 ${s.badge ? 'text-emerald-700' : 'text-pinky-700'}`}>
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-2">Konsep & Keunggulan</p>
                    <p className="text-sm text-inkSoft leading-relaxed">
                      Produk simpanan murni <strong>tanpa bunga (0% bunga)</strong> yang dirancang untuk nasabah yang mengutamakan pengelolaan dana praktis, transparan, adil, dan bebas unsur bunga/riba.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-2">Manfaat</p>
                    <ul className="space-y-1.5 text-sm text-ink">
                      {[
                        '100% Bebas bunga & tanpa beban pikiran riba',
                        'Bebas biaya administrasi bulanan selamanya (Rp 0)',
                        'Gratis kuota 20x transfer antarbank setiap bulan',
                        'Terhubung penuh ke kartu ATM virtual 3D, Scan QRIS & e-wallet',
                        'E-statement bulanan transparan tanpa potongan siluman',
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-1.5">Persyaratan</p>
                    <div className="flex flex-wrap gap-2">
                      {['e-KTP WNI', 'Setoran awal min. Rp 50.000', 'No. HP aktif'].map((r) => (
                        <span key={r} className="rounded-full bg-pinky-50 border border-pinky-100 px-3 py-1 text-xs font-bold text-pinky-700">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button onClick={() => openAccountModal('puresave')} className="btn-primary w-full mt-6">
                  <ShieldCheck className="w-4 h-4" />
                  Buka Rekening BLINK PureSave (0% Bunga)
                </button>
              </div>
            </div>

            {/* dashboard or binky promo */}
            <div className="card-bento p-7">
              {account ? (
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-inkSoft uppercase tracking-wide">Dashboard Mini Rekening Aktif</p>
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                          {account.productName || 'BLINK PureSave'}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold mt-0.5">Halo, {(account.name || 'Nasabah').split(' ')[0]}!</h3>
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
                <div className="h-full flex flex-col items-center justify-center text-center py-10 bg-gradient-to-br from-pinky-50/50 to-primary-50/50 rounded-2xl p-6">
                  <div className="animate-float">
                    <Binky size={160} mood="happy" accessory="piggy" />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold">Simpanan Murni 0% Bebas Bunga</h3>
                  <p className="mt-2 text-sm text-inkSoft max-w-xs leading-relaxed">
                    Nabung tenang tanpa beban bunga bersama Binky. Tetap nikmati seluruh kemudahan transaksi modern, QRIS, dan kartu ATM virtual!
                  </p>
                  <button onClick={() => openAccountModal('puresave')} className="btn-primary mt-5">
                    <ShieldCheck className="w-4 h-4" />
                    Buka BLINK PureSave Sekarang
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
        <p className="text-center text-inkSoft text-sm mt-2">Bandingkan seluruh produk simpanan BLINK dalam satu tabel transparan.</p>
        <div className="mt-6 overflow-x-auto card-bento">
          <table className="w-full min-w-[760px] text-sm">
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
                ['Kategori', 'Tabungan Reguler', 'Simpanan Bebas Bunga', 'Giro Bisnis', 'Deposito Berjangka'],
                ['Setoran Awal', 'Rp 50.000', 'Rp 50.000', 'Rp 1.000.000', 'Rp 1.000.000'],
                ['Biaya Admin', 'Rp 0 / bulan', 'Rp 0 / bulan', 'Rp 25.000 / bulan', 'Rp 0 / bulan'],
                ['Saldo Minimum', 'Rp 10.000', 'Rp 10.000', 'Rp 1.000.000', 'Sesuai penempatan'],
                ['Suku Bunga', '-', '0% (Bebas Bunga)', '-', '4,5% – 6,0% p.a.'],
                ['Cocok Untuk', 'Transaksi harian', 'Bebas bunga & syariah-friendly', 'Bisnis & perusahaan', 'Investasi jangka pendek'],
              ].map((row, i) => (
                <tr key={row[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-primary-50/40'}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-5 py-3.5 ${j === 0 ? 'font-bold text-ink' : 'text-inkSoft'}`}>
                      {j === 2 && row[0] === 'Suku Bunga' ? (
                        <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-extrabold text-emerald-700">
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OpenSavingsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProduct={formProduct}
      />
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
