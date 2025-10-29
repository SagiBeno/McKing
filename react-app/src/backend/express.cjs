//npm i express, cors, bcrypt, mysql2

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();

/* TODO - use cors, json middleware */


var users = [];
var orders = [];

/* TODO - introduce endpoints */


const port = 5000;
app.listen(port, () => {
  console.log(`Backend fut: http://localhost:${port}`);
});
