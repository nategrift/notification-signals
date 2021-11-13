let jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  let authToken = req.headers['x-access-token'] || req.headers['authorization'];

  // Check if token
  if (!authToken) {
    return res.json({
      ok: false,
      message: 'Auth token is not supplied'
    });
  }

  // Remove Bearer Part of token
  if (authToken.startsWith('Bearer ') && authToken.length > 20) {
    authToken = authToken.slice(7, authToken.length);
  } else {
    return res.json({
      ok: false,
      message: 'Token is not valid'
    });
  }

  if (authToken) {
    jwt.verify(authToken, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          ok: false,
          message: 'Token is not valid'
        });
      } else {
        req.username = decoded.username;
        req.uuid = decoded.uuid;
        next();
      }
    });
  }
};

module.exports = {
  checkToken: checkToken
}
