const bcrypt = require('bcryptjs');
const tableName = 'users';

exports.seed = async (knex) => {
  const now = new Date();

  await knex(tableName).del();
  await knex(tableName).insert([
    {
      id: 1,
      name: 'Cristiano',
      lastname: 'Junior',
      email: 'cristiano.junior@sistemapoliedro.com.br',
      password: bcrypt.hashSync('password', 10),
      created_at: now,
    },
    {
      id: 2,
      name: 'João',
      lastname: 'Gardizan',
      email: 'joão.gardizan@sistemapoliedro.com.br',
      password: bcrypt.hashSync('password', 10),
      created_at: now,
    },
    {
      id: 3,
      name: 'Lucas',
      lastname: 'Sonnewend',
      email: 'lucas.sonnewend@sistemapoliedro.com.br',
      password: bcrypt.hashSync('password', 10),
      created_at: now,
    },
    {
      id: 4,
      name: 'Flávio',
      lastname: 'Alexandre',
      email: 'flávio.alexandre@sistemapoliedro.com.br',
      password: bcrypt.hashSync('password', 10),
      created_at: now,
    },
    {
      id: 5,
      name: 'Lucas',
      lastname: 'Teixeira',
      email: 'lucas.teixeira@sistemapoliedro.com.br',
      password: bcrypt.hashSync('password', 10),
      created_at: now,
    },
    {
      id: 6,
      name: 'Matheus',
      lastname: 'Felipe',
      email: 'matheus.felipe@sistemapoliedro.com.br',
      password: bcrypt.hashSync('password', 10),
      created_at: now,
    },
    {
      id: 7,
      name: 'Rafael',
      lastname: 'Henrique',
      email: 'rafael.henrique@sistemapoliedro.com.br',
      password: bcrypt.hashSync('password', 10),
      created_at: now,
    },
    {
      id: 8,
      name: 'Jovan',
      lastname: 'Angelo',
      email: 'jovan.angelo@sistemapoliedro.com.br',
      password: bcrypt.hashSync('password', 10),
      created_at: now,
    },
  ]);
};
