const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getProfile = async(req, res) => {
  const user = new User();
  const {login, email, password} = req.body;
  if(login.length < 4) {
    res.status(500).json({error: "Login is too short"});
    return;
  }

  if(email.length < 0) {
    res.status(500).json({error: "Email is too short"});
    return;
  }

  if(password.length < 6) {
    res.status(500).json({error: "Password is too short"});
    return;
  }

  try {
    const isExist = await user.checkLogin({login, email});
    if(isExist.length) {
      res.status(500).json({error: "User already exists"});
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const isRegistered = await user.register({login, email, password: hash, role: 'user'});

      if(isRegistered) {
        const token = createToken(isRegistered[0].id, isRegistered[0].role);
        res.status(200).json({login, token});
      } else {
        res.status(500).json({error: "User already exists"});
      }
    }
  } catch (error) {
    console.log(error);
  }
}





module.exports = {getProfile};
