//npm i express, cors, bcrypt, mysql2

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();

app.use(express.json());
app.use(cors());

/* use cors, json middleware */

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mcking"
})

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
                        
                        if (foods.length < 1) res.sendStatus(300)
                        else {
                            res.status(200).json(foods)
                        }
                    } 
                })
            
        }
    })
});

//TODO - megcsinálni a jelszót bcrypt-tel
app.post("/login", (req, res) => {
    const {username, password} = req.body
    //console.log("Login data: ", username, password)

    conn.connect(connectError => {
        if(connectError) console.log(connectError)
        
        else {
            conn.query(`select * from felhasznalok where username="${username}" and jelszo="${password}"`,
                async (err, result, fields) => {
                    if (err) console.log(err)

                    else if (result) {
                        const users = [...result]
                        console.log(users)

                        if(users.length < 1) res.status(300).json({invalidLogin: true})
                        else {
                            res.status(200).json({invalidLogin: false, username: users[0].username, role: users[0].tipus})
                        }
                    }
                }
            )
        }
    })

})

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

app.post('/order', (req, res) => {
    const newOrder = req.body;
    
    console.log(newOrder);

    if(newOrder.user != ""){
        //bejelentkezett rendeles
        conn.query(`insert into rendelesek (rendelo, aktiv) values ("${newOrder.user}", 1)`,
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Hiba történt a rendelés leadása során' });
                } 
                else {
                    //rendeles leadva

                    //rendeles Id
                    const orderId = result.insertId;

                    //rendeles tartalma beszurasa

                    for (const key in newOrder.order) {


                        conn.query(`insert into rendelt_elemek (rendeles_id, elem_id, darab) values (${orderId}, "${key}", ${newOrder.order[key].quantity})`,
                            (err, result, fields) => {
                                if (err) {
                                    res.status(500).json({ error: 'Hiba történt a rendelés leadása során' });
                                }
                            }
                        );
                        

                    }

                    res.status(200).json({ id: orderId }); //visszaadjuk a rendelés id-t

                }
            }
        );
    }
    else{
        //TODO vendeg rendeles

    }

    
});

const port = 3333;
app.listen(port, () => {
  console.log(`Szerver mükszik itt: ${port}`);
});
