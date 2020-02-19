const db = require('../data/db.config');

function find() {
    return db('users')
};

function add(user) {
    return db('users')
        .insert(user, 'id')
}

module.exports = {
    find,
    add
};