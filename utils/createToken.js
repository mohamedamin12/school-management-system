const jwt = require('jsonwebtoken');

exports. createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });