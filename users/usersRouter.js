const express = require('express');
const bcrypt = require('bcryptjs');

const users = require('./usersModel');

const router = express.Router();

router.get('/', (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json(users);
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
})

module.exports = router;