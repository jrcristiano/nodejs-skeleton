const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

require('dotenv').config();

module.exports = {
  async login(req, res) {
    try {
      const {email, password} = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(404).json({
          message: 'User not found.',
        });
      }

      const verifyPassword = bcrypt.compareSync(password, user.password);
      if (!verifyPassword) {
        return res.status(403).json({
          message: 'Incorrect password, please try again.',
        });
      }

      delete user.password;

      const expiresIn = 3600;
      const token = jwt.sign(user, process.env.API_SECRET_TOKEN, {
        expiresIn,
      });

      return res.status(200).json({
        token,
        expiresIn,
      });
    } catch ({message}) {
      return res.status(500).json({message});
    }
  },

  getLoggedUser({loggedUser}, res) {
    try {
      delete loggedUser.iat;
      delete loggedUser.exp;
      return res.status(200).json(loggedUser);
    } catch ({message}) {
      return res.status(500).json({message});
    }
  },
};
