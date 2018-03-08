  const div = document.getElementById("cookie");
  const button = document.querySelector("button");

function changeCookie (name) {
  let newValue = getCookie(name);
  newValue = parseInt(newValue) + 1;
  setCookie(name, newValue);
}

function showNumberOfVisits() {
  changeCookie("counter");
      let value = getCookie("counter");
      div.innerText = `Odwiedzasz nas juz ${value} raz ;)`;
}    
showNumberOfVisits();

button.addEventListener('click', function(event) {
  const valueOfCounter = 1;
  setCookie("counter", valueOfCounter);
  div.innerText = `Odwiedzasz nas juz ${valueOfCounter} raz ;)`;
});
