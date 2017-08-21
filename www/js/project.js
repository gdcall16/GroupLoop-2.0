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
window.onload = projOverview();

function projOverview(){
  var head = document.getElementById("proj-overview");
  database.ref("groups/" + id).on("value", function(snapshot){
    var element = document.createElement('p');
    element.innerHTML = "Project Name: " + snapshot.val().name;
    document.getElementById('proj-overview').appendChild(element);
    element = document.createElement('p');
    element.innerHTML = "Due date: " + snapshot.val().duedate;
    document.getElementById('proj-overview').appendChild(element);
    element = document.createElement('p');
    element.innerHTML = "ID: " + id;
    document.getElementById('proj-overview').appendChild(element);
    //TODO add progress bar
    element = document.createElement('p');
    element.innerHTML = "Summary: " + snapshot.val().summary;
    document.getElementById('proj-overview').appendChild(element);
    element = document.createElement('p');
    element.innerHTML = "Class: " + snapshot.val().classname;
    document.getElementById('proj-overview').appendChild(element);
  });
}

function projBody () {

}
