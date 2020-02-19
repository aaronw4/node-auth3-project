const db = require('../data/db.config');

function find() {
    return db('users')
};

function add(user) {
    return db('users')
        .insert(user, 'id')
}

function findBy(user) {
    return db('users')
        .where(user);
}

module.exports = {
    find,
    add,
    findBy
};