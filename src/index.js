import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// const config = {
//    apiKey: "AIzaSyAqsquOVAUkNol9l7QttoTI1s3zXNA32Fw",
//    authDomain: "christianminglebutbetter.firebaseapp.com",
//    databaseURL: "https://christianminglebutbetter.firebaseio.com",
//    projectId: "christianminglebutbetter",
//    storageBucket: "christianminglebutbetter.appspot.com",
//    messagingSenderId: "904563004940"
// };
// firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
});
