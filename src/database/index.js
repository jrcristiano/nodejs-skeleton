require('dotenv').config();
const knexfile = require('../../knexfile');
module.exports = require('knex')(knexfile.development);
