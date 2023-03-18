const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const app = new express();

app.use(bodyParser.json());
app.use(cors());


const db = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'smartbrain'
    }
});


app.get("/", (req, res)=>{
    res.send('WELCOME');
})

app.post("/signin",(req, res)=>{

    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email ).then(data=>{
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid){
            return db.select('*').from('users')
                .where('email', '=', req.body.email)
                .then(user=>{
                    res.json(user[0])
                })
                .catch(err=>res.status(404).json('Unable to signin'))
        }else{
            res.status(404).json('Wrong credentials');
        }
    })
    .catch(err=>{
        res.status(404).json('Wrong credentials')
    })
})

app.post('/register', (req, res)=>{

    const {email, name, password} = req.body;

    // HASH FUNCTION
    const hash = bcrypt.hashSync(password);

    db('users').insert({
        email : email,
        name : name,
        joined : new Date()
    }).then(response=>{
        db('login').insert({
            email: email,
            hash: hash
        }).then(response => {
            console.log(response);
        })

        var uid = response[0];
        db.select('*').from('users').where({ id: uid }).then(data=>{
            res.json(data[0]);
        })
    }).catch(err=>{
        res.status(404).json('Unable to register');
    })

    
})

app.get('/profile/:uid', (req, res)=>{
    const { uid } = req.params;

    db.select('*').from('users').where({id : uid}).then(data=>{
        if(data.length){
            console.log(data[0]);
            res.json(data[0]);
        }else{
            res.json("User not found");
        }
    }).catch(err=>{
        res.status(404).json("Error getting user")
    })
})

// app.post('/image',(req, res)=>{
//     const {id} = req.body;
//     var found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found = true;
//             user.entries++;
//             return res.json(user.entries);
//         }
//     })

//     if (!found) {
//         res.status(404).json('User not found');
//     }
// })




app.listen(3001, ()=>{
    console.log('Running in port 3001')
})



// console.log(db.select('*').from('users').where({id : 3}).then(data=>{
//     console.log(data);
// }));
