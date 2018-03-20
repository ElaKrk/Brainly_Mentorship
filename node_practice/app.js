const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({
    extended : true,
}));
app.use(bodyParser.json());


app.use(express.static(
    path.join(__dirname, ''))
);


app.post('/messages', (req, res) => {
    const body = req.body;
    res.json(body);
});

app.get('/allmessages', (req, res) => {
    res.send("sth");
})

app.listen(3000, () => {
    console.log('Serwer gotowy!');
});
