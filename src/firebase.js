// ─────────────────────────────────────────────────────────────────────────────
// FIREBASE SETUP — Follow these steps:
//
// 1. Go to https://console.firebase.google.com
// 2. Click "Add project" → name it "careerpath" → Continue
// 3. Disable Google Analytics (optional) → Create project
// 4. Click the </> Web icon to register a web app → name it "careerpath-web"
// 5. Copy the firebaseConfig object shown and paste it below
// 6. In the left sidebar → Build → Authentication → Get started
//    → Sign-in method → Enable "Email/Password" → Save
// 7. In the left sidebar → Build → Firestore Database → Create database
//    → Start in "test mode" → Choose a region → Enable
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// ⬇️ PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
