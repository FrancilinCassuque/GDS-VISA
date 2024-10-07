import { initializeApp } from "firebase/app"
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAk6SJ8DWSaTXXtB5tsmgP8mcxRK0-el1E",
  authDomain: "next-sara.firebaseapp.com",
  projectId: "next-sara",
  storageBucket: "next-sara.appspot.com",
  messagingSenderId: "180404997280",
  appId: "1:180404997280:web:91ad8bc5dfe2e6c4784dc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }