import { Briefcase, FileText, ShieldCheck, Building2, CheckCircle2, PartyPopper } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Binky from '@/components/Binky';
import { useBank } from '@/context/BankContext';

export default function GiroSection() {
  const { showToast } = useBank();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    showToast('Simulasi pengajuan Giro BLINK BizGiro berhasil dikirim!');
  };

  const handleClose = () => {
    setConfirmOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <div className="mt-10 animate-pop-in grid lg:grid-cols-2 gap-6 items-stretch">
      <div className="card-bento p-7 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-pinky-100/80" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pinky-500 to-pinky-400 flex items-center justify-center shadow-soft">
              <Briefcase className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="text-xl font-extrabold">BLINK BizGiro</h3>
              <p className="text-xs font-bold text-pinky-600 uppercase tracking-wider">Giro untuk Bisnis</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { label: 'Setoran Awal', value: 'Rp 1.000.000' },
              { label: 'Biaya Admin', value: 'Rp 25.000 / bulan' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-pinky-50 border border-pinky-100 px-4 py-3 transition-transform hover:scale-[1.02]">
                <p className="text-[11px] font-bold text-inkSoft uppercase tracking-wide">{s.label}</p>
                <p className="font-extrabold text-pinky-700 mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-4 text-sm">
            <div>
              <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-1.5">Manfaat</p>
              <ul className="space-y-1 text-ink">
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-pinky-500 mt-0.5 shrink-0" />Kelancaran transaksi bisnis nominal besar</li>
                <li className="flex gap-2"><FileText className="w-4 h-4 text-pinky-500 mt-0.5 shrink-0" />E-Statement rekening koran otomatis</li>
                <li className="flex gap-2"><Building2 className="w-4 h-4 text-pinky-500 mt-0.5 shrink-0" />Manajemen arus kas usaha dalam satu tempat</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-1.5">Karakteristik</p>
              <p className="text-inkSoft leading-relaxed">
                Penarikan fleksibel kapan saja menggunakan pemindahbukuan digital, cek, atau
                bilyet giro. Mendukung multi-otorisasi untuk perusahaan.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-inkSoft uppercase tracking-wide mb-1.5">Persyaratan</p>
              <div className="flex flex-wrap gap-2">
                {['e-KTP pengurus', 'NPWP', 'NIB / SIUP / Akta Pendirian'].map((r) => (
                  <span key={r} className="rounded-full bg-pinky-50 border border-pinky-200 px-3 py-1 text-xs font-bold text-pinky-700">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => setConfirmOpen(true)} className="btn-primary w-full mt-6">
            <Briefcase className="w-4 h-4" />
            Simulasi Pembukaan Rekening Giro
          </button>
        </div>
      </div>

      <div className="card-bento p-7 flex flex-col items-center justify-center text-center bg-gradient-to-br from-pinky-50 to-primary-50">
        <div className="animate-float">
          <Binky size={200} mood="business" accessory="tie" />
        </div>
        <h4 className="mt-4 text-lg font-extrabold">Binky Siap Dukung Bisnismu</h4>
        <p className="mt-2 text-sm text-inkSoft max-w-sm leading-relaxed">
          Dengan kacamata & dasi bisnisnya, Binky tahu bisnismu butuh transaksi lancar tanpa
          drama. Giro BLINK siap jadi tulang punggung arus kas usahamu.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-sm">
          {[
            { icon: FileText, label: 'Cek & BG' },
            { icon: ShieldCheck, label: 'Multi-Otorisasi' },
            { icon: Building2, label: 'Koran Otomatis' },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl bg-white border border-pinky-100 p-3 hover:-translate-y-1 hover:shadow-soft transition-all">
              <f.icon className="w-5 h-5 text-pinky-500 mx-auto" />
              <p className="text-[11px] font-bold mt-1.5">{f.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal open={confirmOpen} onClose={handleClose} title={submitted ? 'Pengajuan Terkirim!' : 'Simulasi Buka Rekening Giro'}>
        {submitted ? (
          <div className="text-center py-4">
            <div className="flex justify-center animate-float">
              <Binky size={150} mood="business" accessory="tie" />
            </div>
            <h4 className="mt-3 text-xl font-extrabold flex items-center justify-center gap-2">
              <PartyPopper className="w-5 h-5 text-pinky-500" />
              Yeay, Pengajuan Giro Diterima!
            </h4>
            <p className="mt-2 text-sm text-inkSoft leading-relaxed">
              Berkas simulasi pembukaan rekening Giro <strong>BLINK BizGiro</strong> telah berhasil dicatat. Binky dan tim bisnis BLINK siap mendampingi operasional usahamu!
            </p>
            <button onClick={handleClose} className="btn-primary mt-6 w-full">
              Selesai & Tutup
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center">
              <Binky size={120} mood="business" accessory="tie" />
            </div>
            <p className="mt-3 text-sm text-inkSoft leading-relaxed">
              Untuk pembukaan rekening Giro <strong>BLINK BizGiro</strong>, pastikan kamu telah menyiapkan{' '}
              <strong>e-KTP pengurus, NPWP, dan NIB/SIUP</strong> perusahaan.
            </p>
            <div className="mt-4 rounded-2xl bg-pinky-50 border border-pinky-100 px-4 py-3 text-left space-y-1.5 text-xs text-inkSoft">
              <p className="font-bold text-pinky-700 uppercase tracking-wide">Ringkasan Ketentuan Giro:</p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-pinky-500 shrink-0" />
                Setoran Awal: Rp 1.000.000
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-pinky-500 shrink-0" />
                Biaya Administrasi: Rp 25.000 / bulan
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-pinky-500 shrink-0" />
                Fasilitas: Cek / Bilyet Giro & E-Statement Bulanan
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={handleClose} className="btn-outline flex-1 !text-sm">
                Nanti Dulu
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary flex-1 !text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Kirim Pengajuan
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
