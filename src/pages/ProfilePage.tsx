import { useState, useEffect } from 'react';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  Save,
  Copy,
  Check,
  Calendar,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
} from 'lucide-react';
import { useBank } from '@/context/BankContext';
import { formatRupiah } from '@/lib/format';
import Binky from '@/components/Binky';
import type { PageKey } from '@/components/Navbar';

interface ProfilePageProps {
  onNavigate: (p: PageKey) => void;
}

const occupationOptions = [
  'Mahasiswa / Pelajar',
  'Karyawan Swasta',
  'Wirausaha / Pelaku UMKM',
  'Profesional / Freelancer',
  'Aparatur Sipil Negara / BUMN',
  'Ibu Rumah Tangga',
  'Lainnya',
];

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { account, updateAccount, showToast } = useBank();
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  // Form states for personal info
  const [name, setName] = useState('');
  const [nik, setNik] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [infoSaved, setInfoSaved] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Form states for security / PIN
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);
  const [pinSuccess, setPinSuccess] = useState(false);

  // Initialize form with current account data
  useEffect(() => {
    if (account) {
      setName(account.name || '');
      setNik(account.nik || '');
      setEmail(account.email || '');
      setPhone(account.phone || '');
      setBirthDate(account.birthDate || '2001-08-17');
      setOccupation(account.occupation || 'Wirausaha / Pelaku UMKM');
      setAddress(account.address || 'Jl. Melati Pastel No. 28, Menteng, Jakarta Pusat');
    }
  }, [account]);

  if (!account) {
    return (
      <div className="max-w-6xl mx-auto px-5 pt-28 pb-20 text-center animate-pop-in">
        <div className="card-bento max-w-lg mx-auto p-10">
          <div className="flex justify-center animate-float">
            <Binky size={180} mood="wink" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold">Belum Ada Akun Masuk</h1>
          <p className="mt-2 text-sm text-inkSoft">
            Buka rekening BLINK Savers atau BLINK PureSave terlebih dahulu untuk melihat dan mengelola profil nasabahmu.
          </p>
          <button
            onClick={() => onNavigate('simpanan')}
            className="btn-primary mt-6 inline-flex items-center gap-2"
          >
            Buka Rekening Sekarang
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Copy account number
  const copyAccountNumber = () => {
    navigator.clipboard?.writeText(account.number).catch(() => {});
    setCopiedNumber(true);
    showToast('Nomor rekening disalin ke clipboard!');
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  // Handle save personal info
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Nama lengkap tidak boleh kosong.');
      return;
    }
    if (!/^\d{16}$/.test(nik)) {
      showToast('NIK harus berupa 16 digit angka.');
      return;
    }

    updateAccount({
      name: name.trim(),
      nik,
      email: email.trim(),
      phone: phone.trim(),
      birthDate,
      occupation,
      address: address.trim(),
    });

    setInfoSaved(true);
    showToast('Data profil berhasil diperbarui! Binky sudah menyimpan perubahanmu.');
    setTimeout(() => setInfoSaved(false), 3000);
  };

  // Handle update PIN / Password
  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    setPinSuccess(false);

    const currentPin = account.pin || '123456';

    if (oldPin !== currentPin) {
      setPinError('Sandi / PIN lama tidak sesuai. Silakan periksa kembali!');
      return;
    }

    if (newPin.length < 6) {
      setPinError('Sandi / PIN baru minimal harus 6 karakter atau digit.');
      return;
    }

    if (newPin !== confirmPin) {
      setPinError('Konfirmasi sandi / PIN baru tidak cocok!');
      return;
    }

    // Save updated PIN
    updateAccount({ pin: newPin });
    setPinSuccess(true);
    setOldPin('');
    setNewPin('');
    setConfirmPin('');
    showToast('Sandi / PIN keamanan berhasil diperbarui! Gunakan sandi baru ini saat masuk kembali.');
    setTimeout(() => setPinSuccess(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 pt-24 pb-20 animate-pop-in">
      {/* Title */}
      <div className="text-center">
        <span className="section-badge">Akun & Identitas</span>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
          Profil <span className="text-primary-600">Nasabah</span>
        </h1>
        <p className="mt-3 text-inkSoft max-w-xl mx-auto">
          Kelola informasi pribadi, identitas diri, dan keamanan sandi akun BLINK Digital Bank milikmu.
        </p>
      </div>

      {/* 1. HEADER PROFIL NASABAH (Pastel Purple-Pink Gradient Card) */}
      <div className="mt-8 rounded-bento-lg bg-gradient-to-br from-primary-500 via-primary-400 to-pinky-400 p-7 sm:p-9 text-white shadow-lift relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/15 blur-sm pointer-events-none" />
        <div className="absolute -bottom-16 -left-8 w-48 h-48 rounded-full bg-pinky-300/30 blur-md pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* User Avatar with Binky theme */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/95 text-primary-700 flex items-center justify-center font-extrabold text-3xl sm:text-4xl shadow-lift border-2 border-white/60">
                {account.name.trim().charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center shadow-soft" title="Nasabah Terverifikasi">
                <Check className="w-4 h-4 text-white stroke-[3]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  Nasabah Terverifikasi
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-pinky-500/80 backdrop-blur-md px-3 py-1 text-xs font-extrabold text-white">
                  <CheckCircle2 className="w-3 h-3 text-pinky-200" />
                  {account.productName || 'BLINK Savers'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                {account.name}
              </h2>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-white/90 text-xs sm:text-sm">
                <span className="font-mono tracking-wider font-semibold">
                  Rek. {account.number.replace(/(\d{4})(?=\d)/g, '$1 ')}
                </span>
                <button
                  type="button"
                  onClick={copyAccountNumber}
                  className="rounded-full bg-white/20 hover:bg-white/30 px-2 py-0.5 text-xs font-bold transition-colors inline-flex items-center gap-1"
                  title="Salin No Rekening"
                >
                  {copiedNumber ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedNumber ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              <p className="text-[11px] text-white/75 pt-0.5">
                Saldo Aktif: <strong className="text-white text-sm tabular-nums">{formatRupiah(account.balance)}</strong>
              </p>
            </div>
          </div>

          {/* Binky Pig Mascot Header Showcase */}
          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-center shrink-0">
            <div className="animate-float">
              <Binky size={110} mood="excited" accessory="piggy" />
            </div>
            <p className="mt-1 text-[11px] font-bold text-white/90">
              Binky siap amankan datamu!
            </p>
          </div>
        </div>
      </div>

      {/* TABS SWITCHER: Informasi Pribadi & Keamanan Sandi */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex glass rounded-full p-1.5 gap-1 flex-wrap justify-center">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 rounded-full px-5 md:px-7 py-2.5 text-sm font-bold transition-all duration-300 ${
              activeTab === 'info'
                ? 'bg-gradient-to-r from-primary-600 to-pinky-500 text-white shadow-lift'
                : 'text-inkSoft hover:text-primary-600'
            }`}
          >
            <User className="w-4 h-4" />
            Informasi Pribadi
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 rounded-full px-5 md:px-7 py-2.5 text-sm font-bold transition-all duration-300 ${
              activeTab === 'security'
                ? 'bg-gradient-to-r from-primary-600 to-pinky-500 text-white shadow-lift'
                : 'text-inkSoft hover:text-primary-600'
            }`}
          >
            <Lock className="w-4 h-4" />
            Keamanan & Ubah Sandi
          </button>
        </div>
      </div>

      <div className="mt-8 max-w-3xl mx-auto">
        {/* ================= 2. FORM INFORMASI PRIBADI ================= */}
        {activeTab === 'info' && (
          <div className="card-bento p-6 sm:p-8 animate-pop-in space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-primary-100">
              <div>
                <h3 className="text-xl font-extrabold text-ink flex items-center gap-2">
                  <User className="w-5 h-5 text-primary-600" />
                  Data Diri Nasabah
                </h3>
                <p className="text-xs text-inkSoft mt-0.5">
                  Lengkapi dan perbarui data profil akun BLINK kamu secara mudah & tersinkronisasi.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-xs font-bold text-primary-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Sinkron Otomatis
              </span>
            </div>

            {infoSaved && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 animate-pop-in text-emerald-800 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-extrabold">Data Berhasil Disimpan!</p>
                  <p className="text-emerald-700 mt-0.5">
                    Nama di navbar dan kartu ATM virtual BLINK langsung diperbarui secara otomatis.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSaveInfo} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-inkSoft uppercase tracking-wide flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary-500" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field mt-1.5 font-semibold"
                    placeholder="cth. Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p className="text-[10px] text-inkSoft mt-1">Nama ini tampil di kartu ATM & navbar</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-inkSoft uppercase tracking-wide flex items-center gap-1.5">
                    <Fingerprint className="w-3.5 h-3.5 text-pinky-500" />
                    NIK (16 Digit Simulasi)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={16}
                    required
                    className="input-field mt-1.5 font-mono tabular-nums font-semibold"
                    placeholder="16 digit NIK KTP"
                    value={nik}
                    onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                  />
                  <p className="text-[10px] text-inkSoft mt-1">16 digit angka identitas nasabah</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-inkSoft uppercase tracking-wide flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary-500" />
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    className="input-field mt-1.5"
                    placeholder="cth. budi@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-inkSoft uppercase tracking-wide flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-pinky-500" />
                    Nomor HP / WhatsApp
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    className="input-field mt-1.5 font-mono tabular-nums"
                    placeholder="cth. 081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-inkSoft uppercase tracking-wide flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary-500" />
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    className="input-field mt-1.5 font-medium"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-inkSoft uppercase tracking-wide flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-pinky-500" />
                    Pekerjaan / Status
                  </label>
                  <select
                    className="input-field mt-1.5 font-medium cursor-pointer"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  >
                    {occupationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-inkSoft uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary-500" />
                  Alamat Domisili Lengkap
                </label>
                <textarea
                  rows={3}
                  className="input-field mt-1.5 resize-none leading-relaxed"
                  placeholder="Masukkan jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota/kabupaten..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary w-full sm:w-auto !px-8">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan Data
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= 3. UBAH KATA SANDI / PIN KEAMANAN ================= */}
        {activeTab === 'security' && (
          <div className="card-bento p-6 sm:p-8 animate-pop-in space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-primary-100">
              <div>
                <h3 className="text-xl font-extrabold text-ink flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary-600" />
                  Keamanan & Ubah Sandi / PIN
                </h3>
                <p className="text-xs text-inkSoft mt-0.5">
                  Perbarui sandi atau PIN keamanan akunmu untuk otentikasi login kembali setelah logout.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-pinky-50 border border-pinky-200 px-3 py-1 text-xs font-bold text-pinky-700">
                <KeyRound className="w-3.5 h-3.5" />
                PIN Default: 123456
              </span>
            </div>

            {pinError && (
              <div className="rounded-2xl bg-pinky-50 border border-pinky-200 p-4 flex items-center gap-3 animate-pop-in text-pinky-800 text-xs">
                <ShieldAlert className="w-5 h-5 text-pinky-600 shrink-0" />
                <div>
                  <p className="font-extrabold">Gagal Memperbarui Sandi</p>
                  <p className="text-pinky-700 mt-0.5">{pinError}</p>
                </div>
              </div>
            )}

            {pinSuccess && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 animate-pop-in text-emerald-800 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-extrabold">Sandi / PIN Berhasil Diperbarui!</p>
                  <p className="text-emerald-700 mt-0.5">
                    Sandi baru telah tersimpan di akunmu. Saat kamu Logout dan masuk kembali, kamu harus menggunakan sandi baru ini.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleUpdatePin} className="space-y-4">
              {/* Sandi Lama */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">
                    Sandi / PIN Lama
                  </label>
                  <span className="text-[11px] text-primary-600 font-semibold">
                    (PIN bawaan awal akun: <strong>123456</strong>)
                  </span>
                </div>
                <div className="relative mt-1.5">
                  <input
                    type={showOldPin ? 'text' : 'password'}
                    required
                    className="input-field !pr-11 font-mono tracking-wider font-bold"
                    placeholder="Masukkan sandi/PIN saat ini"
                    value={oldPin}
                    onChange={(e) => setOldPin(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPin(!showOldPin)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-inkSoft hover:text-primary-600 transition-colors p-1"
                    aria-label={showOldPin ? 'Sembunyikan' : 'Tampilkan'}
                  >
                    {showOldPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Sandi Baru */}
              <div>
                <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">
                  Sandi / PIN Baru
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showNewPin ? 'text' : 'password'}
                    required
                    className="input-field !pr-11 font-mono tracking-wider font-bold"
                    placeholder="Masukkan sandi/PIN baru (min. 6 karakter)"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPin(!showNewPin)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-inkSoft hover:text-primary-600 transition-colors p-1"
                    aria-label={showNewPin ? 'Sembunyikan' : 'Tampilkan'}
                  >
                    {showNewPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-inkSoft mt-1">Gunakan minimal 6 karakter kombinasi huruf atau angka.</p>
              </div>

              {/* Konfirmasi Sandi Baru */}
              <div>
                <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">
                  Konfirmasi Sandi / PIN Baru
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showConfirmPin ? 'text' : 'password'}
                    required
                    className="input-field !pr-11 font-mono tracking-wider font-bold"
                    placeholder="Ulangi sandi/PIN baru"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-inkSoft hover:text-primary-600 transition-colors p-1"
                    aria-label={showConfirmPin ? 'Sembunyikan' : 'Tampilkan'}
                  >
                    {showConfirmPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-primary-50/60 border border-primary-100 p-3.5 text-xs text-inkSoft flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                <p>
                  Perubahan sandi/PIN langsung disimpan ke akunmu di <code>localStorage</code>. Pastikan kamu mengingat sandi baru untuk login kembali.
                </p>
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary w-full sm:w-auto !px-8">
                  <KeyRound className="w-4 h-4" />
                  Perbarui Sandi
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

