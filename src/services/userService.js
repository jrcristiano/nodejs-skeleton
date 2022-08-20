const userRepository = require('../repositories/userRepository');

module.exports = {
  getAll() {
    return userRepository.getAll();
  },

  findById(id) {
    return userRepository.findById(id);
  },

  findByEmail(email) {
    return userRepository.findByEmail(email);
  },

  findUniqueUser(email, id) {
    return userRepository.findUniqueUser(email, id);
  },

  save(data, id = null) {
    return userRepository.save(data, id);
  },

  destroy(id) {
    return userRepository.destroy(id);
  },
};
