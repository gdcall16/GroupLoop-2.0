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
var addProj = 0;
var currentUser = "";
var id = "";

function start(){
  var username = sessionStorage.username;
  currentUser = username;
}
function joinProj() {
  var able = true;
  database.ref("groups/" + id + "/members").once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.key == currentUser){
        able = false;
      }
    });
  if (able == true){
    firebase.database().ref("groups/" + id + "/members/" + currentUser).set({
      tasks : false,
    });
    sessionStorage.setItem("id", id);
    window.location = "project.html";
  }
  else {
    document.getElementById('confirm').style = "display:none;";
    var pin = document.createElement('p');
    pin.textContent = "You are already a member of this group";
    document.getElementById('text').appendChild(pin);
  };
  });
}
//find the project and add user using id
function findProj() {
  addProj += 1;
  var found = false;
  id = document.getElementById('pin').value.toUpperCase();
  database.ref("groups").once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.key == id){
        found = true;
      };
    });
    if (found == true) {
      database.ref("groups/" + id + "/name").once('value').then(function(snapshot){
        var name = snapshot.val();
        document.getElementById('join').style = "display:none;";
        var pin = document.createElement('div');
        pin.id = "confirm";
        pin.textContent = "The name of this project is: "+ name + ", do you want to join this project?";
        var btn = document.createElement('button');
        btn.innerHTML = "Join Group";
        btn.onclick = joinProj;
        pin.appendChild(btn);
        document.getElementById('text').appendChild(pin);
      });
      } else {
      if (addProj == 1) {
        var pin = document.createElement('h3');
        pin.setAttribute("id", "error");
        pin.textContent = "Project not found";
        var a = document.getElementById('join');
        a.appendChild(pin);
      };
    };
  });
}
