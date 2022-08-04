const tableName = 'users';

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id')
        .unsigned()
        .primary();

    table.string('name')
        .notNull();

    table.string('lastname')
        .notNull();

    table.string('email')
        .notNull()
        .unique();

    table.string('password');

    table.datetime('deleted_at').nullable();

    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists(tableName);
};
