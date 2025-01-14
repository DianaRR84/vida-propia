import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importar Firestore

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8D8zyIGk9PxtXP6ZNsXw41E1eOtuMyfg",
    authDomain: "vidapropia24.firebaseapp.com",
    projectId: "vidapropia24",
    storageBucket: "vidapropia24.firebasestorage.app",
    messagingSenderId: "1043282324689",
    appId: "1:1043282324689:web:812c9d392e89fb17fca9f0",
    measurementId: "G-5EWSH29V9E"
  };
// Configuración de Firebase
/*const firebaseConfig = {
    apiKey: meta.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: meta.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: meta.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};*/

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Auth
const auth = getAuth(app);
const db = getFirestore(app); // Obtener la instancia de Firestore

export { auth, db };
