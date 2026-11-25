import { useEffect, useState } from 'react';
import { PiggyBank, Menu, X, LogOut, User } from 'lucide-react';
import { useBank } from '@/context/BankContext';

export type PageKey = 'beranda' | 'tentang' | 'simpanan' | 'layanan' | 'kredit' | 'profil';

interface NavbarProps {
  page: PageKey;
  onNavigate: (p: PageKey) => void;
  onRequestLogout: () => void;
}

const baseLinks: { key: PageKey; label: string }[] = [
  { key: 'beranda', label: 'Beranda' },
  { key: 'tentang', label: 'Tentang Kami' },
  { key: 'simpanan', label: 'Simpanan' },
  { key: 'layanan', label: 'Layanan Digital' },
  { key: 'kredit', label: 'Kredit' },
];

export default function Navbar({ page, onNavigate, onRequestLogout }: NavbarProps) {
  const { account } = useBank();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = baseLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (p: PageKey) => {
    onNavigate(p);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[min(95vw,980px)] transition-all duration-300 ${scrolled ? 'glass shadow-lift' : 'bg-white/50 backdrop-blur-md border border-white/50'
        } rounded-full px-4 py-2.5`}
    >
      <div className="flex items-center justify-between">
        <button onClick={() => go('beranda')} className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-pinky-400 flex items-center justify-center shadow-soft transition-transform group-hover:scale-110 group-hover:rotate-6">
            <PiggyBank className="w-5 h-5 text-white" />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-extrabold text-lg tracking-tight">
              BLINK<span className="text-primary-500">.</span>
            </span>
            <span className="hidden sm:block text-[9px] font-semibold text-inkSoft/80 tracking-[0.14em] uppercase mt-0.5">
              Smart Banking, Happy Living
            </span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => go(l.key)}
              className={`relative px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${page === l.key
                  ? 'text-primary-700 bg-primary-100 font-extrabold'
                  : 'text-inkSoft hover:text-primary-600 hover:bg-primary-50'
                }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {account ? (
            <div className="hidden md:flex items-center gap-1.5">
              <button
                onClick={() => go('profil')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${page === 'profil'
                    ? 'bg-gradient-to-br from-primary-500 to-pinky-400 text-white shadow-soft'
                    : 'bg-primary-50 border border-primary-200 text-primary-600 hover:bg-primary-100'
                  }`}
                title="Profil Saya"
              >
                <User className="w-4 h-4" />
              </button>
              <button
                onClick={onRequestLogout}
                className="inline-flex items-center gap-1.5 rounded-full bg-pinky-50 border border-pinky-200 px-3 py-1.5 text-xs font-bold text-pinky-600 hover:bg-pinky-100 transition-colors shadow-soft"
                title="Keluar (Simulasi)"
              >
                <LogOut className="w-3.5 h-3.5" />
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={() => go('simpanan')}
              className="hidden md:inline-flex btn-primary !px-5 !py-2 !text-sm"
            >
              Buka Rekening
            </button>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-primary-100 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-3 rounded-bento bg-white shadow-lift border border-primary-100 p-2 animate-pop-in space-y-1">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => go(l.key)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${page === l.key ? 'bg-primary-100 text-primary-700 font-extrabold' : 'text-inkSoft hover:bg-primary-50'
                }`}
            >
              {l.label}
            </button>
          ))}
          {account ? (
            <div className="pt-2 border-t border-primary-100 space-y-2">
              <button
                onClick={() => go('profil')}
                className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-2xl transition-all ${page === 'profil'
                    ? 'bg-gradient-to-r from-primary-100 to-pinky-100 text-primary-800'
                    : 'bg-primary-50 border border-primary-200 hover:shadow-soft text-ink'
                  }`}
              >
                <User className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-bold">Profil Saya</span>
              </button>
              <button
                onClick={onRequestLogout}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-2xl bg-pinky-50 border border-pinky-200 px-3 py-2 text-xs font-bold text-pinky-600 hover:bg-pinky-100 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Keluar dari Akun
              </button>
            </div>
          ) : (
            <button onClick={() => go('simpanan')} className="w-full mt-1 btn-primary !py-2.5 !text-sm">
              Buka Rekening
            </button>
          )}
        </div>
      )}
    </header>
  );
}
