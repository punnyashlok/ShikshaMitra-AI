import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxl-wuuZhhp_-hc6lqFBdkK34cV0H6RmI",
  authDomain: "shikshamitra-ai-e7112.firebaseapp.com",
  projectId: "shikshamitra-ai-e7112",
  storageBucket: "shikshamitra-ai-e7112.firebasestorage.app",
  messagingSenderId: "719056143130",
  appId: "1:719056143130:web:b94a0b19a7625bbc53a2a3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;