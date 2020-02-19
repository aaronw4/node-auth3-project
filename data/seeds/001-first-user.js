
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          username: 'Aaron', 
          password: 'pass',
          department: 'administration'
        }
      ]);
    });
};
