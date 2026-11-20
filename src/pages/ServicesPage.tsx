import { useState } from 'react';
import { Send, QrCode, Receipt, Wallet, History, ArrowRight, CheckCircle2, ScanLine, Smartphone, Zap, Droplets, Wifi, Tv2 } from 'lucide-react';
import { useBank } from '@/context/BankContext';
import { formatRupiah, parseRupiah } from '@/lib/format';
import Binky from '@/components/Binky';

type ServiceKey = 'transfer' | 'qris' | 'bill' | 'topup';

const services: { key: ServiceKey; label: string; icon: typeof Send }[] = [
  { key: 'transfer', label: 'Transfer', icon: Send },
  { key: 'qris', label: 'QRIS', icon: QrCode },
  { key: 'bill', label: 'Tagihan', icon: Receipt },
  { key: 'topup', label: 'Top Up E-Wallet', icon: Wallet },
];

const banks = ['BCA', 'Mandiri', 'BNI', 'BRI', 'Permata', 'CIMB Niaga'];
const bills = [
  { id: 'listrik', label: 'Token Listrik', icon: Zap },
  { id: 'air', label: 'PDAM / Air', icon: Droplets },
  { id: 'internet', label: 'Internet & WiFi', icon: Wifi },
  { id: 'tv', label: 'TV Kabel', icon: Tv2 },
];
const wallets = ['GoPay', 'OVO', 'DANA', 'ShopeePay', 'LinkAja'];

export default function ServicesPage() {
  const { account, addTransaction, transactions, showToast } = useBank();
  const [tab, setTab] = useState<ServiceKey>('transfer');

  // transfer
  const [trBank, setTrBank] = useState(banks[0]);
  const [trAccount, setTrAccount] = useState('');
  const [trName] = useState('Budi Santoso');
  const [trAmount, setTrAmount] = useState('');

  // qris
  const [qrScanned, setQrScanned] = useState(false);
  const [qrMerchant] = useState('Kopi Kenangan Senja');
  const [qrAmount] = useState(45000);

  // bill
  const [billId, setBillId] = useState('listrik');
  const [billNo, setBillNo] = useState('');
  const [billAmount, setBillAmount] = useState('');

  // topup
  const [wallet, setWallet] = useState(wallets[0]);
  const [walletPhone, setWalletPhone] = useState('');
  const [walletAmount, setWalletAmount] = useState('');

  if (!account) {
    return (
      <div className="max-w-6xl mx-auto px-5 pt-28 pb-20 text-center animate-pop-in">
        <div className="card-bento max-w-lg mx-auto p-10">
          <div className="flex justify-center animate-float">
            <Binky size={180} mood="wink" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold">Buat Rekening Dulu, Yuk!</h1>
          <p className="mt-2 text-sm text-inkSoft">
            Fitur simulasi transfer, QRIS, pembayaran, dan top up bisa dicoba setelah kamu
            membuka rekening BLINK Savers di halaman Simpanan.
          </p>
        </div>
      </div>
    );
  }

  const runTransfer = () => {
    const amount = parseRupiah(trAmount);
    if (!trAccount || amount <= 0) return;
    const ok = addTransaction({
      type: 'transfer',
      title: `Transfer ke ${trBank}`,
      detail: `${trName} • ${trAccount}`,
      amount: -amount,
    });
    if (ok) {
      showToast(`Transfer ${formatRupiah(amount)} ke ${trName} berhasil!`);
      setTrAmount('');
      setTrAccount('');
    }
  };

  const runQris = () => {
    if (!qrScanned) {
      setQrScanned(true);
      showToast('QR terdeteksi! Periksa merchant & nominal, lalu bayar.');
      return;
    }
    const ok = addTransaction({
      type: 'qris',
      title: 'Pembayaran QRIS',
      detail: qrMerchant,
      amount: -qrAmount,
    });
    if (ok) {
      showToast(`QRIS ${formatRupiah(qrAmount)} ke ${qrMerchant} berhasil!`);
      setQrScanned(false);
    }
  };

  const runBill = () => {
    const amount = parseRupiah(billAmount);
    if (!billNo || amount <= 0) return;
    const label = bills.find((b) => b.id === billId)?.label ?? 'Tagihan';
    const ok = addTransaction({
      type: 'bill',
      title: `Bayar ${label}`,
      detail: `No. Pelanggan ${billNo}`,
      amount: -amount,
    });
    if (ok) {
      showToast(`Tagihan ${label} ${formatRupiah(amount)} berhasil dibayar!`);
      setBillAmount('');
      setBillNo('');
    }
  };

  const runTopup = () => {
    const amount = parseRupiah(walletAmount);
    if (!walletPhone || amount <= 0) return;
    const ok = addTransaction({
      type: 'topup',
      title: `Top Up ${wallet}`,
      detail: `No. ${walletPhone}`,
      amount: -amount,
    });
    if (ok) {
      showToast(`Top Up ${wallet} ${formatRupiah(amount)} berhasil!`);
      setWalletAmount('');
      setWalletPhone('');
    }
  };

  const amountInput = (value: string, setter: (v: string) => void) => (
    <div className="relative mt-1.5">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-primary-600">Rp</span>
      <input
        className="input-field !pl-10 font-bold tabular-nums"
        placeholder="0"
        inputMode="numeric"
        value={value ? formatRupiah(parseRupiah(value)).replace('Rp ', '') : ''}
        onChange={(e) => setter(e.target.value.replace(/\D/g, ''))}
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-5 pt-24 pb-20 animate-pop-in">
      <div className="text-center">
        <span className="section-badge">Layanan Digital</span>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
          Semua Transaksi, <span className="text-primary-600">Satu Layar</span>
        </h1>
        <p className="mt-3 text-inkSoft max-w-xl mx-auto">
          Coba langsung simulasi transfer, QRIS, pembayaran tagihan, dan top up — saldomu
          berkurang secara nyata di rekening simulasimu.
        </p>
      </div>

      {/* balance strip */}
      <div className="mt-8 card-bento px-6 py-4 flex items-center justify-between max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary-600" />
          </span>
          <div>
            <p className="text-[11px] font-bold text-inkSoft uppercase tracking-wide">Saldo BLINK Savers</p>
            <p className="font-extrabold tabular-nums">{formatRupiah(account.balance)}</p>
          </div>
        </div>
        <p className="text-xs text-inkSoft">Rek. {account.number}</p>
      </div>

      {/* tabs */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex glass rounded-full p-1.5 gap-1 flex-wrap justify-center">
          {services.map((s) => (
            <button
              key={s.key}
              onClick={() => setTab(s.key)}
              className={`flex items-center gap-2 rounded-full px-4 md:px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                tab === s.key
                  ? 'bg-gradient-to-r from-primary-600 to-pinky-400 text-white shadow-lift'
                  : 'text-inkSoft hover:text-primary-600'
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 max-w-xl mx-auto">
        {/* TRANSFER */}
        {tab === 'transfer' && (
          <div className="card-bento p-6 animate-pop-in space-y-4">
            <h3 className="font-extrabold flex items-center gap-2">
              <Send className="w-4 h-4 text-primary-600" />
              Simulasi Transfer Antarbank
            </h3>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Bank Tujuan</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {banks.map((b) => (
                  <button
                    key={b}
                    onClick={() => setTrBank(b)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      trBank === b ? 'bg-primary-600 text-white shadow-soft' : 'bg-primary-50 border border-primary-100 text-inkSoft hover:border-primary-400'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nomor Rekening Tujuan</label>
              <input
                className="input-field mt-1.5 tabular-nums"
                placeholder="cth. 1234567890"
                inputMode="numeric"
                value={trAccount}
                onChange={(e) => setTrAccount(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nominal Transfer</label>
              {amountInput(trAmount, setTrAmount)}
              <p className="mt-1.5 text-xs text-inkSoft flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Gratis biaya transfer (kuota 20x/bulan)
              </p>
            </div>
            <button
              onClick={runTransfer}
              disabled={!trAccount || parseRupiah(trAmount) <= 0}
              className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Kirim Sekarang
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* QRIS */}
        {tab === 'qris' && (
          <div className="card-bento p-6 animate-pop-in text-center">
            <h3 className="font-extrabold flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4 text-primary-600" />
              Simulasi Scan QRIS
            </h3>
            <div className="mt-5 mx-auto w-52 h-52 rounded-bento border-4 border-primary-200 bg-white p-4 flex items-center justify-center relative overflow-hidden">
              {qrScanned ? (
                <div className="animate-pop-in">
                  <ScanLine className="w-12 h-12 text-emerald-500 mx-auto" />
                  <p className="mt-3 font-extrabold">{qrMerchant}</p>
                  <p className="text-sm text-inkSoft mt-0.5">Merchant terverifikasi</p>
                  <p className="mt-2 text-2xl font-extrabold text-primary-700 tabular-nums">{formatRupiah(qrAmount)}</p>
                </div>
              ) : (
                <div className="animate-float-slow">
                  <QrCode className="w-24 h-24 text-primary-300" />
                  <p className="mt-2 text-xs text-inkSoft">Klik "Scan QR" untuk mulai</p>
                </div>
              )}
              {qrScanned && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-pinky-400 to-transparent animate-pulse" />}
            </div>
            <button onClick={runQris} className="btn-primary w-full mt-5">
              {qrScanned ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Bayar {formatRupiah(qrAmount)}
                </>
              ) : (
                <>
                  <ScanLine className="w-4 h-4" />
                  Scan QR
                </>
              )}
            </button>
            {qrScanned && (
              <button onClick={() => setQrScanned(false)} className="mt-3 text-xs text-inkSoft underline underline-offset-4 hover:text-primary-600">
                Batalkan & scan ulang
              </button>
            )}
          </div>
        )}

        {/* BILLS */}
        {tab === 'bill' && (
          <div className="card-bento p-6 animate-pop-in space-y-4">
            <h3 className="font-extrabold flex items-center gap-2">
              <Receipt className="w-4 h-4 text-primary-600" />
              Simulasi Pembayaran Tagihan
            </h3>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Jenis Tagihan</label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {bills.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBillId(b.id)}
                    className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                      billId === b.id
                        ? 'bg-gradient-to-r from-primary-600 to-pinky-400 text-white shadow-soft'
                        : 'bg-primary-50 border border-primary-100 text-inkSoft hover:border-primary-400'
                    }`}
                  >
                    <b.icon className="w-4 h-4" />
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nomor Pelanggan</label>
              <input
                className="input-field mt-1.5 tabular-nums"
                placeholder="cth. 01023456789"
                inputMode="numeric"
                value={billNo}
                onChange={(e) => setBillNo(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nominal Tagihan</label>
              {amountInput(billAmount, setBillAmount)}
            </div>
            <button
              onClick={runBill}
              disabled={!billNo || parseRupiah(billAmount) <= 0}
              className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Bayar Sekarang
            </button>
          </div>
        )}

        {/* TOP UP */}
        {tab === 'topup' && (
          <div className="card-bento p-6 animate-pop-in space-y-4">
            <h3 className="font-extrabold flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary-600" />
              Simulasi Top Up E-Wallet
            </h3>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Pilih E-Wallet</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {wallets.map((w) => (
                  <button
                    key={w}
                    onClick={() => setWallet(w)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                      wallet === w ? 'bg-pinky-500 text-white shadow-soft' : 'bg-pinky-50 border border-pinky-100 text-inkSoft hover:border-pinky-400'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nomor HP Terdaftar</label>
              <input
                className="input-field mt-1.5 tabular-nums"
                placeholder="cth. 081234567890"
                inputMode="numeric"
                value={walletPhone}
                onChange={(e) => setWalletPhone(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nominal Top Up</label>
              {amountInput(walletAmount, setWalletAmount)}
              <div className="mt-2 flex gap-2 flex-wrap">
                {[25000, 50000, 100000, 200000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setWalletAmount(String(v))}
                    className="rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-[11px] font-bold text-primary-700 hover:bg-primary-100 transition-colors"
                  >
                    {formatRupiah(v)}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={runTopup}
              disabled={!walletPhone || parseRupiah(walletAmount) <= 0}
              className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Zap className="w-4 h-4" />
              Top Up Sekarang
            </button>
          </div>
        )}
      </div>

      {/* History */}
      <div className="mt-12 max-w-xl mx-auto">
        <h3 className="font-extrabold flex items-center gap-2">
          <History className="w-4 h-4 text-primary-600" />
          Riwayat Transaksi
        </h3>
        {transactions.length === 0 ? (
          <div className="mt-4 rounded-bento border-2 border-dashed border-primary-100 p-8 text-center">
            <div className="flex justify-center">
              <Binky size={100} mood="happy" />
            </div>
            <p className="text-sm text-inkSoft mt-2">
              Belum ada transaksi. Yuk coba transfer atau bayar QRIS di atas!
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-2.5">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="card-bento px-5 py-3.5 flex items-center justify-between hover:-translate-y-0.5 hover:shadow-lift transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      tx.amount >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-pinky-100 text-pinky-600'
                    }`}
                  >
                    {tx.type === 'transfer' && <Send className="w-4.5 h-4.5" />}
                    {tx.type === 'qris' && <QrCode className="w-4 h-4" />}
                    {tx.type === 'bill' && <Receipt className="w-4 h-4" />}
                    {tx.type === 'topup' && <Wallet className="w-4 h-4" />}
                    {tx.type === 'deposit' && <Wallet className="w-4 h-4" />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink truncate">{tx.title}</p>
                    <p className="text-xs text-inkSoft truncate">
                      {tx.detail} • {new Date(tx.timestamp).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className={`text-sm font-extrabold tabular-nums ${tx.amount >= 0 ? 'text-emerald-600' : 'text-pinky-600'}`}>
                    {tx.amount >= 0 ? '+' : ''}
                    {formatRupiah(tx.amount)}
                  </p>
                  <span className="inline-block mt-0.5 rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-700 uppercase">
                    {tx.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
