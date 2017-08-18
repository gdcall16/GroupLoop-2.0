//function to generate a number
function numGen(min, max) {
  var pin = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  for (i=0; i<5; i++){
    pin += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  //if/else code to look through database and see if the pin has been used before
  return pin
}
//calling the function so it can be used in HTML
function numReturn(){
  document.getElementById("pinNum").innerHTML = numGen(1, 9);
}
