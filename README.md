# 🏛️ Pegadaian CP Sentul Yogyakarta - Sistem Antrian Online

Aplikasi web sistem antrian online untuk Pegadaian Cabang Pembantu Sentul Yogyakarta. Dibangun dengan Next.js, Firebase, dan Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## ✨ Fitur

### Untuk Nasabah (Publik)
- 🎫 **Ambil Nomor Antrian** - Gadai (GD-XXX) & Non-Gadai (NG-XXX)
- ⏱️ **Cooldown 10 Menit** - Mencegah spam, dengan countdown timer
- 📱 **Realtime Update** - Pantau nomor yang sedang dilayani
- 🔗 **Share Link Antrian** - Bagikan/simpan link untuk pantau status
- 💾 **Auto-Save** - Nomor tersimpan di browser (localStorage)
- 🔄 **Auto-Reset Detection** - Jika antrian di-reset, cooldown hilang & bisa ambil baru

### Halaman Status Publik
- 📊 **`/antrian/status?kode=GD-001`** - Pantau status antrian tanpa login
- Estimasi posisi dalam antrian
- Update realtime

### Untuk Pegawai (Dashboard)
- 🔐 **Login Aman** - Firebase Authentication
- 👨‍💼 **Role-Based Access** - Admin, Teller, Petugas Antrian

#### Teller (`/dashboard/teller`)
- 📞 **Panggil Antrian** - Panggil nomor berikutnya
- Hanya bisa panggil sesuai jenis antrian yang ditugaskan
- Tercatat di log siapa yang melayani

#### Admin (`/dashboard/admin`)
- ⚙️ **Kontrol Antrian** - Buka/tutup antrian
- 🔄 **Reset Manual** - Reset antrian ke 0 (juga hapus cooldown)
- 📊 **Laporan Harian** - Statistik per hari dengan filter tanggal
- 📥 **Export CSV** - Download laporan

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
│   └── dashboard/
│       ├── layout.tsx              # Dashboard Layout (Auth Guard)
│       ├── page.tsx                # Redirect berdasarkan role
│       ├── admin/
│       │   ├── page.tsx            # Dashboard Admin
│       │   └── history/page.tsx    # Laporan Harian
│       ├── teller/page.tsx         # Dashboard Teller
│       └── petugas/page.tsx        # Dashboard Petugas Antrian
├── components/
│   ├── Navbar.tsx                  # Shared Navigation
│   └── home/                       # Homepage Components
├── hooks/
│   ├── useAuth.ts                  # Authentication State
│   └── useQueue.ts                 # Realtime Queue Listener
└── lib/
    ├── firebase.ts                 # Firebase Config
    ├── queue-service.ts            # Queue Logic (Transactions)
    ├── cooldown-service.ts         # Cooldown Logic
    ├── stats-service.ts            # Daily Statistics
    ├── types.ts                    # TypeScript Interfaces
    └── utils.ts                    # Utility Functions
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
```

## 🎨 Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| **Next.js 16** | Framework React dengan App Router |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling (Mobile-first) |
| **Firebase Auth** | Authentication |
| **Firestore** | Database Realtime |

## 🔐 Role & Access

| Fitur | Nasabah | Teller | Petugas | Admin |
|-------|---------|--------|---------|-------|
| Lihat Homepage | ✅ | ✅ | ✅ | ✅ |
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
