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
database = firebase.database();
var id = sessionStorage.id;
var username = sessionStorage.username;
var val = 0;
calcPercentage();

function checkOff (name) {
  database.ref("groups/" + id + "/users/" + username + "/" + name + "/completion").set(true);
}

function calcPercentage() {
  var num = 0;
  var complete = 0;
  database.ref("groups/" + id + "/users").once('value').then(function(snapshot){
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
      var avg = complete/num;
      var per = avg * 100;
      val = per;
    }
  });
  var head = document.getElementById("proj-overview");
  database.ref("groups/" + id).on("value", function(snapshot){
    //Print project name
    var element = document.createElement('h3');
    element.className = "projname";
    element.innerHTML = "Project Name: " + snapshot.val().name;
    document.getElementById('proj-overview').appendChild(element);
    //Print ID
    element = document.createElement('p');
    element.className = "projinfo";
    element.innerHTML = "ID: " + id;
    document.getElementById('proj-overview').appendChild(element);
    //Print class
    element = document.createElement('p');
    element.className = "projinfo";
    element.innerHTML = "Class: " + snapshot.val().classname;
    document.getElementById('proj-overview').appendChild(element);
    //Print due date
    element = document.createElement('p');
    element.className = "projinfo";
    element.innerHTML = "Due date: " + snapshot.val().duedate;
    document.getElementById('proj-overview').appendChild(element);
    //Print summary
    element = document.createElement('p');
    element.className = "projinfo";
    element.innerHTML = "Summary: " + snapshot.val().summary;
    document.getElementById('proj-overview').appendChild(element);
    //Print progress bar label
    element = document.createElement('div');
    element = document.createElement('h4');
    element.className = "projlabel";
    element.innerHTML = "Group Progress:";
    document.getElementById('proj-overview').appendChild(element);
    //Print progress bar
    element = document.createElement('div');
    element.id = "skill";
    var element2 = document.createElement('div');
    element.className = "bar";
    element2.className = "progress";
    element2.style.width = val + "%";
    element2.id = "progressBar";
    element.appendChild(element2);
    document.getElementById('proj-overview').appendChild(element);
  });
}

function printProjInfo(){

  database.ref("groups/" + id + "/users/").once('value').then(function(snapshot){
    var members = snapshot.val();
    //console.log(members)

    for (var user in members){

      var info = members[user];
      var eachUser = document.createElement("div");
      eachUser.className = "userClass";
      var nameOfUser = document.createElement("h4");
      nameOfUser.className = "username";
      var inbox = document.getElementById("container");
      nameOfUser.innerHTML = user;
      eachUser.appendChild(nameOfUser);
      for (var task in info){
        var eachTask = document.createElement("div");
        var checkmark = document.createElement("BUTTON");
        checkmark.innerHTML = "✔";
        var infoOfTask = info[task];
        var desc = infoOfTask["desc"];
        var comp = infoOfTask["completion"];
        var todo = document.createElement("p");
        todo.className
        if (comp == true){
          todo.innerHTML = "   " + desc + ": COMPLETED";

        }
        if (comp == false){
          todo.innerHTML = "   " + desc + ": INCOMPLETE";


        }
        checkmark.style = "display: inline";
        checkmark.onclick = checkOff(infoOfTask);
        todo.style = "display: inline";
        eachTask.className = "taskClass";
        eachTask.appendChild(checkmark);
        eachTask.appendChild(todo);
        eachUser.appendChild(eachTask);




      }
      inbox.appendChild(eachUser);
      var br = document.createElement('br');
      inbox.appendChild(br);
    }
  });
}


function addTask(){
  console.log("yay!")
  var newTask = document.getElementById('loadTask').value;
  console.log (sessionStorage.username)
  database.ref("groups/gdc123/users/" + sessionStorage.username).once('value').then(function(snapshot){
    var json = snapshot.val();
    if (json != null){
    console.log("not null")
    var numOfTasks = Object.keys(json).length
    var addNewTask = numOfTasks + 1
    var taskName = "task" + addNewTask

    database.ref("groups/gdc123/users/" + sessionStorage.username + "/" + taskName).set({desc: newTask, completion: false});
    }
    else{
      console.log("null")
    }
  });
}
