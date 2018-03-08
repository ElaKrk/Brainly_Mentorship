const loginText = document.querySelector("#login");
const passwordText = document.querySelector("#password");
const button = document.querySelector("#button");
const form = document.querySelector("form");
const outButton = document.createElement("input")
outButton.type = "button";
outButton.value = "Wyloguj";
let valueOfLogin = "";
let valueOfPassword = "";

function changeCookie (name) {
  let newValue = getCookie(name);
  newValue = parseInt(newValue) + 1;
  setCookie(name, newValue);
}
function pageAfterLogged() {
  let number = getCookie("test");
  form.innerText = `Twój login: test \n Ilość logowań: ${number}`;
  loginText.classList.add("notVisible");
  passwordText.classList.add("notVisible");
  form.appendChild(outButton);
}


function setCookieAfterLogIn() {
  setCookie(`name:${valueOfLogin}`, "loggedIn");
  if (getCookie(valueOfLogin)) {
    changeCookie(valueOfLogin);
  } else {
    setCookie(valueOfLogin, 1);
  }
}
function logIn(event){
  valueOfLogin = loginText.value;
  valueOfPassword = passwordText.value;
  //console.log("here",valueOfLogin === "test" && valueOfPassword === "test123");
  if (valueOfLogin === "test" && valueOfPassword === "test123") {
    setCookieAfterLogIn();
    pageAfterLogged();
  }
};

function logOut(event) {
  removeCookie("name:test");
  setCookie("name:test", "loggedOut")
  form.innerText = "";
  loginText.classList.remove("notVisible");
  passwordText.classList.remove("notVisible");

  loginText.value = "";
  passwordText.value = "";

  form.appendChild(loginText);
  form.appendChild(passwordText);
  form.appendChild(button);
};

function ifEnter(event) {
  if (event.which == 13 || event.keyCode == 13) {
    if (document.querySelector("[type='button']").value === "Zaloguj") {
      logIn();
    } else {
      logOut();
    }
  }
};
function checkIfLogged() {
  if (getCookie(`name:${valueOfLogin}`)) { //OR worse: getCookie('name:test')
    pageAfterLogged();

  } else {
    logOut();
  }
}


button.addEventListener('click', logIn);
outButton.addEventListener('click', logOut);
document.addEventListener("keypress", ifEnter);
window.addEventListener("load", checkIfLogged);
