import { ExternalLink, Briefcase, FileText, ShieldCheck, Building2 } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Binky from '@/components/Binky';

const GIRO_FORM_URL = 'https://forms.google.com/contoh-giro-blink';

export default function GiroSection() {
  const [confirmOpen, setConfirmOpen] = useState(false);

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
            <ExternalLink className="w-4 h-4" />
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

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Simulasi Buka Rekening Giro">
        <div className="text-center">
          <div className="flex justify-center">
            <Binky size={120} mood="business" accessory="tie" />
          </div>
          <p className="mt-3 text-sm text-inkSoft leading-relaxed">
            Untuk simulasi pembukaan rekening Giro <strong>BLINK BizGiro</strong>, kamu akan
            diarahkan ke formulir pendaftaran (Google Form). Siapkan{' '}
            <strong>e-KTP pengurus, NPWP, dan NIB/SIUP</strong> kamu, ya!
          </p>
          <div className="mt-4 rounded-2xl bg-pinky-50 border border-pinky-100 px-4 py-3 text-left">
            <p className="text-xs font-bold text-inkSoft uppercase tracking-wide">Tujuan Formulir</p>
            <p className="text-xs text-primary-700 font-semibold break-all mt-0.5">{GIRO_FORM_URL}</p>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setConfirmOpen(false)} className="btn-outline flex-1 !text-sm">
              Nanti Dulu
            </button>
            <a
              href={GIRO_FORM_URL}
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
