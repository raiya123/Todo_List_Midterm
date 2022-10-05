import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCmD9WBvVlWTNwCNk7JoklnAgLkQi9YHpE",
  authDomain: "todo-62de9.firebaseapp.com",
  projectId: "todo-62de9",
  storageBucket: "todo-62de9.appspot.com",
  messagingSenderId: "1084896813823",
  appId: "1:1084896813823:web:de68177dfa3bd8d51de2ca",
  measurementId: "G-10NFZPGWZ1"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};