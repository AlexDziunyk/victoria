const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Category = require('../models/category');

const getAllPosts = async(req, res) => {
  const post = new Post();
  
  try {
    const allPosts = await post.getAllPosts();
    return res.status(200).json({allPosts});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const getAllComments = async(req, res) => {
  const comment = new Comment();
  
  try {
    const allComments = await comment.getAllComments();
    return res.status(200).json({allComments});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const getAllUsers = async(req, res) => {
  const user = new User();

  try {
    const allUsers = await user.getAllUsers("user");
    return res.status(200).json({allUsers});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const getAllCategories = async(req, res) => {
  const category = new Category();

  try {
    const allCategories = await category.getAllCategories();
    return res.status(200).json({allCategories});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Something bad happened!"});
  }
}


module.exports = {getAllPosts, getAllCategories, getAllUsers, getAllComments};
