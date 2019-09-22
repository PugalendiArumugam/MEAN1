const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const mongoose = require('mongoose')
// const db ="mongodb://Pugalendi:Pugal01@ds139614.mlab.com:39614/users";
const db ="mongodb://Pugalendi:Pugal01@ds249798.mlab.com:49798/loginuser";

mongoose.connect(db,err=>{
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongoose')
    }
});

function verifyToken(req,res,next){
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next();
}

router.get('/',(req,res)=>{
    res.send('From API route');
});

router.post('/register',(req,res)=>{
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser)=>{
        if (error) {
            console.log(error)
        } else {
            let payload = {subject:registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    });
});

router.post('/login',(req,res)=>{
    let userData = req.body;    
    User.findOne({email:userData.email},(error,user)=>{
        if (error) {
            console.log(error)
        }else {
            if (!user) {
                res.status(401).send("invalid email")
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send("Invalid Password")
                } else {
                    let payload = {subject:user._id}
                    let token = jwt.sign(payload,'secretKey')        
                    res.status(200).send({token})
                }
            }
        }
    });
});

router.get('/events', (req, res)=>{
    let events = [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"6",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"7",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"8",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"9",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"10",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"11",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"12",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"13",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"14",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"15",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events);
})

router.get('/special',verifyToken,(req,res)=>{
    let events = [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events);
})

module.exports=router;
