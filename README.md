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

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd queue-system
npm install
```

### 2. Setup Firebase
1. Buat project di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan **Firestore Database** dan **Authentication** (Email/Password)
3. Copy konfigurasi Firebase ke file `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Setup Firestore

**Deploy Security Rules** (Firebase Console → Firestore → Rules):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /queues/{queueId} {
      allow read: if true;
      allow update: if true;
    }
    match /queue_logs/{logId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
    }
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

**Buat Collection `queues`** dengan 2 document:

| Document ID | currentNumber | lastNumber | status | date |
|-------------|---------------|------------|--------|------|
| `gadai` | 0 | 0 | "open" | "2026-01-25" |
| `non_gadai` | 0 | 0 | "open" | "2026-01-25" |

**Buat User Admin:**
1. Firebase Console → Authentication → Add User
2. Catat UID user yang dibuat
3. Firestore → Collection `users` → Add Document dengan ID = UID user:
   - `name`: "Nama Admin"
   - `role`: "admin"
   - `handleQueue`: ["gadai", "non_gadai"]

### 4. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

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
