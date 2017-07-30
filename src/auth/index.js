import firebase from 'firebase';

export function isAuthenticated() {
  const user = firebase.auth().currentUser;
  return !!user;
}
