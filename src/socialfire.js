import firebase from "firebase/app";
import "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyC-A62EiTg3ENmLAdg3qIwLlLgp518xz0c",
  authDomain: "social-media-7ece9.firebaseapp.com",
  projectId: "social-media-7ece9",
  storageBucket: "social-media-7ece9.appspot.com",
  messagingSenderId: "854420384988",
  appId: "1:854420384988:web:c780c350a26263d7265819",
  measurementId: "G-LN5CJLP66E",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export default app;