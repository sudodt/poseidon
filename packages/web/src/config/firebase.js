import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyBtKR1ChaU0Zj7WH5JePNV-DPqV_7ESoe4",
    authDomain: "bdstotnhat-com.firebaseapp.com",
    projectId: "bdstotnhat-com",
    storageBucket: "bdstotnhat-com.appspot.com",
    messagingSenderId: "150645050900",
    appId: "1:150645050900:web:93859adfd81ef7d5eae101",
    measurementId: "G-RHNNF3TYN5"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


export default firebase;