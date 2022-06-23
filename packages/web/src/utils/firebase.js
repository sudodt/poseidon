import { initializeApp, getApps, getApp} from "firebase/app";

const config = {
    apiKey: "AIzaSyBtKR1ChaU0Zj7WH5JePNV-DPqV_7ESoe4",
    authDomain: "bdstotnhat-com.firebaseapp.com",
    databaseURL: "https://bdstotnhat-com-default-rtdb.firebaseio.com",
    projectId: "bdstotnhat-com",
    storageBucket: "bdstotnhat-com.appspot.com",
    messagingSenderId: "150645050900",
    appId: "1:150645050900:web:93859adfd81ef7d5eae101",
    measurementId: "G-RHNNF3TYN5"
};

export default !getApps().length ? initializeApp(config) : getApp()