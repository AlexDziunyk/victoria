const jwt = require('jsonwebtoken')
const User = require('../models/user')

const askAuthId = async (req, res, next) => {
  //verify authentication
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if(token) {
    try {
      const decoded = jwt.verify(token, "secret");
      req.userId = decoded.id;
    } catch (error) {
      return res.status(403).json({error: 'Not authorized'});
    } 
  } 
  next();
}

module.exports = askAuthId;