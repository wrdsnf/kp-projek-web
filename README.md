# 🏛️ Pegadaian CP Sentul Yogyakarta - Sistem Antrian Online

Aplikasi web sistem antrian online untuk Pegadaian Cabang Pembantu Sentul Yogyakarta. Dibangun dengan Next.js, Firebase, dan Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## ✨ Fitur

### Untuk Nasabah (Publik)
- 🎫 **Ambil Nomor Antrian** - Gadai & Non-Gadai
- 📱 **Realtime Update** - Pantau nomor yang sedang dilayani
- 💾 **Auto-Save** - Nomor tersimpan di browser (localStorage)
- 🔄 **Auto-Reset Detection** - Jika antrian di-reset, bisa ambil nomor baru

### Untuk Pegawai (Dashboard)
- 🔐 **Login Aman** - Firebase Authentication
- 👨‍💼 **Role-Based Access** - Admin & Teller
- 📞 **Panggil Antrian** - Teller bisa panggil nomor berikutnya
- ⚙️ **Kontrol Admin** - Buka/tutup antrian, reset manual

## 📁 Struktur Folder

```
src/
├── app/
│   ├── page.tsx              # Homepage (Landing Page)
│   ├── queue/page.tsx        # Halaman Antrian Nasabah
│   ├── login/page.tsx        # Login Pegawai
│   └── dashboard/
│       ├── layout.tsx        # Dashboard Layout (Auth Guard)
│       ├── page.tsx          # Redirect berdasarkan role
│       ├── admin/page.tsx    # Dashboard Admin
│       └── teller/page.tsx   # Dashboard Teller
├── components/
│   └── Navbar.tsx            # Shared Navigation
├── hooks/
│   ├── useAuth.ts            # Authentication State
│   └── useQueue.ts           # Realtime Queue Listener
└── lib/
    ├── firebase.ts           # Firebase Config
    ├── queue-service.ts      # Queue Logic (Transactions)
    ├── types.ts              # TypeScript Interfaces
    └── utils.ts              # Utility Functions
```

## 🎨 Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| **Next.js 16** | Framework React dengan App Router |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling (Mobile-first) |
| **Firebase Auth** | Authentication |
| **Firestore** | Database Realtime |
| **Vercel** | Hosting (Optional) |

## 🔐 Role & Access

| Fitur | Nasabah | Teller | Admin |
|-------|---------|--------|-------|
| Lihat Homepage | ✅ | ✅ | ✅ |
| Ambil Antrian | ✅ | ✅ | ✅ |
| Panggil Antrian | ❌ | ✅ | ✅ |
| Buka/Tutup Antrian | ❌ | ❌ | ✅ |
| Reset Manual | ❌ | ❌ | ✅ |

## 📱 Responsive Design

Aplikasi dioptimalkan untuk:
- 📱 Mobile (375px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 📄 License

MIT License - Free to use for personal and commercial projects.

---

Dibuat dengan ❤️ untuk Pegadaian CP Sentul Yogyakarta
