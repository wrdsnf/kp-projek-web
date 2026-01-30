# 🏛️ Pegadaian CP Sentul Yogyakarta - Website & Sistem Antrian Online

Aplikasi web company profile dan sistem antrian online untuk Pegadaian Cabang Pembantu Sentul Yogyakarta. Dibangun dengan Next.js, Firebase, dan Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## ✨ Fitur

### Homepage & Company Profile
- 🏠 **Landing Page** - Hero section dengan branding Pegadaian
- 📦 **Produk & Layanan** - Informasi lengkap produk Pegadaian
- ⏱️ **Alur Layanan** - Panduan step-by-step untuk nasabah
- ⭐ **Ulasan Nasabah** - Review dari pelanggan
- 📱 **Info Aplikasi Tring** - Promosi aplikasi mobile Pegadaian
- 📍 **Informasi Outlet** - Alamat, jam operasional, kontak
- 🖼️ **Manajemen Konten** - Ubah gambar banner/promo langsung dari dashboard
- ⚙️ **Pengaturan Tring** - Atur kode referral & link download aplikasi Tring

### Halaman Produk
- 💎 **Gadai Emas** (`/produk/gadai-emas`) - Layanan gadai emas & perhiasan
- 💻 **Gadai Non-Emas** (`/produk/gadai-non-emas`) - Gadai elektronik & kendaraan
- 🪙 **Tabungan Emas** (`/produk/tabungan-emas`) - Investasi emas mulai Rp10.000
- 🏦 **Pembiayaan** (`/produk/pembiayaan`) - KREASI, KRASIDA, Amanah, Rahn
- 💳 **Jasa Lainnya** (`/produk/jasa-lainnya`) - Pembayaran tagihan, transfer, dll

### Sistem Antrian Online

#### Untuk Nasabah (Publik)
- 🎫 **Ambil Nomor Antrian** - Gadai (GD-XXX) & Non-Gadai (NG-XXX)
- ⏱️ **Cooldown 10 Menit** - Mencegah spam, dengan countdown timer
- 📱 **Realtime Update** - Pantau nomor yang sedang dilayani
- 🔗 **Share Link Antrian** - Bagikan/simpan link untuk pantau status
- 💾 **Auto-Save** - Nomor tersimpan di browser (localStorage)
- 🔄 **Auto-Reset Detection** - Jika antrian di-reset, cooldown hilang & bisa ambil baru
- 🖼️ **Download Tiket** - Simpan tiket antrian sebagai gambar (JPG)
- 📱 **QR Code** - Scan QR untuk memantau antrian di HP lain

#### Halaman Status Publik
- 📊 **`/antrian/status?kode=GD-001`** - Pantau status antrian tanpa login
- Estimasi posisi dalam antrian
- Update realtime

### Dashboard Pegawai

#### Teller (`/dashboard/teller`)
- 📞 **Panggil Antrian** - Panggil nomor berikutnya
- Hanya bisa panggil sesuai jenis antrian yang ditugaskan
- Tercatat di log siapa yang melayani

#### Admin (`/dashboard/admin`)
- ⚙️ **Kontrol Antrian** - Buka/tutup antrian
- 🔄 **Reset Manual** - Reset antrian ke 0 (juga hapus cooldown)
- 📊 **Laporan Harian** - Statistik per hari dengan filter tanggal
- 📥 **Export CSV** - Download laporan
- 🖼️ **Kelola Homepage** - Upload gambar promo/banner baru
- 📱 **Kelola Link Tring** - Update link download & kode referral

#### Petugas Antrian (`/dashboard/petugas`)
- 🎫 **Ambil Antrian Manual** - Untuk nasabah lansia/tanpa HP
- ⏱️ **Tanpa Cooldown** - Bisa ambil berkali-kali
- 📝 **Tercatat di Log** - Ditandai sebagai "manual input"

## 📁 Struktur Folder

```
src/
├── app/
│   ├── page.tsx                    # Homepage (Landing Page)
│   ├── about/page.tsx              # Halaman Tentang Kami
│   ├── queue/page.tsx              # Halaman Antrian Nasabah
│   ├── antrian/status/page.tsx     # Status Antrian Publik
│   ├── login/page.tsx              # Login Pegawai
│   ├── api/                        # API Routes
│   │   └── upload-image/           # Cloudinary Upload API
│   ├── produk/                     # Halaman Produk
│   │   └── ...
│   └── dashboard/
│       ├── layout.tsx              # Dashboard Layout (Auth Guard)
│       ├── page.tsx                # Redirect berdasarkan role
│       ├── admin/
│       │   ├── page.tsx            # Dashboard Admin
│       │   ├── history/page.tsx    # Laporan Harian
│       │   ├── content/page.tsx    # Manajemen Konten Homepage
│       │   └── settings/page.tsx   # Pengaturan Aplikasi Tring
│       ├── teller/page.tsx         # Dashboard Teller
│       └── petugas/page.tsx        # Dashboard Petugas Antrian
├── components/
│   ├── Navbar.tsx                  # Shared Navigation
│   ├── ProductNav.tsx              # Product Navigation & Section
│   ├── QueueTicket.tsx             # Queue Ticket Component
│   ├── ImageViewerModal.tsx        # Modal View Gambar
│   └── home/                       # Homepage Components
├── hooks/
│   ├── useAuth.ts                  # Authentication State
│   └── useQueue.ts                 # Realtime Queue Listener
└── lib/
    ├── firebase.ts                 # Firebase Config
    ├── queue-service.ts            # Queue Logic
    ├── homepage-service.ts         # Homepage Content Logic
    ├── tring-service.ts            # Tring Settings Logic
    ├── image-compression.ts        # Image Optimization
    └── ...                         # Other utils
```

## 🗄️ Database Schema (Firestore)

```
queues/{gadai|non_gadai}
├── currentNumber: number
├── lastNumber: number
├── status: "open" | "closed"
├── date: "YYYY-MM-DD"
└── updatedAt: timestamp

queue_logs/{autoId}
├── type: "gadai" | "non_gadai"
├── number: number
├── date: "YYYY-MM-DD"
├── time: timestamp
├── status: "waiting" | "called" | "completed" | "skipped"
├── deviceId?: string
├── isManualInput?: boolean
├── createdBy?: string (uid petugas)
├── servedBy?: string (uid teller)
└── servedAt?: timestamp

cooldowns/{deviceId_type}
├── deviceId: string
├── type: "gadai" | "non_gadai"
├── lastTakeTime: timestamp
└── date: "YYYY-MM-DD"

daily_stats/{YYYY-MM-DD}
├── date: string
├── totalCustomers: number
├── gadaiCount: number
├── nonGadaiCount: number
├── manualInputCount: number
├── peakHour?: string
└── closedAt?: timestamp

users/{uid}
├── uid: string
├── email: string
├── name: string
├── role: "admin" | "teller" | "petugas_antrian"
└── handleQueue: ["gadai", "non_gadai"]

settings/homepage_images
├── harga_emas_hari_ini: { url, updatedAt, ... }
├── harga_emas_tring: { url, updatedAt, ... }
└── ...

settings/tring_app
├── referralCode: string
├── appStoreUrl: string
└── playStoreUrl: string
```

## 🎨 Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| **Next.js 16** | Framework React dengan App Router |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling (Mobile-first) |
| **Firebase Auth** | Authentication |
| **Firestore** | Database Realtime |
| **Cloudinary** | Media/Image Management |
| **Lucide React** | Icon Library |
| **html-to-image** | Export Ticket to Image |
| **qrcode.react** | Generate QR Code |

## 🎨 Brand Colors

| Warna | Hex | Penggunaan |
|-------|-----|------------|
| **emerald 600** | `#16a34a` | Primary accent, buttons, icons |
| **emerald 800** | `#166534` | Headers, dark sections |
| **emerald 950** | `#052e16` | Footer, navbar |
| **Amber 500** | `#f59e0b` | Secondary accent, highlights |
| **Gray 50** | `#f9fafb` | Section backgrounds |

## 🔐 Role & Access

| Fitur | Nasabah | Teller | Petugas | Admin |
|-------|---------|--------|---------|-------|
| Lihat Homepage | ✅ | ✅ | ✅ | ✅ |
| Lihat Produk | ✅ | ✅ | ✅ | ✅ |
| Ambil Antrian | ✅ (cooldown) | ✅ | ✅ (no limit) | ✅ |
| Panggil Antrian | ❌ | ✅ | ❌ | ✅ |
| Buka/Tutup Antrian | ❌ | ❌ | ❌ | ✅ |
| Reset Manual | ❌ | ❌ | ❌ | ✅ |
| Lihat Laporan | ❌ | ❌ | ❌ | ✅ |

## 📱 Responsive Design

Aplikasi dioptimalkan untuk:
- 📱 Mobile (375px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan Firebase config

# Run development server
npm run dev

# Build for production
npm run build
```

## 📄 License

MIT License - Free to use for personal and commercial projects.
