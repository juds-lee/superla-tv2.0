// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzC8ngCAMjoMpb_Xm3ThOpQe2QVbbRMIo",
  authDomain: "superlative2.firebaseapp.com",
  projectId: "superlative2",
  storageBucket: "superlative2.appspot.com",
  messagingSenderId: "514905882138",
  appId: "1:514905882138:web:a63ae154091077c31cdba3"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
// const dbRef = ref(database);

export default database;
