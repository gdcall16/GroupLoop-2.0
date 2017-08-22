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
var val = 0;
calcPercentage();

function calcPercentage() {
  var num = 0;
  var complete = 0;
  database.ref("groups/" + id + "/members").once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      childSnapshot.val().tasks.forEach(function(babySnapshot){
        num += 1;
        if (babySnapshot.completed == true) {
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
  setTimeout(projOverview, 1000);
}


function projOverview(){
  var head = document.getElementById("proj-overview");
  database.ref("groups/" + id).on("value", function(snapshot){
    //Print project name
    var element = document.createElement('p');
    element.innerHTML = "Project Name: " + snapshot.val().name;
    document.getElementById('proj-overview').appendChild(element);
    //Print due date
    element = document.createElement('p');
    element.innerHTML = "Due date: " + snapshot.val().duedate;
    document.getElementById('proj-overview').appendChild(element);
    //Print ID
    element = document.createElement('p');
    element.innerHTML = "ID: " + id;
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
    //Print summary
    element = document.createElement('p');
    element.innerHTML = "Summary: " + snapshot.val().summary;
    document.getElementById('proj-overview').appendChild(element);
    //Print class
    element = document.createElement('p');
    element.innerHTML = "Class: " + snapshot.val().classname;
    document.getElementById('proj-overview').appendChild(element);
  });
}
