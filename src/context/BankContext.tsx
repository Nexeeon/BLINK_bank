import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { formatRupiah } from '@/lib/format';

export interface Account {
  name: string;
  nik: string;
  phone: string;
  email: string;
  number: string;
  balance: number;
  productType?: 'savers' | 'puresave';
  productName?: string;
  birthDate?: string;
  occupation?: string;
  address?: string;
  pin?: string;
}

export interface Transaction {
  id: string;
  type: 'transfer' | 'qris' | 'bill' | 'topup' | 'deposit';
  title: string;
  detail: string;
  amount: number; // negative = out, positive = in
  timestamp: number;
}

interface BankState {
  account: Account | null;
  setAccount: (a: Account | null) => void;
  updateAccount: (data: Partial<Account>) => void;
  balanceVisible: boolean;
  setBalanceVisible: (v: boolean) => void;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id' | 'timestamp'>) => boolean;
  creditApplication: { type: string; amount: number; tenor: number; status: string } | null;
  setCreditApplication: (v: { type: string; amount: number; tenor: number; status: string } | null) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  formattedBalance: string;
  sessionEnded: boolean;
  logout: () => void;
  resumeSession: () => void;
  resetForNewAccount: () => void;
}

const BankContext = createContext<BankState | null>(null);

export function BankProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useLocalStorage<Account | null>('blink-account', null);
  const [balanceVisible, setBalanceVisible] = useLocalStorage<boolean>('blink-balance-visible', true);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('blink-transactions', []);
  const [creditApplication, setCreditApplication] = useLocalStorage<BankState['creditApplication']>('blink-credit', null);
  const [sessionEnded, setSessionEnded] = useLocalStorage<boolean>('blink-session-ended', false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const updateAccount = (data: Partial<Account>) => {
    if (!account) return;
    const updated: Account = { ...account, ...data };
    setAccount(updated);
  };

  const addTransaction = (t: Omit<Transaction, 'id' | 'timestamp'>): boolean => {
    if (!account) return false;
    if (t.amount < 0 && account.balance + t.amount < 0) {
      showToast('Saldo tidak cukup untuk transaksi ini.');
      return false;
    }
    const newTx: Transaction = { ...t, id: `tx-${Date.now()}`, timestamp: Date.now() };
    setTransactions((prev) => [newTx, ...prev].slice(0, 50));
    setAccount({ ...account, balance: account.balance + t.amount });
    return true;
  };

  return (
    <BankContext.Provider
      value={{
        account,
        setAccount,
        updateAccount,
        balanceVisible,
        setBalanceVisible,
        transactions,
        addTransaction,
        creditApplication,
        setCreditApplication,
        toast,
        showToast,
        formattedBalance: account ? formatRupiah(account.balance) : 'Rp 0',
        sessionEnded,
        logout: () => setSessionEnded(true),
        resumeSession: () => setSessionEnded(false),
        resetForNewAccount: () => {
          setAccount(null);
          setTransactions([]);
          setCreditApplication(null);
          setSessionEnded(false);
        },
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-pop-in">
          <div className="bg-ink text-white text-sm font-medium px-5 py-3 rounded-full shadow-lift flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pinky-400 animate-pulse" />
            {toast}
          </div>
        </div>
      )}
    </BankContext.Provider>
  );
}

export function useBank() {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error('useBank must be used within BankProvider');
  return ctx;
}
