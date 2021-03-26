const jwt = require("jsonwebtoken");
const config = require("../config");

const auth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) return res.status(401).json({ok: false, message: 'Not Authenticated'});

  const token = authHeader.split(" ")[1];
  let checkToken;
  try {
    checkToken = jwt.verify(token, config.secretWord);
    if (!checkToken) return res.status(401).json({ok: false, message: 'Not Authenticated' })
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message });
  }
  next();
};

module.exports = auth;
