const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const auth = require('../auth/auth-mw')

const users = require('./usersModel');

const router = express.Router();

router.get('/', auth, (req, res) => {
    const role = req.payload.department

    users.find(role)
        .then(users => {
            res.status(200).json(users);
            console.log(role);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to get users.'
            });
        })
});

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    users.add(user)
        .then(info => {
            res.status(201).json(info);
        })
        .catch(err => {
            res.status(500).json({
                error: "Failed to create user."                
            });
            console.log(err.message);
        })
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);
                res.status(200).json({
                    username: user.username,
                    token: token
                })
            } else {
                res.status(401).json({
                    error: 'Invalid Credentials'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

function genToken(user) {
    const payload = {
        userid: user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '3h'
    };

    const token = jwt.sign(payload, secrets.jwtSecret, options);

    return token;
}

module.exports = router;