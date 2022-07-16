const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({
      message: 'No token provided.',
    });
  }

  jwt.verify(accessToken, process.env.API_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to authenticate token.',
      });
    }

    req.userId = decoded.id;
    next();
  });
};
