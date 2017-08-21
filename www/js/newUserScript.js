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


function checkPass(){
  var username = document.getElementById('key2').value;
  var password = document.getElementById('pass2').value;
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

  var username = document.getElementById('key2').value;
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



function storeData(){
  var key = document.getElementById('key2').value;
  var password1 = document.getElementById('pass2').value;
  var email1 = document.getElementById('emm2').value;
  var name1 = document.getElementById('nombre2').value;
  var abilityToJoin = true;

  database.ref("users").once("value").then(function(snapshot){
    var usersInDatabase = snapshot.val();
    for(var user in usersInDatabase){
      if (key == user){
        abilityToJoin = false;
      }
    }
    if (abilityToJoin == true){
      database.ref("users/" + key).set({email : email1, name: name1, password: password1});
      login();
    }
    else {
      toBeDisplayed = "Sorry! This username is already taken";
      document.getElementById('loadValue').innerHTML = toBeDisplayed;
    }
  });
}



/*snapshot.forEach(function(childSnapshot){
  if (childSnapshot.key == key2){
    abilityToJoin = false;
  };
});
});
if (abilityToJoin == true){
  database.ref("users/" + key).set({email : email1, name: name1, password: password1});
  login();
}
else if (abilityToJoin == false) {
  toBeDisplayed = "Sorry! This username is already taken";
  document.getElementById('loadValue').innerHTML = toBeDisplayed;
}; */
