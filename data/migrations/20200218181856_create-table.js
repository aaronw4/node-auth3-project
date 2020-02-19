
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('users', table => {
            table.increments();
            table.string('username', 48).unique().notNullable();
            table.string('password',48).notNullable();
            table.string('department', 24).notNullable();
        })
  )
};

exports.down = function(knex) {
  return (
      knex.schema
        .dropTableIfExists('users')
  )
};
