// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGlAf4rEagFipfg8CEftV6ry_8cNblUTc",
  authDomain: "marketplace-d8a31.firebaseapp.com",
  projectId: "marketplace-d8a31",
  storageBucket: "marketplace-d8a31.appspot.com",
  messagingSenderId: "627154854256",
  appId: "1:627154854256:web:2b855278236cf287716fb5"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };