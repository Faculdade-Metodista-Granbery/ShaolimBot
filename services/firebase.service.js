const firebase = require('firebase');
const credentials = require('../firebase.credentials.json');

const app = firebase.initializeApp(credentials);

const getAula = async ({ tema }) => {
  const starCountRef = firebase.database().ref(`temas/${tema}`);

  return starCountRef.get();
}

module.exports = {
  getAula,
}
