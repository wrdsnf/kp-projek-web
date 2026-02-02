# Pegadaian Sentul – Sistem Antrian Digital

Sistem antrian digital berbasis web untuk **Pegadaian Cabang Sentul**. Aplikasi ini memungkinkan nasabah mengambil nomor antrian secara online, dengan dashboard khusus untuk Admin, Petugas, dan Teller.

## 🔗 Live Demo

**[https://pegadaiansentul.netlify.app](https://pegadaiansentul.netlify.app)**

---

## ✨ Fitur Utama

- **Pengambilan Antrian Online** – Nasabah dapat mengambil nomor antrian dari browser tanpa perlu ke kantor
- **Auto Reset Harian** – Antrian reset otomatis setiap hari pukul **06:00 WIB**
- **Jadwal Operasional Otomatis** – Buka/tutup antrian otomatis berdasarkan hari dan jam operasional
- **Manual Override** – Admin dapat membuka/menutup antrian secara manual
- **Role-Based Dashboard**:
  - **Admin** – Monitoring, kontrol status, reset manual
  - **Petugas Antrian** – Ambil antrian manual untuk nasabah
  - **Teller** – Panggil antrian berikutnya
- **Realtime Status** – Countdown reset & status antrian update secara realtime
- **Upload Gambar** – Manajemen gambar produk via Cloudinary
- **UI Modern** – Glassmorphism + gradient (Emerald & Amber)

---

## 🛠 Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React, TypeScript, Tailwind CSS |
| Backend | Firebase (Auth + Firestore) |
| Image Upload | Cloudinary |
| Deployment | Netlify |

---

## 📁 Struktur Folder

```
queue-system/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (public)/           # Public pages (landing, products, about)
│   │   ├── dashboard/          # Role-based dashboard
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── petugas/        # Petugas antrian dashboard
│   │   │   └── teller/         # Teller dashboard
│   │   ├── queue/              # Queue pages (gadai, pembiayaan)
│   │   └── login/              # Authentication
│   ├── components/             # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Services & utilities
│       ├── firebase.ts         # Firebase configuration
│       ├── queue-service.ts    # Queue business logic
│       ├── wib-schedule-service.ts # WIB timezone scheduling
│       └── types.ts            # TypeScript types
├── public/                     # Static assets
├── .env.local                  # Environment variables (local)
├── netlify.toml                # Netlify deployment config
└── firebase.json               # Firebase config
```

---

## 🚀 Setup & Development

### Prerequisites

- Node.js 18+
- npm atau yarn
- Firebase project (dengan Firestore & Authentication)
- Cloudinary account

### Installation

```bash
# Clone repository
git clone https://github.com/username/pegadaian-sentul.git
cd pegadaian-sentul/queue-system

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan value yang sesuai

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🔐 Environment Variables

Buat file `.env.local` di root project:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 🌐 Deployment (Netlify)

### Automatic Deployment

1. Connect repository ke Netlify
2. Set environment variables di Netlify Dashboard:
   - Site Settings → Environment Variables
   - Tambahkan semua variabel dari `.env.local`
3. Deploy otomatis setiap push ke branch `main`

### Manual Deployment

```bash
# Build production
npm run build

# Deploy ke Netlify
netlify deploy --prod
```

### Netlify Configuration

File `netlify.toml` sudah dikonfigurasi:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 📄 License

MIT License © 2026 Pegadaian Sentul

---
