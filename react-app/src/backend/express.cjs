const express = require('express');
const app = express();

/* TODO - use cors, json middleware */


var users = [];
var orders = [];

/* TODO - introduce endpoints */


const port = 5000;
app.listen(port, () => {
  console.log(`Backend fut: http://localhost:${port}`);
});
