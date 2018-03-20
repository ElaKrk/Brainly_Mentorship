document.addEventListener("DOMContentLoaded", function (event) {

    const chat = document.getElementById("chat");


    const form = document.getElementById("form");
    const sendButton = document.getElementById("send");
    const allmessages = document.getElementById("allmessages");
    const nick = document.getElementById("nick");
    const message = document.getElementById("message");

    const socket = io();

    function createDivFromMessage(message) {
        const divEl = document.createElement("div");
        divEl.textContent = format(message)
        return divEl
    }

    socket.on('message/new', data => {
        allmessages.appendChild(createDivFromMessage(data))
    })  

    function format(data) {
        const { nickValue, messageValue, time } = data;

        const formattedTime = new Date(time);
        const shortTime = `${formattedTime.getHours()}:${formattedTime.getMinutes()}:${formattedTime.getSeconds()} ${formattedTime.getFullYear()}/${(formattedTime.getMonth() + 1)}/${formattedTime.getDate()}`;
        return `${nickValue} - ${messageValue} [${shortTime}]\n`;
    }


    function fetchMessagesFromRedis() {
        return fetch('/allmessages')
            .then(data => data.json())
    }

    window.addEventListener('load', async () => {
        const jsonMessages = await fetchMessagesFromRedis()

        const fragment = document.createDocumentFragment();
        jsonMessages.forEach(message => {
            const divEl = createDivFromMessage(message)
            fragment.appendChild(divEl);
        })

        allmessages.appendChild(fragment);
    })


    form.addEventListener('submit', e => {
        e.preventDefault();
        const nickValue = nick.value;
        const messageValue = message.value;
        const time = Date.now();
        if (messageValue) {
            socket.emit('message', {
                nickValue,
                messageValue,
                time
            })
            message.value = "";
        }
            

            // fetch('/messages', {
            //     method: "POST",
            //     body: JSON.stringify({
            //         nickValue,
            //         messageValue,
            //         time
            //     }),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // })
            //     .then(r => r.json())
            //     .then(data => {
            //         allmessages.innerText += format(data);
            //     });
            //     nick.value = "";
            //     message.value = "";
            // }

        
    })
})

