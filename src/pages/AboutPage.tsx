import { PiggyBank, Target, Compass, Building2, Heart, Shield, CheckCircle2, ArrowRight, Smile, Zap, Users, Award } from 'lucide-react';
import Binky from '@/components/Binky';
import type { PageKey } from '@/components/Navbar';

interface AboutPageProps {
  onNavigate: (p: PageKey) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const coreValues = [
    {
      title: 'Smart',
      icon: Zap,
      gradient: 'from-primary-500 to-primary-400',
      bg: 'bg-primary-50',
      border: 'border-primary-100',
      desc: 'Inovasi teknologi digital canggih yang otomatis, cepat dalam hitungan detik, dan bebas hambatan antrean.',
    },
    {
      title: 'Transparent',
      icon: Shield,
      gradient: 'from-pinky-500 to-pinky-400',
      bg: 'bg-pinky-50',
      border: 'border-pinky-100',
      desc: 'Kejujuran tanpa biaya siluman, tanpa klausul tersembunyi. Nasabah tahu pasti ke mana setiap rupiah bermuara.',
    },
    {
      title: 'Playful',
      icon: Smile,
      gradient: 'from-pinky-400 to-primary-500',
      bg: 'bg-pinky-50/70',
      border: 'border-pinky-200',
      desc: 'Pengalaman finansial ceria dan menyenangkan bersama Binky si babi lucu, meruntuhkan persepsi kaku perbankan lama.',
    },
    {
      title: 'Inclusive',
      icon: Users,
      gradient: 'from-primary-600 to-pinky-500',
      bg: 'bg-primary-50/70',
      border: 'border-primary-200',
      desc: 'Terbuka untuk semua kalangan: generasi muda, pekerja mandiri, hingga pelaku UMKM dengan opsi tabungan reguler maupun bebas bunga (0%).',
    },
  ];

  const missions = [
    {
      number: '01',
      title: 'Layanan Digital 100% Bebas Antre',
      desc: 'Menyediakan ekosistem perbankan digital penuh tanpa antre di kantor cabang dengan biaya transaksi yang transparan dan bersahabat.',
    },
    {
      number: '02',
      title: 'Ragam Simpanan Fleksibel & Bebas Bunga',
      desc: 'Menghadirkan ragam produk simpanan yang inklusif—termasuk opsi simpanan bebas bunga 0% (PureSave)—yang sesuai dengan nilai dan kebutuhan setiap nasabah.',
    },
    {
      number: '03',
      title: 'Pemberdayaan Ekonomi UMKM & QRIS Instan',
      desc: 'Mendukung pertumbuhan ekonomi digital dan pelaku UMKM nasional melalui fitur pembayaran QRIS instan, transfer mitra (Bank Cheeko), serta pembiayaan yang mudah diakses.',
    },
  ];

  return (
    <div className="animate-pop-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-pinky-100 to-primary-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pinky-200/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary-200/40 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 pt-28 pb-16 md:pt-36 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-badge">
              <Building2 className="w-3.5 h-3.5" />
              Profil Perusahaan
            </span>
            <div className="mt-4 flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-pinky-400 flex items-center justify-center shadow-soft">
                <PiggyBank className="w-6 h-6 text-white" />
              </span>
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  BLINK<span className="text-primary-600">.</span>
                </h1>
                <p className="text-xs md:text-sm font-extrabold text-pinky-600 tracking-[0.2em] uppercase mt-0.5">
                  Smart Banking, Happy Living
                </p>
              </div>
            </div>

            <p className="mt-5 text-inkSoft text-base md:text-lg leading-relaxed">
              Pelopor bank digital modern yang menggabungkan kecanggihan finansial dengan kehangatan gaya hidup menyenangkan. Kami hadir untuk membuktikan bahwa mengelola uang bisa cerdas, transparan, dan membahagiakan.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { num: '2,5 Jt+', label: 'Nasabah Aktif' },
                { num: '100%', label: 'Layanan Digital' },
                { num: 'Rp 0', label: 'Biaya Tersembunyi' },
              ].map((s) => (
                <div key={s.label} className="card-bento p-4 text-center">
                  <p className="text-xl md:text-2xl font-extrabold text-primary-700">{s.num}</p>
                  <p className="text-[11px] font-bold text-inkSoft mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="relative">
              <div className="animate-float">
                <Binky size={260} accessory="piggy" mood="excited" />
              </div>
              <div className="absolute -bottom-4 inset-x-0 glass rounded-2xl p-4 text-center shadow-lift max-w-xs mx-auto">
                <p className="text-xs font-bold text-ink">
                  "Hai! Aku <strong>Binky</strong>, maskot sahabat finansialmu yang selalu ada di setiap langkah transaksi!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Makna Slogan "Smart Banking, Happy Living" */}
      <section className="max-w-6xl mx-auto px-5 py-14 md:py-20">
        <div className="text-center mb-10">
          <span className="section-badge">Filosofi Brand</span>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight">
            Makna di Balik <span className="bg-gradient-to-r from-primary-600 to-pinky-500 bg-clip-text text-transparent">"Smart Banking, Happy Living"</span>
          </h2>
          <p className="mt-2 text-inkSoft max-w-2xl mx-auto">
            Slogan BLINK bukan sekadar kalimat promosi, melainkan komitmen utuh dalam setiap fitur dan pengalaman perbankan yang kami bangun.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Smart Banking */}
          <div className="card-bento p-8 relative overflow-hidden transition-all duration-300 hover:shadow-lift">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-100/70 pointer-events-none" />
            <div className="relative">
              <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white shadow-soft">
                <Zap className="w-7 h-7" />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold text-primary-700">Smart Banking</h3>
              <p className="text-xs font-bold text-primary-500 uppercase tracking-wider mt-0.5">
                Cerdas, Efisien & 100% Digital
              </p>
              <p className="mt-4 text-inkSoft leading-relaxed text-sm">
                Mengacu pada fondasi perbankan modern serba digital yang membebaskan nasabah dari antrean fisik dan kerumitan birokrasi perbankan tradisional.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink">
                {[
                  'Buka rekening dalam 3 menit langsung dari smartphone',
                  'Scan QRIS instan lewat kamera atau gambar tanpa hambatan',
                  'Transfer antarbank otomatis, termasuk kemitraan eksklusif Bank Cheeko',
                  'Simulasi tabungan & kalkulator finansial interaktif real-time',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Happy Living */}
          <div className="card-bento p-8 relative overflow-hidden transition-all duration-300 hover:shadow-lift">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-pinky-100/70 pointer-events-none" />
            <div className="relative">
              <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pinky-500 to-pinky-400 flex items-center justify-center text-white shadow-soft">
                <Heart className="w-7 h-7" />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold text-pinky-600">Happy Living</h3>
              <p className="text-xs font-bold text-pinky-500 uppercase tracking-wider mt-0.5">
                Ketenangan Pikiran & Kebahagiaan Finansial
              </p>
              <p className="mt-4 text-inkSoft leading-relaxed text-sm">
                Tujuan akhir dari setiap inovasi BLINK: mewujudkan kedamaian batin (<em>peace of mind</em>). Finansial seharusnya tidak memicu stres atau kecemasan, melainkan memberi ruang untuk menikmati hidup.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink">
                {[
                  'Bebas biaya admin bulanan tanpa potongan siluman',
                  'Opsi simpanan murni 0% bunga (PureSave) untuk ketenangan hati',
                  'Desain pastel ungu-pink ramah mata dengan maskot Binky yang ceria',
                  'Mendukung kemandirian finansial generasi muda dan kemajuan UMKM',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pinky-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Perusahaan Singkat */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="rounded-bento-lg bg-gradient-to-br from-primary-100 via-pinky-50 to-primary-50 border border-white p-8 md:p-12 shadow-soft relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-pinky-200/30 blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="section-badge !bg-white/80">Tentang BLINK</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight">
              Membangun Standar Baru Perbankan Digital Indonesia
            </h2>
            <p className="mt-4 text-inkSoft leading-relaxed max-w-3xl text-sm md:text-base">
              BLINK Digital Bank adalah platform perbankan digital generasi baru yang beroperasi penuh secara daring tanpa kantor cabang konvensional. Diciptakan dengan pendekatan yang berpusat pada pengguna (<em>human-centered design</em>), BLINK menjembatani kebutuhan transaksi harian, simpanan bebas bunga hingga berjangka, serta akses pembiayaan produktif bagi pelaku UMKM.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Tipe Institusi', value: 'Bank Digital 100% Online' },
                { label: 'Fokus Nasabah', value: 'Gen-Z, Profesional & UMKM' },
                { label: 'Keamanan Data', value: 'Standar Enkripsi Modern 256-bit' },
                { label: 'Karakter Brand', value: 'Pastel, Playful & Transparan' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/80 border border-white p-4 shadow-soft">
                  <p className="text-[10px] font-bold text-inkSoft uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-extrabold text-ink mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Bento-Grid */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="text-center mb-10">
          <span className="section-badge">Arah & Tujuan</span>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight">
            Visi & Misi Perusahaan
          </h2>
          <p className="mt-2 text-inkSoft max-w-lg mx-auto">
            Komitmen terarah kami untuk memajukan ekosistem finansial digital masyarakat.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          {/* VISI */}
          <div className="lg:col-span-2 card-bento p-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lift relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="inline-block mt-4 text-xs font-extrabold uppercase tracking-widest text-primary-200">
                Visi BLINK
              </span>
              <h3 className="mt-2 text-xl md:text-2xl font-extrabold leading-snug">
                "Menjadi ekosistem perbankan digital pilihan utama yang mewujudkan kebebasan dan kebahagiaan finansial bagi masyarakat dan pelaku UMKM melalui teknologi yang cerdas dan ramah."
              </h3>
            </div>
            <div className="mt-8 pt-6 border-t border-white/20 flex items-center gap-3">
              <Award className="w-5 h-5 text-pinky-300" />
              <p className="text-xs text-primary-100 font-medium">Bebas & Bahagia Finansial Bersama BLINK</p>
            </div>
          </div>

          {/* MISI */}
          <div className="lg:col-span-3 card-bento p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-2xl bg-pinky-100 flex items-center justify-center text-pinky-600">
                  <Compass className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-pinky-600">
                    Misi BLINK
                  </span>
                  <h3 className="text-xl font-extrabold text-ink">3 Pilar Aksi Nyata</h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {missions.map((m) => (
                  <div
                    key={m.number}
                    className="rounded-2xl bg-primary-50/60 border border-primary-100 p-4 flex items-start gap-4 transition-transform hover:scale-[1.01]"
                  >
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-pinky-400 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-soft">
                      {m.number}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-sm text-ink">{m.title}</h4>
                      <p className="text-xs text-inkSoft mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values (Nilai Perusahaan) */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="text-center mb-10">
          <span className="section-badge">Nilai Inti</span>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight">
            Pilar Nilai Perusahaan
          </h2>
          <p className="mt-2 text-inkSoft max-w-lg mx-auto">
            Empat prinsip dasar yang menuntun setiap inovasi, produk, dan pelayanan kami.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreValues.map((v) => (
            <div
              key={v.title}
              className={`rounded-bento ${v.bg} border ${v.border} p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift flex flex-col justify-between`}
            >
              <div>
                <span
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.gradient} text-white flex items-center justify-center shadow-soft`}
                >
                  <v.icon className="w-6 h-6" />
                </span>
                <h3 className="mt-4 font-extrabold text-lg text-ink">{v.title}</h3>
                <p className="mt-2 text-xs text-inkSoft leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="card-bento p-8 md:p-12 text-center bg-gradient-to-r from-primary-100 via-pinky-100 to-primary-100 border border-primary-200 relative overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink">
              Siap Rasakan Perbankan yang Lebih Seru & Cerdas?
            </h2>
            <p className="mt-3 text-sm text-inkSoft">
              Buka rekening BLINK Savers atau BLINK PureSave (0% bunga) dalam sekejap tanpa antre.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button onClick={() => onNavigate('simpanan')} className="btn-primary">
                Buka Rekening Sekarang
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('layanan')} className="btn-outline">
                Coba Layanan Digital
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

