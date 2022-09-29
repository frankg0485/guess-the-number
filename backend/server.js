const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function(req, res) {
  const lower = parseInt(req.query.lower);
  const upper = parseInt(req.query.upper);
  /*console.log(req.query.lower);
  console.log(req.query.upper);*/
  const randomNum = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  console.log(randomNum)
  res.send({ num: '' + randomNum });
});

let port = process.env.PORT;
app.listen(port || 5000, function() {
    console.log("Server running...");
});