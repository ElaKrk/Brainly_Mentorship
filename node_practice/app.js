const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require("redis");

const app = express();
const redisClient = redis.createClient({host: '192.168.99.100'});
const REDIS_KEY = "messages";


function fetchValueFromRedis(){
    return new Promise((resolve, reject) => {
        redisClient.lrange(REDIS_KEY, 0, -1,
            (err, response) => {
            if (err) {
                return reject(err)
            }
            resolve(response.map(JSON.parse))
        })
    })
}

function storeMessegesInRedis(message){
    redisClient.lpush(REDIS_KEY, JSON.stringify(message));
}


app.use(bodyParser.urlencoded({
    extended : true,
}));
app.use(bodyParser.json());


app.use(express.static(
    path.join(__dirname, ''))
);


app.post('/messages', (req, res) => {
    const body = req.body;
    storeMessegesInRedis(body);
    res.json(body);
});

app.get('/allmessages', async (req, res) => {
    const messages = await fetchValueFromRedis();
    res.json(messages);
})

app.listen(3000, () => {
    console.log('Serwer gotowy!');
});
