//npm i express, cors, bcrypt, mysql2

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();

app.use(express.json());
app.use(cors());

/* TODO - use cors, json middleware */


var users = [];
var orders = [];

const etelek = [
        { 
            id: 1, 
            name: 'Hamburger', 
            price: 1250, 
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800'
        },
        { 
            id: 2, 
            name: 'CocaCola', 
            price: 300, 
            image: 'https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9?w=800'
        },
        { 
            id: 3, 
            name: 'Sajtburger', 
            price: 1450, 
            image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800'
        },
        { 
            id: 4, 
            name: 'Dupla Sajtburger', 
            price: 1850, 
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800'
        },
        { 
            id: 5, 
            name: 'Hasábburgonya', 
            price: 750, 
            image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800'
        },
        { 
            id: 6, 
            name: 'Csirkefalatok', 
            price: 990, 
            image: 'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=800'
        },
        { 
            id: 7, 
            name: 'Jégkrém', 
            price: 600, 
            image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800'
        },
        { 
            id: 8, 
            name: 'Kávé', 
            price: 450, 
            image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'
        },
        { 
            id: 9, 
            name: 'Limonádé', 
            price: 550, 
            image: 'https://images.unsplash.com/photo-1623084921164-4a8c5c37a912?w=800'
        },
        { 
            id: 10, 
            name: 'Hot Dog', 
            price: 990, 
            image: 'https://images.unsplash.com/photo-1613482084286-41f25b486fa2?w=800'
           }
    ];

/* TODO - introduce endpoints */

app.get('/api/foods', (req, res) => {
    res.json(etelek);
});


const port = 3333;
app.listen(port, () => {
  console.log(`Backend fut: http://localhost:${port}`);
});
