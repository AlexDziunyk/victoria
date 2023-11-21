const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Category = require('../models/category');

const changeFullName = async(req, res) => {
  const user = new User();
  const {fullName} = req.body;
  const id = req.userId;
  
  try {
    const findUser = await user.find(id);
    if(findUser) {
      const updateUser = await user.updateFullName(id, fullName);
      return res.status(200).json({fullName});
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const changeAvatar = async(req, res) => {
  const user = new User();
  const {avatar} = req.body;
  const id = req.userId;

  try {
    const findUser = await user.find(id);
    if(findUser) {
      const updateUser = await user.updateAvatar(id, avatar);
      const findUpdatedUser = await user.find(id);
      return res.status(200).json({avatar: findUpdatedUser.avatar});
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const getMyPosts = async(req, res) => {
  const user = new User();
  const post = new Post();
  const id = req.userId;

  try {
    const {login} = await user.find(id);
    if(login) {
      const myPosts = await post.getMyPosts(login);
      return res.status(200).json({myPosts});
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const getMyComments = async(req, res) => {
  const user = new User();
  const comment = new Comment();
  const id = req.userId;
  try {
    const {login} = await user.find(id);
    if(login) {
      const myComments = await comment.getMyComments(login);
      return res.status(200).json({myComments});
    }
  } catch (error) {
    return res.status(500).json({error: "No comments!"});
  }
}

const getMyCategories = async(req, res) => {
  const user = new User();
  const category = new Category();
  const id = req.userId;
  try {
    const {login} = await user.find(id);
    if(login) {
      const myCategories = await category.getMyCategories(login);
      return res.status(200).json({myCategories});
    }
  } catch (error) {
    return res.status(500).json({error: "No categories!"});
  }

}

const deleteUser = async(req, res) => {
  const user = new User();
  const {id} = req.params;
  try {
    const {login} = await user.find(id);
    if(login) {
      await user.deleteUser(id);
      return res.status(200).json({status: "success"});
    }
  } catch (error) {
    return res.status(500).json({error: "No such user!"});
  }
}


module.exports = {changeFullName, changeAvatar, getMyPosts, getMyComments, getMyCategories, deleteUser};
