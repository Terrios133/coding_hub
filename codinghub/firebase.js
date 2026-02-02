// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyAA_h4nvM3XYiV4yncSCM5XWRier9KNluc",
  authDomain: "coding-hub-2ec4a.firebaseapp.com",
  projectId: "coding-hub-2ec4a",
  storageBucket: "coding-hub-2ec4a.firebasestorage.app",
  messagingSenderId: "63272974994",
  appId: "1:63272974994:web:178b25bfe6f392175f044b",
  measurementId: "G-5N8BK2VTM9"
};

// Inicializar Firebase (Versión Compat)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
