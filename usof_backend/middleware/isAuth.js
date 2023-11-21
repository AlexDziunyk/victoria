const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isAuth = async (req, res, next) => {
    //verify authentication
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token) {
      try {
        const decoded = jwt.verify(token, "secret");

        if(!decoded || !decoded.role) {
          throw Error();
        }

        if(decoded.role !== 'user' || decoded.role !== 'admin') {
          throw Error();
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        
        next();
      } catch (error) {
        return res.status(403).json({error: 'Not authorized'});
      } 
    } 
}

module.exports = isAuth