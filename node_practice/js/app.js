document.addEventListener("DOMContentLoaded", function (event) {

    const chat = document.getElementById("chat");


    const form = document.getElementById("form");
    const sendButton = document.getElementById("send");
    const allmessages = document.getElementById("allmessages");
    const nick = document.getElementById("nick");
    const message = document.getElementById("message");
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        const nickValue = nick.value;
        const messageValue = message.value;
        
        if (messageValue) {
            fetch('/messages', {
                method: "POST",
                body: JSON.stringify({
                    nickValue,
                    messageValue
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(r => r.json())
                .then(data => {
                    JSON.stringify(data);
                    console.log(data);
                    const {nickValue, messageValue} = data
                    // const {nick, message} = data
                    allmessages.innerText += `${nickValue} - ${messageValue} \n`;
                })
        }
    })
})

