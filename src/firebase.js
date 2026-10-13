export const firebaseConfig = {
  apiKey: "AIzaSyBGkNTJYmljmMwlU-ots2hWQn_qmh9oJlQ",
  authDomain: "emploi-du-temps-m.firebaseapp.com",
  projectId: "emploi-du-temps-m",
  storageBucket: "emploi-du-temps-m.firebasestorage.app",
  messagingSenderId: "452257779625",
  appId: "1:452257779625:web:0172e9710f78e960063eb8"
};

export let fb = null;

export function initFirebase() {
  if (typeof window === 'undefined' || !window.firebase) return false;
  try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    fb = {
      auth: firebase.auth(),
      db: firebase.firestore()
    };
    return true;
  } catch (e) {
    console.warn('Firebase init failed', e);
    return false;
  }
}
