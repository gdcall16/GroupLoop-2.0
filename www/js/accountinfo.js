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
function account() {
  var username = sessionStorage.username;
  document.getElementById("username").innerHTML = "Username: " + username;
  var name = "";
  var email = "";
  var password = "";
  firebase.database().ref("users/" + username).once('value').then(function(snapshot){
    name = snapshot.val().name;
    email = snapshot.val().email;
    password = snapshot.val().password;
    document.getElementById("name").innerHTML = "Name: " + name;
    document.getElementById("email").innerHTML = "Email: " + email;
    document.getElementById("password").innerHTML = "Password: " + password;
  })
}
