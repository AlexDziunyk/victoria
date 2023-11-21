const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async (req, res, next) => {
  //verify authentication
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if(token) {
    try {
      const decoded = jwt.verify(token, "secret");
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(403).json({error: 'Not authorized'});
    } 
  } 
}

module.exports = requireAuth;