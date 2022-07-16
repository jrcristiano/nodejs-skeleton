const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userService = require('../services/userService');

module.exports = {
  async index(req, res) {
    try {
      return res.status(200).json(await userService.paginate(req));
    } catch ({message}) {
      return res.status(500).json({message});
    }
  },

  async show(req, res) {
    try {
      const {id} = req.params;
      const user = await userService.findById(id);

      if (!user) {
        return res.status(404).json({
          message: `User id ${id} not found.`,
        });
      }

      return res.status(200).json(user);
    } catch ({message}) {
      return res.status(500).json({message});
    }
  },

  async store(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array(),
        });
      }

      const user = await userService.findByEmail(req.body.email);
      if (user) {
        return res.status(400).json({
          message: 'Email already in use.',
        });
      }

      req.body.password = bcrypt.hashSync(req.body.password, 10);
      await userService.save(req.body);

      return res.status(200).json({
        message: 'User saved successfully!',
      });
    } catch ({message}) {
      return res.status(500).json({message});
    }
  },

  async update(req, res) {
    try {
      const {body, params} = req;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array(),
        });
      }

      const user = await userService.findUniqueUser(body.email, params.id);
      if (user) {
        return res.status(409).json({
          message: 'Email already in use.',
        });
      }

      if (body.password) {
        body.password = bcrypt.hashSync(body.password);
      }

      await userService.save(req.body, params.id);
      return res.status(200).json({
        message: 'User updated successfully!',
      });
    } catch ({message}) {
      return res.status(500).json({message});
    }
  },

  async destroy(req, res) {
    try {
      await userService.destroy(req.params.id);
      return res.status(200).json({
        message: `User ${req.params.id} removed successfully!`,
      });
    } catch ({message}) {
      return res.status(500).json({message});
    }
  },
};
