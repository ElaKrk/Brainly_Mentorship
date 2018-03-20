const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const {storeMessagesInRedis, fetchValueFromRedis} = require("./data/redis");

// redisClient.del('messages', function(err, response) {
//     if (response == 1) {
//        console.log("Deleted Successfully!")
//     } else{
//      console.log("Cannot delete")
//     }
//  })

io.on('connection', function(socket){
    socket.on('message', data => {
        storeMessagesInRedis(data);
        io.emit('message/new', data)
    })
})

app.use(bodyParser.urlencoded({
    extended : true,
}));
app.use(bodyParser.json());


app.use(express.static(
    path.join(__dirname, '../'))
);


app.get('/allmessages', async (req, res) => {
    const messages = await fetchValueFromRedis();
    res.json(messages);
})

server.listen(3000, () => {
    console.log('Serwer gotowy!');
});
