const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {storeMessagesInRedis, fetchValueFromRedis} = require("./data/redis");

const app = express();

// redisClient.del('messages', function(err, response) {
//     if (response == 1) {
//        console.log("Deleted Successfully!")
//     } else{
//      console.log("Cannot delete")
//     }
//  })

app.use(bodyParser.urlencoded({
    extended : true,
}));
app.use(bodyParser.json());


app.use(express.static(
    path.join(__dirname, '../'))
);


app.post('/messages', (req, res) => {
    const body = req.body;
    storeMessagesInRedis(body);
    res.json(body);
});

app.get('/allmessages', async (req, res) => {
    const messages = await fetchValueFromRedis();
    res.json(messages);
})

app.listen(3000, () => {
    console.log('Serwer gotowy!');
});
