
var config = {
  apiKey: "AIzaSyCToR700A-G_3FrVcqOclAMwgtp3qFN7A8",
  authDomain: "grouploop-ee39c.firebaseapp.com",
  databaseURL: "https://grouploop-ee39c.firebaseio.com",
  projectId: "grouploop-ee39c",
  storageBucket: "grouploop-ee39c.appspot.com",
  messagingSenderId: "130341591298"
};
firebase.initializeApp(config);

var database = firebase.database();


function checkPass(){
  var username = document.getElementById('loadKey').value;
  var password = document.getElementById('loadPass').value;
  database.ref("users/" + username + "/password").once('value').then(function(snapshot){
    var json = snapshot.val();
    if (password !=  json){
      toBeDisplayed = "invalid password"
    }
    else {
      toBeDisplayed = "success!"
      sessionStorage.setItem("username", username);
      window.location.href = "userdash.html";

    }
    document.getElementById('loadValue').innerHTML = toBeDisplayed;
  });
}


function login(){

  var username = document.getElementById('loadKey').value;
  database.ref("users/" + username).once('value').then(function(snapshot){
    var json = snapshot.val();
    if (json != null){
      checkPass();
      // go to new html page
    }
    else {
      document.getElementById('loadValue').innerHTML = "Sorry, couldn't find that user :(";
    }
  });
}
