# Product Requirements Document (PRD)

**Project Name:** BLINK Digital Bank — Web Banking Ecosystem
**Target Tool:** Google Stitch (UI/UX Design & Prototyping)
**Project Scope:** Tahap 1 (Bank Identity & Funding Products) + Core Ecosystem Navigation
**Design Inspiration:** BNI wondr (Playful, Clean, Dimension-rich Fintech UI)
**Platform:** Responsive Web Application (Desktop & Mobile View)

---

## 1. Product Overview & Brand Identity

**BLINK** adalah aplikasi perbankan digital berbasis web dengan pendekatan yang ramah, ekspresif, dan menyenangkan (*playful & effortless*). Terinspirasi dari pengalaman pengguna **wondr by BNI**, BLINK mengubah aktivitas perbankan yang kaku menjadi pengalaman visual yang segar, interaktif, dan dekat dengan generasi muda maupun pelaku UMKM.

* **Brand Name:** BLINK (BLINK Digital Bank)
* **Tagline:** *"Nabung & Transaksi dalam Sekejap, Jadi Lebih Seru!"*
* **Karakteristik Bank:** Bank Digital Konvensional modern (100% layanan digital tanpa antre di kantor cabang, transparan, dan bebas biaya admin tersembunyi).
* **Brand Mascot:** **"Binky" (3D Cute Pastel Piggy Mascot)**
  * Karakter babi bulat menggemaskan (*3D clay/matte render style*) berwarna *soft pastel pink* dengan aksen kacamata atau syal ungu muda dan koin emas berkilau.
  * **Peran Mascot di UI:** Muncul di *Hero Section* menyambut pengguna, menjadi pemandu di kartu produk (misal: Binky memegang celengan untuk Tabungan, Binky memakai dasi bisnis untuk Giro, Binky bersantai di atas tumpukan koin untuk Deposito), serta bereaksi saat pengguna berinteraksi dengan simulasi.
* **Visual & Color Palette (Pastel Purple & Pink Aesthetic):**
  * **Primary Brand Color:** Soft Lavender Purple (`#9D7FEA` / `#8B5CF6`) untuk tombol utama, header aksen, dan elemen interaktif.
  * **Secondary / Accent Color:** Pastel Blossom Pink (`#F472B6` / `#F9A8D4`) untuk *highlight*, *badge* promo, dan gradien lembut.
  * **Gradient Signature (wondr-inspired):** Soft Lilac-to-Peach/Pink Mesh Gradient (`linear-gradient(135deg, #EDE9FE 0%, #FCE7F3 50%, #F3E8FF 100%)`) untuk *hero banner* dan kartu saldo utama.
  * **Background Surface:** Warm Pearl White (`#FAF8FF`) dengan kartu putih bersih (`#FFFFFF`), *soft drop shadow* berwarna ungu tipis (`rgba(139, 92, 246, 0.08)`), dan sudut membulat besar (`24px` – `32px`).
  * **Typography:** Rounded modern geometric sans-serif (seperti *Plus Jakarta Sans* atau *Outfit*) dengan kontras tebal untuk angka finansial dan judul ramah.

---

## 2. Interactive & wondr-Inspired UX Principles

Untuk menghadirkan nuansa **wondr by BNI**, desain harus memiliki elemen interaktif berikut:
1. **3-Dimension Financial View (Transaksi, Insight, Growth):** Layout dashboard yang membagi fokus secara jelas antara kebutuhan harian (Tabungan & QRIS), bisnis (Giro), dan pertumbuhan aset (Deposito).
2. **Bento-Grid Cards & Micro-interactions:** Kartu produk dengan efek *hover lift*, transisi *pill-tabs* yang mulus saat berpindah antar produk simpanan, dan animasi visual pada maskot Binky.
3. **Interactive Widgets (Real-time Client Simulation):**
   * **Interactive Virtual Debit Card:** Kartu debit digital BLINK berwarna gradasi ungu-pink pastel yang bisa di-*flip* (putar) atau di-*toggle* untuk menampilkan/menyembunyikan nomor rekening dan saldo simulasi.
   * **Interactive Yield & Interest Simulator:** Slider interaktif pada Deposito dan Tabungan untuk melihat pertumbuhan uang secara langsung dengan visualisasi grafik/bar pastel.

---

## 3. Information Architecture & Navigation

Website berada dalam **satu ekosistem terpadu** dengan *floating glassmorphism top navbar* yang berisi:
1. **Beranda (Home)** — Dashboard interaktif ekosistem BLINK bersama maskot Binky.
2. **Profil Bank** — Cerita BLINK, identitas bank, keunggulan kompetitif, dan filosofi maskot.
3. **Simpanan (Fokus Utama Tahap 1)** — Katalog interaktif Tabungan, Giro, dan Deposito.
4. **Kredit** — Preview & formulir simulasi Kredit Konsumtif & Kredit Produktif/UMKM.
5. **Layanan Digital** — Simulasi interaktif Transfer, Pembayaran Tagihan, QRIS, Top Up E-Wallet, dan Riwayat Transaksi.

---

## 4. Detailed Page & Screen Requirements (Tahap 1 Focus)

### Screen 1: Homepage / Interactive Ecosystem Dashboard
* **Hero Section (wondr-style Split Layout):**
  * **Kiri:** Headline *playful* *"Atur Duit dalam Sekejap Bareng BLINK!"*, sub-headline singkat, dan dua tombol *pill-shaped*: **"Buka Tabungan Sekarang"** (Primary Purple Gradient) & **"Kenalan sama BLINK"** (Soft Pink Outline).
  * **Kanan:** Ilustrasi 3D Maskot Babi **Binky** yang melayang dikelilingi elemen *floating UI cards* (notifikasi transaksi masuk, grafik bunga naik, dan ikon QRIS).
* **Interactive Quick-Action Bento Grid (4 Pilar Utama):**
  * Kartu **Simpanan** (Tabungan, Giro, Deposito) — aksen Lavender.
  * Kartu **Kredit** (Kredit Personal & UMKM) — aksen Pastel Pink.
  * Kartu **Transfer & Top Up** (Simulasi transfer & e-wallet) — aksen Soft Violet.
  * Kartu **Pembayaran & QRIS** (Tagihan & simulasi scan QRIS) — aksen Peach Pink.
* **Keunggulan BLINK Strip:** 3 kartu kecil interaktif dengan ikon 3D (Bunga Kompetitif, Bebas Biaya Admin, Transaksi 24/7).

### Screen 2: Halaman Profil Bank (Bank Identity)
* **Tentang BLINK & Maskot Binky:** Penjelasan konsep bank digital fiktif yang mengusung semangat menabung modern dan inklusif.
* **Karakteristik & Model Layanan:**
  * Jenis Bank: Bank Digital Konvensional.
  * Segmentasi Nasabah: Individu/Gen-Z/Profesional (Tabungan & Deposito) serta Pelaku Usaha/UMKM (Giro).
  * Model Pelayanan Digital: *100% Digital Self-Service*, simulasi pembukaan rekening instan, dan bantuan interaktif.
* **Visi, Misi & Keunggulan Kompetitif:** Disajikan dalam kartu *bento* dua kolom berwarna ungu muda dan pink muda lembut.

### Screen 3: Katalog & Detail Produk Simpanan (Core Funding Portfolio)
Menggunakan **Interactive Pill-Tab Switcher** (`BLINK Savers` | `BLINK BizGiro` | `BLINK MaxDepo`) serta tampilan perbandingan lengkap di bagian bawah:

#### A. Produk 1: BLINK Savers (Tabungan)
* **Visual Header:** Maskot Binky memegang celengan kristal ungu-pink.
* **Informasi Wajib yang Ditampilkan:**
  * **Nama Produk:** BLINK Savers
  * **Manfaat:** Bebas biaya admin bulanan, gratis transfer antarbank (kuota 20x/bulan), langsung terhubung ke QRIS & E-Wallet.
  * **Setoran Awal:** Rp 50.000
  * **Biaya Administrasi:** Rp 0 / bulan (Gratis)
  * **Saldo Minimum:** Rp 25.000
  * **Suku Bunga:** 3,0% p.a. (dihitung harian, dibayarkan tiap akhir bulan)
* **Fitur Interaktif Wajib:**
  1. **Simulasi Pembukaan Rekening Tabungan:** Formulir interaktif (Nama Lengkap, NIK, No. HP, Email, Setoran Awal) -> setelah disubmit, langsung memunculkan animasi sukses bersama Binky dan membuat rekening simulasi baru.
  2. **Widget Kartu & Informasi Saldo Simulasi:** Kartu virtual BLINK ungu-pink pastel yang menampilkan Nama Nasabah, Nomor Rekening virtual, dan Saldo Aktif (default `Rp 2.500.000` atau sesuai setoran awal yang diinput) lengkap dengan tombol *eye icon* (hide/show saldo) dan tombol *copy* nomor rekening.

#### B. Produk 2: BLINK BizGiro (Giro)
* **Visual Header:** Maskot Binky memakai kacamata & dasi bisnis dengan ikon grafik toko/UMKM.
* **Informasi Wajib yang Ditampilkan:**
  * **Nama Produk:** BLINK BizGiro
  * **Manfaat:** Kelancaran transaksi bisnis nominal besar, e-Statement rekening koran otomatis, dan manajemen arus kas usaha.
  * **Karakteristik:** Penarikan fleksibel kapan saja menggunakan pemindahbukuan digital, cek, atau bilyet giro; mendukung multi-otorisasi.
  * **Persyaratan:** e-KTP pengurus/pemilik usaha, NPWP, NIB/SIUP/Akta Pendirian Usaha, serta setoran awal minimum Rp 1.000.000.
  * **Biaya:** Biaya administrasi bulanan Rp 25.000; biaya buku cek/bilyet giro sesuai ketentuan berlaku.
* **Fitur Interaktif Wajib:**
  * **Tombol CTA "Simulasi Buka Rekening Giro":** Tombol *pill* ungu-pink dengan ikon *external link* yang **menghubungkan langsung ke Google Form** pendaftaran Giro (`[Link Google Form Giro]`).

#### C. Produk 3: BLINK MaxDepo (Deposito Berjangka)
* **Visual Header:** Maskot Binky bersantai di atas koin emas & perisai keamanan pastel.
* **Informasi Wajib yang Ditampilkan:**
  * **Nama Produk:** BLINK MaxDepo
  * **Tenor Pilihan:** 1 Bulan, 3 Bulan, 6 Bulan, dan 12 Bulan.
  * **Suku Bunga:**
    * 1 Bulan: 4,25% p.a.
    * 3 Bulan: 4,75% p.a.
    * 6 Bulan: 5,25% p.a.
    * 12 Bulan: 5,75% p.a.
  * **Minimum Penempatan:** Rp 1.000.000 (kelipatan Rp 500.000).
* **Fitur Interaktif Wajib:**
  1. **Kalkulator Estimasi Bunga Interaktif:** Pengguna bisa menggeser *slider* nominal penempatan (`Rp 1 Juta` – `Rp 500 Juta`) dan memilih *pill* tenor (`1/3/6/12 Bulan`) untuk melihat estimasi bunga yang didapat secara *real-time*.
  2. **Tombol CTA "Simulasi Buka Rekening Deposito":** Tombol *pill* dengan ikon *external link* yang **menghubungkan langsung ke Google Form** pembukaan Deposito (`[Link Google Form Deposito]`).

---

## 5. Ecosystem Preview Components (Kredit & Layanan Digital)

Agar seluruh ekosistem bank tetap menyatu dalam satu website:
* **Section/Tab Kredit:** Menampilkan 2 kartu interaktif (**Kredit Konsumtif** — plafon, tenor, bunga, tombol form pengajuan; **Kredit Produktif/UMKM** — plafon, tenor, bunga, tujuan kredit, tombol form pengajuan).
* **Section/Tab Layanan Digital:** Menampilkan simulasi interaktif untuk **Transfer**, **Pembayaran Tagihan**, **Simulasi QRIS** (tampilan kode QR & tombol simulasi bayar), **Top Up E-Wallet**, dan **Riwayat Transaksi** dengan badge warna ungu-pink pastel.

---

## 6. Design & UX Constraints for Google Stitch

1. **No Real Backend / No Complex Auth:** Semua form tabungan, kalkulator deposito, dan widget saldo berjalan sebagai simulasi interaktif langsung di layar (*client-side state*) tanpa proses login rumit.
2. **Clear Google Form Integration:** Produk **Giro** dan **Deposito** wajib memiliki tombol aksi yang jelas menuju **Google Form** untuk simulasi pembukaan rekeningnya.
3. **Comparison Table:** Tambahkan tabel perbandingan visual yang bersih antara **BLINK Savers (Tabungan)**, **BLINK BizGiro (Giro)**, dan **BLINK MaxDepo (Deposito)** di bagian bawah halaman Simpanan.