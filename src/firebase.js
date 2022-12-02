import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOEA8WxGjG9RvRN3GI6jkj8YgX2FHV2gc",
    authDomain: "house-rental-system-d16a0.firebaseapp.com",
    projectId: "house-rental-system-d16a0",
    storageBucket: "house-rental-system-d16a0.appspot.com",
    messagingSenderId: "44395497059",
    appId: "1:44395497059:web:575d518aeca0d8b1af1a56",
    measurementId: "G-KD5WXZZ7T6"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();

const storageBucketUrl = "gs://house-rental-system-d16a0.appspot.com";

const storage = getStorage(firebaseApp, storageBucketUrl);

export { db, auth, storage };