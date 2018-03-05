function setCookie(name, value) { document.cookie = `${name} = ${value}`};
function getCookie(name) {
  const cookie = document.cookie.split('; ');
  let valueOfCookie = null;

  cookie.forEach(cookie => {
      if (cookie.split("=")[0] === name) {
        valueOfCookie = cookie.split("=")[1];
    };
  })
  return valueOfCookie;
};
function removeCookie(name) {document.cookie = `${name} =; Max-Age=0`};
