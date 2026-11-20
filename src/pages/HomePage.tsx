import { ArrowRight, TrendingUp, QrCode, Send, CreditCard, Landmark, Percent, BadgeCheck, Clock3, Sparkles } from 'lucide-react';
import Binky from '@/components/Binky';
import type { PageKey } from '@/components/Navbar';

interface HomePageProps {
  onNavigate: (p: PageKey) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const pillars = [
    {
      title: 'Simpanan',
      desc: 'Tabungan, Giro & Deposito dengan bunga kompetitif.',
      icon: Landmark,
      accent: 'from-primary-100 to-primary-50',
      iconBg: 'bg-primary-500',
      action: 'Lihat Produk Simpanan',
    },
    {
      title: 'Kredit',
      desc: 'Kredit konsumtif & produktif UMKM, pengajuan mudah.',
      icon: CreditCard,
      accent: 'from-pinky-100 to-pinky-50',
      iconBg: 'bg-pinky-400',
      action: 'Jelajahi Kredit',
    },
    {
      title: 'Transfer & Top Up',
      desc: 'Kirim uang & isi e-wallet kapan saja, gratis biaya.',
      icon: Send,
      accent: 'from-primary-200/60 to-primary-50',
      iconBg: 'bg-primary-600',
      action: 'Coba Simulasi Transfer',
    },
    {
      title: 'Pembayaran & QRIS',
      desc: 'Bayar tagihan & scan QRIS dalam sekejap mata.',
      icon: QrCode,
      accent: 'from-pinky-200/60 to-pinky-50',
      iconBg: 'bg-pinky-500',
      action: 'Simulasi QRIS',
    },
  ];

  const advantages = [
    { icon: Percent, title: 'Bunga Kompetitif', desc: 'Tabungan 3,5% p.a. & deposito hingga 6% p.a.' },
    { icon: BadgeCheck, title: 'Bebas Biaya Admin', desc: 'Tanpa biaya admin tersembunyi. Serius, Rp 0.' },
    { icon: Clock3, title: 'Transaksi 24/7', desc: 'Semua layanan digital aktif kapan pun kamu butuh.' },
  ];

  return (
    <div className="animate-pop-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-pinky-100 to-primary-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pinky-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary-200/40 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5 pt-28 pb-16 md:pt-36 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-badge">
              <Sparkles className="w-3.5 h-3.5" />
              Bank Digital Pilihan Gen-Z & UMKM
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[120%] tracking-tight">
              Atur Duit dalam Sekejap Bareng{' '}
              <span className="bg-gradient-to-r from-primary-600 to-pinky-500 bg-clip-text text-transparent">
                BLINK!
              </span>
            </h1>
            <p className="mt-4 text-inkSoft text-base md:text-lg leading-relaxed max-w-md">
              Nabung & transaksi jadi lebih seru. 100% digital, tanpa antre, tanpa biaya
              tersembunyi — semua bisa dari genggamanmu.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('simpanan')}
                className="btn-primary group"
              >
                Buka Tabungan Sekarang
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => onNavigate('simpanan')} className="btn-outline">
                Kenalan sama BLINK
              </button>
            </div>

            <div className="mt-9 flex gap-8">
              {[
                { num: '2,5 Jt+', label: 'Pengguna Aktif' },
                { num: 'Rp 12 T', label: 'Dana Tersimpan' },
                { num: '4,9/5', label: 'Rating Pengguna' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl md:text-2xl font-extrabold text-primary-700">{s.num}</p>
                  <p className="text-xs text-inkSoft mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="relative">
              <div className="animate-float">
                <Binky size={260} accessory="piggy" mood="excited" />
              </div>

              <div className="absolute -left-16 top-4 glass rounded-2xl px-4 py-3 animate-float-slow hidden sm:flex items-center gap-3 shadow-lift">
                <span className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-emerald-600 rotate-[-90deg]" />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">Transfer masuk</p>
                  <p className="text-sm font-extrabold text-emerald-600">+Rp 250.000</p>
                </div>
              </div>

              <div className="absolute -right-8 bottom-16 glass rounded-2xl px-4 py-3 animate-float-slow hidden sm:flex items-center gap-3 shadow-lift">
                <span className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary-600" />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">Bunga naik</p>
                  <p className="text-sm font-extrabold text-primary-700">3,5% p.a.</p>
                </div>
              </div>

              <div className="absolute left-4 -bottom-2 glass rounded-2xl p-3 animate-float hidden sm:block shadow-lift">
                <QrCode className="w-8 h-8 text-pinky-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars bento */}
      <section className="max-w-6xl mx-auto px-5 py-14 md:py-20">
        <div className="text-center mb-10">
          <span className="section-badge">Akses Cepat</span>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight">
            Satu Ekosistem, Semua Kebutuhanmu
          </h2>
          <p className="mt-2 text-inkSoft max-w-lg mx-auto">
            Empat pilar layanan BLINK yang siap nemenin hari-harimu.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <button
              key={p.title}
              onClick={() => onNavigate(p.title === 'Kredit' ? 'kredit' : p.title === 'Simpanan' ? 'simpanan' : 'layanan')}
              className={`group text-left rounded-bento bg-gradient-to-br ${p.accent} border border-white/80 p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift`}
            >
              <span
                className={`w-12 h-12 rounded-2xl ${p.iconBg} flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                <p.icon className="w-6 h-6 text-white" />
              </span>
              <h3 className="mt-4 font-extrabold text-lg">{p.title}</h3>
              <p className="mt-1 text-sm text-inkSoft leading-relaxed">{p.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-700">
                {p.action}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Advantages strip */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {advantages.map((a) => (
            <div
              key={a.title}
              className="card-bento p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-pinky-100 flex items-center justify-center">
                <a.icon className="w-6 h-6 text-primary-600" />
              </span>
              <div>
                <h4 className="font-extrabold">{a.title}</h4>
                <p className="text-sm text-inkSoft mt-1 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bank Profile */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="rounded-bento-lg bg-gradient-to-br from-primary-100 via-pinky-50 to-primary-50 border border-white/80 p-8 md:p-12 shadow-soft relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-pinky-200/30 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <span className="section-badge !bg-white/80">Profil Bank</span>
              <h2 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight">
                Kenalan Lebih Dekat sama BLINK
              </h2>
              <p className="mt-3 text-inkSoft leading-relaxed max-w-2xl">
                BLINK adalah bank digital konvensional fiktif yang mengusung semangat menabung
                modern dan inklusif. 100% layanan digital tanpa antre di kantor cabang,
                transparan, dan bebas biaya admin tersembunyi — dibuat untuk Gen-Z, profesioanal
                muda, dan pelaku UMKM.
              </p>
              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {[
                  { title: 'Jenis Bank', desc: 'Digital Konvensional' },
                  { title: 'Segmentasi', desc: 'Individu, Gen-Z & UMKM' },
                  { title: 'Model Layanan', desc: '100% Digital Self-Service' },
                ].map((i) => (
                  <div key={i.title} className="rounded-2xl bg-white/80 border border-white px-4 py-3">
                    <p className="text-[10px] font-bold text-inkSoft uppercase tracking-wide">{i.title}</p>
                    <p className="text-sm font-extrabold mt-0.5">{i.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-primary-500/10 border border-primary-200/50 px-5 py-4">
                  <p className="text-xs font-extrabold text-primary-700 uppercase tracking-wide">Visi</p>
                  <p className="text-sm text-ink mt-1 leading-relaxed">
                    Jadi bank digital paling dekat dengan keseharian generasi muda Indonesia.
                  </p>
                </div>
                <div className="rounded-2xl bg-pinky-400/10 border border-pinky-200/50 px-5 py-4">
                  <p className="text-xs font-extrabold text-pinky-700 uppercase tracking-wide">Misi</p>
                  <p className="text-sm text-ink mt-1 leading-relaxed">
                    Nabung & transaksi jadi mudah, murah, dan menyenangkan lewat pengalaman digital penuh warna.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="animate-float-slow">
                <Binky size={190} mood="wink" />
              </div>
              <p className="mt-2 text-xs text-inkSoft text-center max-w-[12rem]">
                "Hai, aku <strong>Binky</strong>! Aku di sini buat nemenin perjalanan duitmu."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
