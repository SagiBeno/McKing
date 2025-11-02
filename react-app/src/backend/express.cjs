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

conn.connect(connectError => {
    if (connectError) console.log(connectError)
    else console.log("Adatbázishoz csatlakozva")
});

app.get('/foods', (req, res) => {
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
});

//TODO - megcsinálni a jelszót bcrypt-tel
app.post("/login", (req, res) => {
    const {username, password} = req.body
    //console.log("Login data: ", username, password)

    conn.query(`select * from felhasznalok where username="${username}"`,
        async (err, result, fields) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            }
            else if (result) {
                const users = [...result]
                console.log(password)
                console.log(users[0].password)

                if(users.length < 1 || !(await bcrypt.compare(password, users[0].password))) res.status(300).json({invalidLogin: true})
                else {
                    res.status(200).json({invalidLogin: false, username: users[0].username, role: users[0].tipus})
                }
            }
        }
    )

})

app.post("/register", (req, res) => {
    const {email, username, password} = req.body

    conn.connect(connectError => {
        if (connectError) console.log(connectError)
            
        else {
            conn.query(`select username, email from felhasznalok where username="${username}" or email="${email}"`,
                (err, result, fields) => {
                    if(err) console.log(err)
                    else {
                        const existingEmail = result.find(u => u.email === email)
                        const existingUsername = result.find(u => u.username === username)

                        if(existingEmail) res.status(409).json({error: "Email already registered!"})
                        else if(existingUsername) res.status(409).json({error: "Username already exists!"})
                        else {
                            //const hashedPassword = bcrypt.hashSync(password, 12)

                            conn.query(`insert into felhasznalok (email, username, jelszo) values ("${email}","${username}","${password}")`,
                                (err, result, field) => {
                                    if(err) console.log(err)
                                    
                                    else {
                                        res.status(201).json({invalidLogin: false, username: username})
                                    }
                                }
                            )

                        }
                    }
                }
            );
        }
    })
})

app.get('/order/:id', (req, res) => {
    const id = +req.params.id;

    conn.query(`
    select 
    rendelesek.id,
    felhasznalok.username as rendelo, 
    group_concat(concat(etelek.nev, ' (', rendelt_elemek.darab, ')') separator ', ') as rendelt_tetelek,
    rendelesek.aktiv 
    from rendelesek
    inner join rendelt_elemek on rendelt_elemek.rendeles_id = rendelesek.id 
    inner join etelek on rendelt_elemek.elem_id = etelek.id 
    inner join felhasznalok on rendelesek.rendelo_id = felhasznalok.id
    where rendelesek.id = ?
    group by felhasznalok.username;
    `,[id], //id, rendelo, rendelt_tetelek, aktiv
        (err, result, fields) => {
            if (err) { 
                res.sendStatus(500);
                return;
            }
            else if (result) {
                const order = [...result][0]
                res.status(200).json(order);
                return;
            }
            else{
                res.sendStatus(404);
                return;
            }
        })
});

app.get('/all-orders', (req, res) => {
    conn.query(`
        select 
        rendelesek.id,
        felhasznalok.username as rendelo, 
        group_concat(concat(etelek.nev, ' (', rendelt_elemek.darab, ')') separator ', ') as rendelt_tetelek,
        rendelesek.aktiv 
        from rendelesek
        inner join rendelt_elemek on rendelt_elemek.rendeles_id = rendelesek.id 
        inner join etelek on rendelt_elemek.elem_id = etelek.id 
        inner join felhasznalok on rendelesek.rendelo_id = felhasznalok.id
        group by rendelesek.id;
        `, //id, rendelo, rendelt_tetelek, aktiv
        (err, result, fields) => {
            if (err) {
                res.sendStatus(500);
                return;
            }

            else if (result) {
                const allOrders = [...result]

                res.status(200).json(allOrders);
                return;
            }
        })
});

app.get('/workers', (req, res) => {
    conn.query(`
        SELECT * FROM felhasznalok
        WHERE tipus='admin' OR tipus='worker'
    `, (err, result, fields) => {
        const workers = [...result]
                
        if (workers.length < 1) res.sendStatus(300)
        else {
            res.status(200).json([...workers])
        }
    })
})

app.post('/order', (req, res) => {
    const newOrder = req.body;

    // basic validation
    if (!newOrder || !newOrder.user) {
        res.sendStatus(400);
        return;
    }

    // bejelentkezett rendeles
    conn.query(`select id from felhasznalok where username = ?`, [newOrder.user],
        (err, result, fields) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            if (!result || result.length < 1) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            const userId = result[0].id;

            conn.query(`insert into rendelesek (rendelo_id, aktiv) values (?, 1)`, [userId],
                (err, insertResult, fields) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }

                    const orderId = insertResult.insertId;

                    // insert order items
                    for (const key in newOrder.order) {
                        const elemId = Number(key);
                        const quantity = newOrder.order[key] && newOrder.order[key].quantity ? newOrder.order[key].quantity : 0;

                        conn.query(
                            `insert into rendelt_elemek (rendeles_id, elem_id, darab) values (?, ?, ?)`,
                            [orderId, elemId, quantity],
                            (err, qRes, qFields) => {
                                if (err) {
                                    console.log('Error inserting order item:', err);
                                }
                            }
                        );
                    }

                    res.status(201).json({ id: orderId }); //visszaadjuk a rendelés id-t
                    return;
                }
            );
        }
    );
});

app.post('/new-worker', (req, res) => {
    const { username, email, password, type } = req.body
    
   conn.connect(connectError => {
        if (connectError) console.log(connectError)
            
        else {
            conn.query(`SELECT username, email FROM felhasznalok WHERE username=? or email=?`,
                [username, email],
                (err, result, fields) => {
                    if (err) console.log(err)
                    else {
                        const existingEmail = result.find(u => u.email === email)
                        const existingUsername = result.find(u => u.username === username)

                        if (existingEmail) res.status(409).json({error: "Email already registered!"})
                        else if (existingUsername) res.status(409).json({error: "Username already exists!"})
                        else {
                            //const hashedPassword = bcrypt.hashSync(password, 12)

                            conn.query(`INSERT INTO felhasznalok (email, username, jelszo, tipus) VALUES (?, ?, ?, ?)`,
                                [email, username, password, type],
                                (err, result, field) => {
                                    if(err) console.log(err)
                                    
                                    else {
                                        res.sendStatus(201)
                                    }
                                }
                            )

                        }
                    }
                }
            );
        }
    })
})

app.delete('/delete-worker', (req, res) => {
    const data = req.body
    const id = +data[0].id

    if (!data || !id) {
        res.sendStatus(400);
        return;
    }

    conn.query(`
        DELETE FROM felhasznalok
        WHERE id = ?`,
        [id],
        (err, result, fiels) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
                return
            }
            else if (result) {
                res.sendStatus(204)
                return
            }
            else {
                res.sendStatus(404)
                return
            }
        }
    )
})

const port = 3333;
app.listen(port, () => {
  console.log(`Szerver mükszik itt: ${port}`);
});
