const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function(req, res) {
    const randomNum = Math.floor(Math.random() * max);
    res.send(randomNum);
});

let port = process.env.PORT;
app.listen(port || 5000, function() {
    console.log("Server running...");
});