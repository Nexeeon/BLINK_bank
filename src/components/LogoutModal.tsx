import { LogOut, ShieldCheck } from 'lucide-react';
import Modal from '@/components/Modal';
import Binky from '@/components/Binky';

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName?: string;
}

export default function LogoutModal({ open, onClose, onConfirm, customerName }: LogoutModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Konfirmasi Keluar">
      <div className="text-center">
        <div className="flex justify-center animate-float">
          <Binky size={150} mood="wink" />
        </div>
        <h4 className="mt-2 text-lg font-extrabold">
          Mau keluar dulu{customerName ? `, ${customerName.split(' ')[0]}` : ''}?
        </h4>
        <p className="mt-2 text-sm text-inkSoft leading-relaxed">
          Tenang, semua data rekening simulasimu tetap tersimpan. Kamu bisa masuk kembali
          kapan saja dengan sekali klik.
        </p>
        <div className="mt-4 rounded-2xl bg-primary-50 border border-primary-100 px-4 py-3 flex items-start gap-2 text-left">
          <ShieldCheck className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
          <p className="text-xs text-inkSoft">
            Sesi akan berakhir dan kamu diarahkan ke layar "Sesi Berakhir" simulasi.
          </p>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="btn-outline flex-1 !text-sm">
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pinky-500 to-primary-600 text-white font-semibold px-6 py-3 !text-sm shadow-lift transition-all duration-300 hover:scale-[1.03] active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Ya, Keluar
          </button>
        </div>
      </div>
    </Modal>
  );
}
