const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb+srv://vinay22:v7986481913@cluster0-v7roy.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db, err =>{
    if(err){
        console.log("Error: " + err);
    }else{
        console.log('Connected to mongodb');
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorizard access...");
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === null){
        return res.status(401).send("Unauthorizard access...");
    }
    jwt.verify(token, "mySecretKey", (err, payload) =>{
        if(err){
            return res.status(401).send("Unauthorizard access...");
        }
        if(!payload){
            return res.status(401).send("Unauthorizard access...");
        }
        req.userId = payload.subject;
        next();
    });
    
}

router.get('/', (req, res) =>{

})

router.post('/register', (req,res) =>{
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) =>{
        if(err){
            console.log(err);
        }else{
            const payload = {subject: registeredUser._id};
            const token = jwt.sign(payload, "mySecretKey");
            res.status(200).send({token});
        }
    })
})

router.post('/login', (req, res) =>{
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) =>{
        if(err){
            console.log(err);
        }else if(!user){
            res.status(401).send("Invalid Email...");
        }else if(!(user.password === userData.password)){
            res.status(401).send("Password is Incorrect.");
        }else{
            const payload = {subject: user._id};
            const token = jwt.sign(payload, "mySecretKey");
            res.status(200).send({token});
        }
    })
})

router.get('/events', (req,res) =>{
    let events = [
        {
            "_id": "1",
            "name": "Auto expo",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "2",
            "name": "Auto expo",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "3",
            "name": "Auto expo",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "4",
            "name": "Auto expo",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "5",
            "name": "Auto expo",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "6",
            "name": "Auto expo",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        }
    ]
    res.json(events);
})

router.get('/special', verifyToken,(req,res) =>{
    let specialEvents = [
        {
            "_id": "1",
            "name": "Auto expo Special",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "2",
            "name": "Auto expo Special",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "3",
            "name": "Auto expo Special",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "4",
            "name": "Auto expo Special",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "5",
            "name": "Auto expo Special",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        },
        {
            "_id": "6",
            "name": "Auto expo Special",
            "description": "Great car show in Montreal.",
            "date": "January 15, 2019"
        }
    ]
    res.json(specialEvents);
})


module.exports = router;