const db = require('../data/db.config');

function find(role) {
    if (role == 'administration') {
        return db('users')
    } else if (role) {
        return db('users')
            .where({department: role})
    }    
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