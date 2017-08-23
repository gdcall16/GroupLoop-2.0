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
//create database called database
var database = firebase.database();
var username = sessionStorage.username;
var val = 0;
window.onload = disProj();

function disProj(){
  var ids = [];
  //FInd ids user is a part of
database.ref("users/" + username + "/projects").once('value').then(function(snapshot){
  snapshot.forEach(function(childSnapshot){
    ids.push(childSnapshot.key);
  })
  //Check if ids in list match ids of groups
  database.ref("groups").once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      console.log(childSnapshot.key);
      json = childSnapshot.key;
      //Checks if id is valid
      for (var id in ids) {
        if (ids[id] == json) {
          console.log("Test loop");
          //Calculates completion progress for group
          var num = 0;
          var complete = 0;
          database.ref("groups/" + ids[id] + "/users").once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot) {
              childSnapshot.forEach(function(babySnapshot) {
                num += 1;
                if (babySnapshot.val().completed == true) {
                  complete += 1;
              }
            });
            });
            if (num == 0) {
              val = 0;
            }
            else {
              console.log(complete);
              console.log(num);
              var avg = complete/num;
              var per = avg * 100;
              val = per;
            }
          //Create div for project
          var element = document.createElement('div');
          //Create project data div and add values
          var element2 = document.createElement('div');
          element2.value = childSnapshot.key;
          element2.className = "eachproject";
          element2.style = "cursor: pointer;";
          element2.onclick = function(element2) {
            sessionStorage.setItem('id', element2.value);
            window.location = "project.html";
          };
          var element3 = document.createElement('div');
          element3.className = "titles";
          //Titles div
          var element4 = document.createElement('p');
          //Show project name
          element4.innerHTML = "Project Name: " + childSnapshot.val().name;
          element3.appendChild(element4);
          element4 = document.createElement('p');
          //Add list of members to variable
          var members = "";
          childSnapshot.child('users').forEach(function(babySnapshot){
            members += babySnapshot.key;
            members += ", ";
          })
          element4.innerHTML = "Group Members: " + members;
          element3.appendChild(element4);
          //Add project name
          var element5 = document.createElement('p');
          element5.innerHTML = "Project Name: " + childSnapshot.val().classname;
          element3.appendChild(element5);
          //Add project name
          var element7 = document.createElement('p');
          element7.innerHTML = "Percent Complete: " + val + "%";
          element3.appendChild(element7);
          //Appending titles to project class
          element2.appendChild(element3);
          element.appendChild(element2);
          //Creating due date for the bottom
          var element8 = document.createElement('p');
          element8.innerHTML = "Due Date: " + childSnapshot.val().duedate;
          element2.appendChild(element8);
          element8 = document.createElement('p');
          element8.innerHTML = "ID: " + childSnapshot.key;
          element2.appendChild(element8);
          //Appending to the body
          document.getElementById('projects').appendChild(element2);
          var element9 = document.createElement('br');
          document.getElementById('projects').appendChild(element9);
        });
        }
      }
    });
    });
  });
};
