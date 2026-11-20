import { useState } from 'react';
import Navbar, { type PageKey } from '@/components/Navbar';
import LogoutModal from '@/components/LogoutModal';
import SessionEndedScreen from '@/components/SessionEndedScreen';
import { BankProvider, useBank } from '@/context/BankContext';
import HomePage from '@/pages/HomePage';
import SavingsPage from '@/pages/SavingsPage';
import ServicesPage from '@/pages/ServicesPage';
import CreditPage from '@/pages/CreditPage';

function Shell() {
  const [page, setPage] = useState<PageKey>('beranda');
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { account, sessionEnded, resumeSession, resetForNewAccount } = useBank();

  const navigate = (p: PageKey) => setPage(p);

  if (sessionEnded) {
    return (
      <SessionEndedScreen
        onResume={() => {
          resumeSession();
          setPage('beranda');
        }}
        onNewAccount={() => {
          resetForNewAccount();
          setPage('simpanan');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar page={page} onNavigate={navigate} onRequestLogout={() => setLogoutOpen(true)} />
      <main>
        {page === 'beranda' && <HomePage onNavigate={navigate} />}
        {page === 'simpanan' && <SavingsPage />}
        {page === 'layanan' && <ServicesPage />}
        {page === 'kredit' && <CreditPage />}
      </main>
      <footer className="border-t border-primary-100 bg-white/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-inkSoft">
          <p className="font-bold">BLINK Digital Bank — Simulasi edukasi. Bukan bank sungguhan.</p>
          <p>Nabung & Transaksi dalam Sekejap, Jadi Lebih Seru!</p>
        </div>
      </footer>
      {account && (
        <LogoutModal
          open={logoutOpen}
          onClose={() => setLogoutOpen(false)}
          onConfirm={() => {
            setLogoutOpen(false);
            setPage('beranda');
            window.scrollTo({ top: 0 });
          }}
          customerName={account.name}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BankProvider>
      <Shell />
    </BankProvider>
  );
}
