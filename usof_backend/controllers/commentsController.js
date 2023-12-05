const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

const getComments = async(req, res) => {
  const comment = new Comment();
  const {id} = req.params;
  try {
    const comments = await comment.getComments(id);
    res.status(200).json({comments});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Something bad happened!"});
  }
}

const getReplies = async(req, res) => {
  const comment = new Comment();
  const {id} = req.params;
  try {
    const replies = await comment.getReplies(id);
    res.status(200).json({replies});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Something bad happened!"});
  }
}

const createComment = async(req, res) => {
  const comment = new Comment();
  const user = new User();
  const {date, content, post_id} = req.body;
  try {
    const {login} = await user.find(req.userId);
    const newComment = await comment.createComment({author: login, date, content, post_id});
    return res.status(200).json({newComment});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const createReply = async(req, res) => {
  const comment = new Comment();
  const user = new User();
  const {date, content, reply_id} = req.body;
  try {
    const {login} = await user.find(req.userId);
    const newReply = await comment.createComment({author: login, date, content, reply_id});
    return res.status(200).json({newReply});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Something bad happened!"});
  }
}


const updateMyComment = async(req, res) => {
  const comment = new Comment();
  const user = new User();
  const {id} = req.params;
  const {content, date} = req.body;
  try {
    const findComment = await comment.findComment(id);
    if(findComment.length > 0) {
      await comment.updateComment(id, content, date)
      return res.status(200).json({status: "success"});
    }
  } catch (error) {
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const deleteMyComment = async(req, res) => {
  const comment = new Comment();
  const user = new User();
  const {id} = req.params;
  try {
    const findComment = await comment.findComment(id);
    if(findComment.length > 0) {
      const deleteComment = await comment.deleteComment(id);
      return res.status(200).json({status: "success"});
    }
  } catch (error) {
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const getAuthorAvatar = async(req, res) => {
  const {login} = req.params;
  
  try {
    const user = new User();
    const findUser = await user.findUserByLogin(login);
    if(findUser) {
      return res.status(200).json({avatar: findUser.avatar});
    } else {
      throw Error();
    }
  } catch (error) {
    return res.status(403).json({error: 'User not found!'});
  }
}


module.exports = {getReplies, createReply, getComments, createComment, deleteMyComment, updateMyComment, getAuthorAvatar};
