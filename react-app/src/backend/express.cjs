//npm i express, cors, bcrypt, mysql2

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();

app.use(express.json());
app.use(cors());

/* TODO - use cors, json middleware */

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mcking"
})


var users = [
    { id: 1, username: 'JohnDoe', password: '12345678', email: 'JohnDoe@example.com', role: 'admin'},
    { id: 2, username: 'JaneDoe', password: '12345678', email: 'JaneDoe@example.com', role: 'user'}
];

var orders = [];


/* TODO - introduce endpoints */

app.get('/foods', (req, res) => {
    conn.connect(connectError => {
        if (connectError) console.log(connectError)
        
        else {
            
            conn.query(`select * from etelek order by id asc`,
                (err, result, fields) => {
                    if(err) console.log(err)
                    else if (result) {
                        const foods = [...result]
                        console.log(foods)
                        if (foods.length < 1) res.sendStatus(300)
                        else {
                            res.status(200).json(foods)
                        }
                    } 
                })
            
        }
    })
});

app.get('/api/order/:id', (req, res) => {
    const id = +req.params.id;
    const order = orders[id];
    
    if (order) {
        res.json(order);
    } 
    else {
        res.status(404).json({ error: 'Rendelés nem található' });
    }
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    orders.push(newOrder);
    res.status(201).json({ id: orders.length - 1 });
});

const port = 3333;
app.listen(port, () => {
  console.log(`Szerver mükszik itt: ${port}`);
});
