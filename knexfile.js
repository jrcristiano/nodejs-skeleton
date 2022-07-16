require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: 3306,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: process.env.MIGRATIONS_TABLE_NAME,
      directory: process.env.MIGRATIONS_DIR,
    },
    seeds: {
      directory: process.env.SEEDS_DIR,
    },
  },
};
