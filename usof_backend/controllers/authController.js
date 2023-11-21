const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {check} = require('express-validator');

const nodemailer = require("nodemailer");


const createToken = (id, login, role) => {
  const payload = {
    id: id,
    login: login,
    role: role
  }
  return jwt.sign(payload, "secret", {expiresIn: '3d'})
}

const register = async(req, res) => {
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

      const isRegistered = await user.register({login, email, password: hash, role: 'user', avatar: "https://firebasestorage.googleapis.com/v0/b/usof-3ed8b.appspot.com/o/Avatars%2FdefaultAvatar.jpg?alt=media&token=d96caa65-20a5-47c5-ac15-87da6557ac27"});

      if(isRegistered) {
        const token = createToken(isRegistered[0].id, isRegistered[0].login, isRegistered[0].role);
        res.status(200).json({login, token});
      } else {
        res.status(500).json({error: "User already exists"});
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const login = async(req, res) => {
  const user = new User();
  const {login, password} = req.body;
  try {
      const userCheck = await user.checkLogin({login});

      if(userCheck.length === 0) {
        return res.status(400).json({error: 'Incorrect login or password!'});
      }

      // console.log("user!", userCheck[0])
      const isPassValid = await bcrypt.compare(password, userCheck[0].password);
      
      if(!isPassValid) {
        return res.status(400).json({error: 'Incorrect login or password!'});
      }
       
      const token = jwt.sign({id: userCheck[0].id, login:userCheck[0].login, role: userCheck[0].role}, "secret", {expiresIn: "3d"});
      
      return res.status(200).json({login, token});

  } catch (error) {
    return res.status(400).json({error});
  }
}

const authMe = async(req, res) => {
  try {
    const user = new User();
    const findUser = await user.find(req.userId);
    console.log("findUser", findUser);
    if(!findUser) {
      return res.status(404).json({error: 'User not found'});
    }

    return res.json({id: findUser.id, login: findUser.login, role: findUser.role, description: findUser.description, avatar: findUser.avatar, fullName: findUser.fullName});

  } catch (error) {
    console.log(error);
    return res.status(404).json({error: error});
  }
}

const passwordReset = async(req, res) => {
  const {email} = req.body;
  console.log(email)
  const user = new User();
  try {
    const findUser = await user.findUserByEmail(email);
    console.log(findUser)
    if(findUser.length > 0) {
      const secret = "secret" + findUser[0].password;
      const payload = {
        id: findUser[0].id, 
        login: findUser[0].login, 
        role: findUser[0].role
      };
      const token = jwt.sign(payload, secret, {expiresIn: '15m'});
      
      const link = `http://127.0.0.1:5173/reset-password/id?id=${findUser[0].id}&token=${token}`;
      console.log(link);

      const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "usofmailer702@gmail.com",
          pass: "siox cnhg btqp rkvp",
        },
      });

      const mailOptions = await transporter.sendMail({
        from: {
          name: "usof",
          address: "usofmailer702@gmail.com"
        }, // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        text: "Follow this link", // plain text body
        html: `<b>${link}</b>`, // html body
      });

      // try {
      //   await transporter.sendMail(mailOptions);
      //   console.log("SENT!");
      // } catch (error) {
      //   return res.status(200).json({status: "error"});
      // }

      return res.status(200).json({status: "success"});
    }

    return res.status(404).json({error: "No such email!"});
  } catch (error) {
    console.log(error)
    return res.status(404).json({error: "Couldn't change password"});
  }
} 

const submitResetPassword = async(req, res) => {
  const {id, token} = req.params;
  const user = new User();
  try {
    const findUser = await user.find(id);
    // console.log(findUser)
    // console.log(id, token)
    if(findUser) {
      const secret = "secret" + findUser.password;
      const payload = jwt.verify(token, secret);

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(findUser.password, salt);
      
      const resetPassword = await user.resetPassword(id, password);
    
      return res.status(200).json({status: "success"});
    }

    return res.status(404).json({error: "Couldn't change password"});
  } catch (error) {
    console.log(error)
    return res.status(404).json({error: "Couldn't change password"});
  }
}


module.exports = {register, login, authMe, passwordReset, submitResetPassword};
