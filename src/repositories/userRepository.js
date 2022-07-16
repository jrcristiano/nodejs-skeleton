const model = require('../database');
const paginate = require('../utils/paginate');

const table = 'users';

const columns = [
  'id',
  'name',
  'lastname',
  'email',
  'created_at',
  'updated_at',
  'deleted_at',
];

module.exports = {
  getAll() {
    return model.table(table)
        .select(columns);
  },

  paginate(req) {
    const knex = model.table(table)
        .select(columns)
        .orderBy('id', 'desc');

    return paginate(knex, req);
  },

  findById(id) {
    return model.table(table)
        .select(columns)
        .where({id})
        .first();
  },

  findByEmail(email) {
    return model.table(table)
        .select('*')
        .where({email})
        .first();
  },

  findUniqueUser(email, id) {
    return model.table(table)
        .select('*')
        .where('email', email)
        .where('id', '<>', id)
        .first();
  },

  save(data, id = null) {
    if (!id) {
      return model.table(table)
          .insert(data);
    }

    return model.table(table)
        .where({id})
        .update(data);
  },

  destroy(id) {
    return model.table(table)
        .where({id})
        .del();
  },
};
