import { useState, useRef, useEffect } from 'react';
import {
  Send,
  QrCode,
  Receipt,
  Wallet,
  History,
  ArrowRight,
  CheckCircle2,
  ScanLine,
  Smartphone,
  Zap,
  Droplets,
  Wifi,
  Tv2,
  Camera,
  CameraOff,
  Upload,
  RotateCcw,
  ShoppingBag,
  Store,
  Check,
  Building2,
  Landmark,
} from 'lucide-react';
import { useBank } from '@/context/BankContext';
import { formatRupiah, parseRupiah } from '@/lib/format';
import Binky from '@/components/Binky';
import TransactionPinModal, { type PendingTransaction } from '@/components/TransactionPinModal';
import TransactionReceiptModal, { type ReceiptData } from '@/components/TransactionReceiptModal';

type ServiceKey = 'transfer' | 'qris' | 'bill' | 'topup';

const services: { key: ServiceKey; label: string; icon: typeof Send }[] = [
  { key: 'transfer', label: 'Transfer', icon: Send },
  { key: 'qris', label: 'Scan QRIS', icon: QrCode },
  { key: 'bill', label: 'Tagihan', icon: Receipt },
  { key: 'topup', label: 'Top Up E-Wallet', icon: Wallet },
];

const banks = ['Bank Cheeko', 'BCA', 'Mandiri', 'BNI', 'BRI', 'Permata', 'CIMB Niaga'];

const bills = [
  { id: 'listrik', label: 'Token Listrik', icon: Zap },
  { id: 'air', label: 'PDAM / Air', icon: Droplets },
  { id: 'internet', label: 'Internet & WiFi', icon: Wifi },
  { id: 'tv', label: 'TV Kabel', icon: Tv2 },
];

const wallets = ['GoPay', 'OVO', 'DANA', 'ShopeePay', 'LinkAja'];

const defaultMerchants = [
  'BLINK Merchant / UMKM Partner',
  'Kopi Binky & Bites',
  'Toko Berkah UMKM',
  'Kedai Kopi Senja',
];

export default function ServicesPage() {
  const { account, addTransaction, transactions, showToast } = useBank();
  const [tab, setTab] = useState<ServiceKey>('transfer');

  // Transaction Verification & Receipt Modals
  const [pendingTx, setPendingTx] = useState<PendingTransaction | null>(null);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // ================= TRANSFER =================
  const [trBank, setTrBank] = useState(banks[0]);
  const [trAccount, setTrAccount] = useState('');
  const [trName, setTrName] = useState('Budi Santoso');
  const [trAmount, setTrAmount] = useState('');

  // ================= QRIS =================
  type QrisStage = 'scanner' | 'confirm';
  const [qrisStage, setQrisStage] = useState<QrisStage>('scanner');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessingScan, setIsProcessingScan] = useState(false);

  const [qrMerchant, setQrMerchant] = useState(defaultMerchants[0]);
  const [qrItemName, setQrItemName] = useState('Pembelian Barang');
  const [qrAmount, setQrAmount] = useState('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ================= BILL =================
  const [billId, setBillId] = useState('listrik');
  const [billNo, setBillNo] = useState('');
  const [billAmount, setBillAmount] = useState('');

  // ================= TOPUP =================
  const [wallet, setWallet] = useState(wallets[0]);
  const [walletPhone, setWalletPhone] = useState('');
  const [walletAmount, setWalletAmount] = useState('');

  // Stop camera on unmount or tab switch
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [tab]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    setUploadedImage(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Kamera tidak didukung pada browser ini.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      showToast('Kamera aktif! Arahkan ke QRIS.');
    } catch (err: unknown) {
      console.warn('Camera access issue:', err);
      setIsCameraActive(false);
      setCameraError('Kamera tidak dapat diakses atau diblokir. Gunakan mode simulasi atau unggah gambar.');
    }
  };

  const handleSimulateCapture = () => {
    setIsProcessingScan(true);
    showToast('Memindai QR...');
    setTimeout(() => {
      stopCamera();
      setIsProcessingScan(false);
      setQrisStage('confirm');
      showToast('QR berhasil dipindai! Masukkan nominal pembayaran.');
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    stopCamera();
    const objectUrl = URL.createObjectURL(file);
    setUploadedImage(objectUrl);
    setIsProcessingScan(true);
    showToast('Memproses gambar QR...');

    setTimeout(() => {
      setIsProcessingScan(false);
      setQrisStage('confirm');
      showToast('QR terdeteksi! Masukkan nominal pembayaran.');
    }, 1000);
  };

  const resetQris = () => {
    stopCamera();
    setUploadedImage(null);
    setCameraError(null);
    setIsProcessingScan(false);
    setQrAmount('');
    setQrItemName('Pembelian Barang');
    setQrisStage('scanner');
  };

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
            membuka rekening BLINK di halaman Simpanan.
          </p>
        </div>
      </div>
    );
  }

  // ================= TRIGGER PIN MODALS FOR ALL SERVICES =================
  const requestTransfer = () => {
    const amount = parseRupiah(trAmount);
    if (!trAccount.trim()) {
      showToast('Nomor rekening tujuan tidak boleh kosong.');
      return;
    }
    if (amount <= 0) {
      showToast('Masukkan nominal transfer.');
      return;
    }
    if (amount > account.balance) {
      showToast('Saldo tidak mencukupi untuk transfer ini.');
      return;
    }

    const isCheeko = trBank === 'Bank Cheeko';
    setPendingTx({
      type: 'transfer',
      title: isCheeko ? 'Transfer Antarbank - Bank Cheeko' : `Transfer ke ${trBank}`,
      serviceLabel: isCheeko ? 'Transfer ke Bank Cheeko' : `Transfer ke ${trBank}`,
      destination: `${trName || 'Penerima'} • Rek. ${trAccount}`,
      amount,
      rawDetail: `${trName || 'Penerima'} • Rek. ${trAccount}`,
    });
    setIsPinModalOpen(true);
  };

  const requestQrisPayment = () => {
    const amount = parseRupiah(qrAmount);
    if (amount < 1000) {
      showToast('Nominal minimal pembayaran QRIS adalah Rp 1.000');
      return;
    }
    if (amount > account.balance) {
      showToast('Saldo tidak mencukupi untuk pembayaran ini.');
      return;
    }

    setPendingTx({
      type: 'qris',
      title: 'Pembayaran QRIS',
      serviceLabel: 'Pembayaran QRIS',
      destination: `${qrMerchant} (${qrItemName || 'Pembelian Barang'})`,
      amount,
      rawDetail: `${qrMerchant} • ${qrItemName || 'Pembelian Barang'}`,
    });
    setIsPinModalOpen(true);
  };

  const requestBill = () => {
    const amount = parseRupiah(billAmount);
    if (!billNo.trim()) {
      showToast('Nomor pelanggan tagihan tidak boleh kosong.');
      return;
    }
    if (amount <= 0) {
      showToast('Masukkan nominal tagihan.');
      return;
    }
    if (amount > account.balance) {
      showToast('Saldo tidak mencukupi untuk pembayaran tagihan ini.');
      return;
    }

    const label = bills.find((b) => b.id === billId)?.label ?? 'Tagihan';
    setPendingTx({
      type: 'bill',
      title: `Bayar ${label}`,
      serviceLabel: `Tagihan ${label}`,
      destination: `${label} • No. Pelanggan ${billNo}`,
      amount,
      rawDetail: `No. Pelanggan ${billNo}`,
    });
    setIsPinModalOpen(true);
  };

  const requestTopup = () => {
    const amount = parseRupiah(walletAmount);
    if (!walletPhone.trim()) {
      showToast('Nomor HP terdaftar tidak boleh kosong.');
      return;
    }
    if (amount <= 0) {
      showToast('Pilih atau masukkan nominal top up.');
      return;
    }
    if (amount > account.balance) {
      showToast('Saldo tidak mencukupi untuk top up ini.');
      return;
    }

    setPendingTx({
      type: 'topup',
      title: `Top Up ${wallet}`,
      serviceLabel: `Top Up ${wallet}`,
      destination: `${wallet} • No. ${walletPhone}`,
      amount,
      rawDetail: `No. ${walletPhone}`,
    });
    setIsPinModalOpen(true);
  };

  // ================= ON PIN SUCCESSFUL =================
  const handlePinSuccess = () => {
    if (!pendingTx) return;

    // Deduct balance and add transaction to history
    const ok = addTransaction({
      type: pendingTx.type,
      title: pendingTx.title,
      detail: pendingTx.rawDetail,
      amount: -pendingTx.amount,
    });

    if (ok) {
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const txRef = `BLK-${dateStr}-${randomSuffix}`;

      // Open E-Receipt Modal
      setReceiptData({
        id: txRef,
        title: pendingTx.title,
        serviceLabel: pendingTx.serviceLabel,
        destination: pendingTx.destination,
        amount: pendingTx.amount,
        timestamp: Date.now(),
        sourceName: account.name || 'Nasabah BLINK',
        sourceNumber: account.number || '0000000000',
      });

      setIsPinModalOpen(false);
      setIsReceiptModalOpen(true);

      // Clean up form inputs based on transaction type
      if (pendingTx.type === 'transfer') {
        setTrAmount('');
        setTrAccount('');
      } else if (pendingTx.type === 'qris') {
        resetQris();
      } else if (pendingTx.type === 'bill') {
        setBillAmount('');
        setBillNo('');
      } else if (pendingTx.type === 'topup') {
        setWalletAmount('');
        setWalletPhone('');
      }
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
          Coba langsung simulasi Scan QRIS kamera/unggah gambar, Transfer Antarbank termasuk Bank Cheeko, pembayaran tagihan, dan top up — saldomu
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
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-bold text-inkSoft uppercase tracking-wide">
                Saldo {account.productName || 'BLINK Savers'}
              </p>
              {account.productType === 'puresave' && (
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[9px] font-extrabold text-emerald-700">
                  0% Bunga
                </span>
              )}
            </div>
            <p className="font-extrabold tabular-nums text-lg">{formatRupiah(account.balance)}</p>
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
              onClick={() => {
                setTab(s.key);
                if (s.key !== 'qris') stopCamera();
              }}
              className={`flex items-center gap-2 rounded-full px-4 md:px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                tab === s.key
                  ? 'bg-gradient-to-r from-primary-600 to-pinky-400 text-white shadow-lift'
                  : 'text-inkSoft hover:text-primary-600'
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
              {s.key === 'qris' && (
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-extrabold">Baru</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 max-w-xl mx-auto">
        {/* ================= TRANSFER ================= */}
        {tab === 'transfer' && (
          <div className="card-bento p-6 animate-pop-in space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold flex items-center gap-2">
                <Send className="w-4 h-4 text-primary-600" />
                Simulasi Transfer Antarbank
              </h3>
              <span className="text-[11px] text-inkSoft font-bold bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
                Bebas Biaya Transfer
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Pilih Bank Tujuan</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {banks.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setTrBank(b);
                      if (b === 'Bank Cheeko') {
                        setTrName('Mitra Cheeko Nusantara');
                        if (!trAccount) setTrAccount('8899012345');
                      } else if (trName === 'Mitra Cheeko Nusantara') {
                        setTrName('Budi Santoso');
                      }
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      trBank === b
                        ? b === 'Bank Cheeko'
                          ? 'bg-gradient-to-r from-primary-600 to-pinky-500 text-white shadow-soft scale-105'
                          : 'bg-primary-600 text-white shadow-soft'
                        : b === 'Bank Cheeko'
                        ? 'bg-pinky-50 border-2 border-pinky-300 text-pinky-700 hover:bg-pinky-100 font-extrabold'
                        : 'bg-primary-50 border border-primary-100 text-inkSoft hover:border-primary-400'
                    }`}
                  >
                    {b === 'Bank Cheeko' ? 'Bank Cheeko (Mitra)' : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Highlight for Bank Cheeko */}
            {trBank === 'Bank Cheeko' && (
              <div className="rounded-2xl bg-gradient-to-r from-pinky-50 via-primary-50 to-pinky-100 border border-pinky-200 p-3.5 flex items-start gap-3 animate-pop-in">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pinky-500 to-primary-600 text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-soft">
                  <Building2 className="w-4 h-4 text-white" />
                </span>
                <div className="text-xs">
                  <p className="font-extrabold text-primary-800">Bank Cheeko (Mitra Resmi BLINK)</p>
                  <p className="text-inkSoft mt-0.5 leading-relaxed">
                    Transfer instan 24 jam dengan integrasi ekosistem Cheeko. Bebas biaya administrasi dan langsung masuk ke rekening tujuan.
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nomor Rekening Tujuan</label>
              <input
                className="input-field mt-1.5 tabular-nums"
                placeholder={trBank === 'Bank Cheeko' ? 'cth. 8899012345 (Rekening Bank Cheeko)' : 'cth. 1234567890'}
                inputMode="numeric"
                value={trAccount}
                onChange={(e) => setTrAccount(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nama Penerima</label>
              <input
                className="input-field mt-1.5"
                placeholder="Nama pemilik rekening"
                value={trName}
                onChange={(e) => setTrName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">Nominal Transfer</label>
              {amountInput(trAmount, setTrAmount)}
              <div className="mt-2 flex gap-2 flex-wrap">
                {[50000, 100000, 250000, 500000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setTrAmount(String(v))}
                    className="rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-[11px] font-bold text-primary-700 hover:bg-primary-100 transition-colors"
                  >
                    {formatRupiah(v)}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-inkSoft flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Gratis biaya transfer. Memerlukan verifikasi Sandi/PIN transaksi.
              </p>
            </div>

            <button
              onClick={requestTransfer}
              disabled={!trAccount || parseRupiah(trAmount) <= 0}
              className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Kirim ke {trBank} Sekarang
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= QRIS ================= */}
        {tab === 'qris' && (
          <div className="card-bento p-6 animate-pop-in">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-primary-100">
              <h3 className="font-extrabold flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary-600" />
                Scan QRIS Interaktif
              </h3>
              <span className="rounded-full bg-gradient-to-r from-pinky-100 to-primary-100 px-3 py-1 text-[11px] font-extrabold text-pinky-700 border border-pinky-200">
                Wondr-Style Viewfinder
              </span>
            </div>

            {/* STAGE 1: SCANNER */}
            {qrisStage === 'scanner' && (
              <div className="mt-5 space-y-5">
                <p className="text-xs text-inkSoft text-center max-w-sm mx-auto">
                  Scan QR code menggunakan kamera perangkat atau unggah gambar/foto QR dari galeri untuk memotong saldo secara instan.
                </p>

                {/* Viewfinder Frame */}
                <div className="relative mx-auto w-64 h-64 rounded-bento-lg border-4 border-dashed border-primary-300 bg-gradient-to-br from-primary-50 via-white to-pinky-50 p-2 flex items-center justify-center overflow-hidden shadow-soft">
                  {/* Viewfinder corners */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-primary-600 rounded-tl-xl pointer-events-none" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-primary-600 rounded-tr-xl pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-pinky-500 rounded-bl-xl pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-pinky-500 rounded-br-xl pointer-events-none" />

                  {/* Laser scan line animation */}
                  <div className="absolute inset-x-3 h-1 bg-gradient-to-r from-transparent via-pinky-500 to-transparent shadow-[0_0_12px_rgba(244,114,182,0.8)] animate-pulse z-20 pointer-events-none" />

                  {isCameraActive ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        playsInline
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 inset-x-0 text-center">
                        <span className="text-[10px] font-extrabold bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                          Live Camera View
                        </span>
                      </div>
                    </div>
                  ) : uploadedImage ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                      <img
                        src={uploadedImage}
                        alt="Uploaded QR"
                        className="w-full h-full object-contain"
                      />
                      {isProcessingScan && (
                        <div className="absolute inset-0 bg-primary-900/40 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                          <ScanLine className="w-8 h-8 animate-bounce text-pinky-300" />
                          <p className="text-xs font-bold mt-2">Membaca QR...</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <div className="animate-float-slow">
                        <QrCode className="w-20 h-20 text-primary-300" />
                      </div>
                      <p className="text-xs font-bold text-inkSoft mt-2">Arahkan kamera atau pilih gambar QR</p>
                      <p className="text-[10px] text-inkSoft/70">Bisa foto apa saja sebagai simulasi</p>
                    </div>
                  )}
                </div>

                {cameraError && (
                  <div className="rounded-2xl bg-pinky-50 border border-pinky-200 p-3 text-xs text-pinky-700 text-center">
                    {cameraError}
                  </div>
                )}

                {/* Scan Buttons */}
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-3">
                    {isCameraActive ? (
                      <button
                        onClick={stopCamera}
                        className="rounded-full border-2 border-pinky-300 bg-white text-pinky-600 px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-pinky-50 transition-colors"
                      >
                        <CameraOff className="w-4 h-4" />
                        Tutup Kamera
                      </button>
                    ) : (
                      <button
                        onClick={startCamera}
                        className="rounded-full border-2 border-primary-300 bg-white text-primary-700 px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary-50 transition-colors shadow-soft"
                      >
                        <Camera className="w-4 h-4" />
                        Buka Kamera
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-full border-2 border-pinky-300 bg-white text-pinky-600 px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-pinky-50 transition-colors shadow-soft"
                    >
                      <Upload className="w-4 h-4" />
                      Unggah Gambar QR
                    </button>
                  </div>

                  {/* Primary Trigger / Quick Simulate Action */}
                  <button
                    onClick={handleSimulateCapture}
                    disabled={isProcessingScan}
                    className="btn-primary w-full !py-3"
                  >
                    <ScanLine className="w-4 h-4" />
                    {isCameraActive ? 'Tangkap & Deteksi QR' : 'Simulasi Scan Sekarang'}
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2: CONFIRMATION & NOMINAL INPUT */}
            {qrisStage === 'confirm' && (
              <div className="mt-5 space-y-4 animate-pop-in">
                {/* Merchant Card */}
                <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-pinky-50 border border-primary-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Merchant Terverifikasi
                    </span>
                    <span className="text-[10px] text-inkSoft font-mono">NMID: ID20261188392</span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-pinky-500 flex items-center justify-center text-white shadow-soft shrink-0">
                      <Store className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-base text-ink truncate">{qrMerchant}</h4>
                      <p className="text-xs text-inkSoft">Mitra QRIS Nasional • BLINK Ecosystem</p>
                    </div>
                  </div>

                  {/* Quick Merchant Switcher */}
                  <div className="mt-3 pt-3 border-t border-primary-100/60 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                    <span className="text-[10px] font-bold text-inkSoft shrink-0">Ganti Merchant:</span>
                    {defaultMerchants.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setQrMerchant(m)}
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-colors ${
                          qrMerchant === m
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-inkSoft border border-primary-100 hover:border-primary-300'
                        }`}
                      >
                        {m.split(' / ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nominal Input (User specifies item price/amount) */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">
                      Nominal / Harga Barang yang Dibayar
                    </label>
                    <span className="text-xs font-bold text-primary-700">Min. Rp 1.000</span>
                  </div>
                  {amountInput(qrAmount, setQrAmount)}

                  {/* Quick Amount Chips */}
                  <div className="mt-2.5 flex gap-2 flex-wrap">
                    {[15000, 25000, 50000, 100000, 150000].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setQrAmount(String(v))}
                        className="rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-[11px] font-bold text-primary-700 hover:bg-primary-100 transition-colors"
                      >
                        {formatRupiah(v)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Item / Note Input */}
                <div>
                  <label className="text-xs font-bold text-inkSoft uppercase tracking-wide">
                    Nama Barang / Catatan Pembayaran
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-inkSoft">
                      <ShoppingBag className="w-4 h-4 text-primary-400" />
                    </span>
                    <input
                      className="input-field !pl-11 text-sm font-semibold"
                      placeholder="cth. 2 Kopi Susu & 1 Roti Bakar"
                      value={qrItemName}
                      onChange={(e) => setQrItemName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Source Account Info */}
                <div className="rounded-2xl bg-white border border-primary-100 p-3 text-xs flex items-center justify-between">
                  <span className="text-inkSoft">Sumber Dana:</span>
                  <span className="font-extrabold text-ink">
                    {account.productName || 'BLINK Savers'} (Sisa {formatRupiah(account.balance)})
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={requestQrisPayment}
                    disabled={parseRupiah(qrAmount) < 1000 || parseRupiah(qrAmount) > account.balance}
                    className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Bayar {qrAmount ? formatRupiah(parseRupiah(qrAmount)) : 'Sekarang'}
                  </button>

                  <button
                    onClick={resetQris}
                    className="w-full py-2 text-xs font-bold text-inkSoft hover:text-primary-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Batalkan & Scan Ulang
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= BILLS ================= */}
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
              onClick={requestBill}
              disabled={!billNo || parseRupiah(billAmount) <= 0}
              className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Bayar Sekarang
            </button>
          </div>
        )}

        {/* ================= TOP UP ================= */}
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
                      wallet === w
                        ? 'bg-pinky-500 text-white shadow-soft'
                        : 'bg-pinky-50 border border-pinky-100 text-inkSoft hover:border-pinky-400'
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
              onClick={requestTopup}
              disabled={!walletPhone || parseRupiah(walletAmount) <= 0}
              className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Zap className="w-4 h-4" />
              Top Up Sekarang
            </button>
          </div>
        )}
      </div>

      {/* ================= RIWAYAT TRANSAKSI ================= */}
      <div id="riwayat-transaksi" className="mt-12 max-w-xl mx-auto scroll-mt-24">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold flex items-center gap-2">
            <History className="w-4 h-4 text-primary-600" />
            Riwayat Transaksi
          </h3>
          <span className="text-xs text-inkSoft font-semibold">{transactions.length} transaksi tercatat</span>
        </div>

        {transactions.length === 0 ? (
          <div className="mt-4 rounded-bento border-2 border-dashed border-primary-100 p-8 text-center">
            <div className="flex justify-center">
              <Binky size={100} mood="happy" />
            </div>
            <p className="text-sm text-inkSoft mt-2">
              Belum ada transaksi. Yuk coba transfer atau scan bayar QRIS di atas!
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
                      {tx.detail} •{' '}
                      {new Date(tx.timestamp).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p
                    className={`text-sm font-extrabold tabular-nums ${
                      tx.amount >= 0 ? 'text-emerald-600' : 'text-pinky-600'
                    }`}
                  >
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

      {/* ================= TRANSACTION PIN MODAL ================= */}
      <TransactionPinModal
        open={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handlePinSuccess}
        pendingTx={pendingTx}
        customerPin={account.pin || '123456'}
      />

      {/* ================= TRANSACTION RECEIPT MODAL (DANA STYLE) ================= */}
      <TransactionReceiptModal
        open={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        receipt={receiptData}
        onToast={showToast}
      />
    </div>
  );
}
