const express = require('express');
const app = express();

// cors part
// make requests from ALLOWED_ORIGIN to make it working
const ALLOWED_ORIGIN = 'http://localhost2:3000';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', true);

  next();
});

app.get('/', (req, res) => {
  res.send('Got a GET request!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});

app.put('/', (req, res) => {
  res.send('Got a PUT request');
});

app.delete('/', (req, res) => {
  res.send('Got a DELETE request');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
