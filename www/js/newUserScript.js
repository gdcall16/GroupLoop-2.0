// Initialize Firebase
var config = {
  apiKey: "AIzaSyCToR700A-G_3FrVcqOclAMwgtp3qFN7A8",
  authDomain: "grouploop-ee39c.firebaseapp.com",
  databaseURL: "https://grouploop-ee39c.firebaseio.com",
  projectId: "grouploop-ee39c",
  storageBucket: "grouploop-ee39c.appspot.com",
  messagingSenderId: "130341591298"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();


function storeData(){
  var key = document.getElementById('key2').value;
  var password1 = document.getElementById('pass2').value;
  var email1 = document.getElementById('emm2').value;
  var name1 = document.getElementById('nombre2').value;

  database.ref("users/" + key).set({email : email1, name: name1, password: password1});

}
