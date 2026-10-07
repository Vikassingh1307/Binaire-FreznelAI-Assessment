import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// NOTE: You will need to replace these values with your actual Firebase project config later
const firebaseConfig = {
  apiKey: "AIzaSyCmOqP87RymIUQFSeNlaZy-BtTny-tuxs8",
  authDomain: "freznel-assessment.firebaseapp.com",
  projectId: "freznel-assessment",
  storageBucket: "freznel-assessment.firebasestorage.app",
  messagingSenderId: "521766357511",
  appId: "1:521766357511:web:9e2d4bcf0f3c13bd4d38a2",
  measurementId: "G-G6PS0XDT4T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
