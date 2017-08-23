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
var database = firebase.database();
var currentUser = "";

function start(){
  var username = sessionStorage.username;
  currentUser = username;
}

//function to generate a number
function numGen() {
  var pin = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    for (i=0; i<5; i++){
      pin += possible.charAt(Math.floor(Math.random() * possible.length));
    };

  //if/else code to look through database and see if the pin has been used before
  return pin;
}

//Store the data of the project
function storeData(){
  var className = document.getElementById('classname').value;
  var projName = document.getElementById('name').value;
  var dateDue = document.getElementById('duedate').value;
  //Generate project id
  var projId = numGen();
  //print project id on screen and replace contents of screen
  document.getElementById('create').style = "display:none;";
  var pin = document.createElement('h3');
  pin.textContent = "Your project id is: " + projId;
  var z = document.getElementById("text");
  z.appendChild(pin);
  //Add project data to the database
  sessionStorage.setItem('id', projId);
  firebase.database().ref("groups/" + projId).set({
    //TODO add user to list of users
    name: projName,
    duedate: dateDue,
    classname: className,
  });
  firebase.database().ref("groups/" + projId + "/users/" + currentUser).set({
    task0: true,
  });
}
