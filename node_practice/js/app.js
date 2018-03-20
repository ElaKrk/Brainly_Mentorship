document.addEventListener("DOMContentLoaded", function (event) {

    const chat = document.getElementById("chat");


    const form = document.getElementById("form");
    const sendButton = document.getElementById("send");
    const allmessages = document.getElementById("allmessages");
    const nick = document.getElementById("nick");
    const message = document.getElementById("message");

    function format(data) {
        const { nickValue, messageValue } = data;
        console.log("nickValue:", nickValue, messageValue);
        return `${nickValue} - ${messageValue} \n`;
    }


    function fetchMessagesFromRedis() {
        return fetch('/allmessages')
            .then(data => data.json())
    }
    

window.addEventListener('load', async () => {
    const jsonMessages = await fetchMessagesFromRedis()

    const fragment = document.createDocumentFragment();
    jsonMessages.forEach(message => {
        const divEl = document.createElement("div");
        divEl.textContent = format(message)
        fragment.appendChild(divEl);
    })
    
    allmessages.appendChild(fragment);
})


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
                allmessages.innerText += format(data);
            })
    }
})
})

