// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZ8jhh5auYEpkKiuINUIlucJHXiWtQCBw",
  authDomain: "happy-207a9.firebaseapp.com",
  projectId: "happy-207a9",
  storageBucket: "happy-207a9.firebasestorage.app",
  messagingSenderId: "894890772281",
  appId: "1:894890772281:web:b13d79397c3ed6f64acae8",
  measurementId: "G-Q9HNJL36DR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // Ignore analytics restriction on local file origins if any
}

export { analytics };
window.firebaseApp = app;
console.log("تم تهيئة فايربيز بنجاح - Firebase connected successfully");
