const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireRoleAdmin= async (req, res, next) => {
  //verify authentication
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if(token) {
    try {
      const decoded = jwt.verify(token, "secret");
      req.userId = decoded.id;
      console.log(decoded.role)
      if(decoded.role === 'admin') {
        next();
        return;
      }
      return res.status(403).json({error: 'Not authorized'});
    } catch (error) {
      return res.status(403).json({error: 'Not authorized'});
    } 
  } 
}

module.exports = requireRoleAdmin;