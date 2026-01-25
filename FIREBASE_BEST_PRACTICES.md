# Firebase Setup & Best Practices for Free Tier

## 1. Firebase Configuration

Create a file named `.env.local` in the `queue-system` directory and add your Firebase credentials:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123...
NEXT_PUBLIC_FIREBASE_APP_ID=1:123...
```

To get these:
1. Go to [Firebase Console](https://console.firebase.google.com).
2. Create a new project.
3. Add a Web App (`</>`).
4. Copy the config values.

## 2. Firestore Setup

1. Enable **Firestore Database** in test mode or production mode.
2. Go to **Rules** tab and paste the content of `firestore.rules` included in this project.
3. **IMPORTANT**: Create the initial data manually or via a script.
   
   **Required Collection Structure:**
   
   Collection: `queues`
   - Document ID: `gadai`
     - Fields:
       - `currentNumber`: 0 (number)
       - `lastNumber`: 0 (number)
       - `status`: "open" (string)
       - `date`: "2024-01-01" (string - use today's date)
   - Document ID: `non_gadai`
     - Fields: (same as above)

   Collection: `users`
   - Document ID: `[USER_UID]` (Get this from Authentication tab after creating a user)
     - Fields:
       - `name`: "Admin Name"
       - `role`: "admin" (or "teller")
       - `handleQueue`: ["gadai", "non_gadai"] (array)

## 3. Free Tier Optimization (Spark Plan) limits

- **Reads**: 50,000 / day
- **Writes**: 20,000 / day
- **Deletes**: 20,000 / day

**Optimization Strategies Implemented:**
- **Realtime Listener**: Uses `onSnapshot` which charges 1 read for the initial fetch and then only 1 read per update. This is efficient for a queue system where many users watch the same document.
- **Transactions**: Used for `takeQueue` to ensure consistency without excessive reads (Read + Write checked atomically).
- **LocalStorage**: We cache the user's number in `localStorage` to avoid fetching "My Number" from Firestore repeatedly if not needed (though we don't fully implement a "fetch my log" logic to save reads, we just rely on the user remembering or the local state).
- **Date Check**: The transaction checks the date and resets automatically, avoiding a separate scheduled function (which would cost money or require Blaze plan).

## 4. Deployment to Vercel

1. Push this code to GitHub.
2. Import project in Vercel.
3. Add the Environment Variables from Step 1 into Vercel Project Settings.
4. Deploy!
