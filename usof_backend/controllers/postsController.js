const Post = require('../models/post');
const User = require('../models/user');

const getAllPosts = async(req, res) => {
  const post = new Post();
  const user = new User();
  const {limit} = req.params;
  try {
    const allPosts = await post.getAllPosts(limit);
    const id = req.userId;

    const findUser =  id ? await user.find(id) : false; 

    const filteredPosts = allPosts.filter(post => {
      if(post.status === "active") {
        return post;
      } else if(post.status === "inactive" && findUser &&  findUser.login === post.author) {
        return post;
      }
    })
    res.status(200).json({posts: filteredPosts});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Something bad happened!"});
  }
}

const getPost = async(req, res) => {
  const post = new Post();
  const {id} = req.params;
  
  try {
    const onePost = await post.getPost(id);
    return res.status(200).json({post: onePost});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Something bad happened!"});
  }
}

const createPost = async(req, res) => {
  const post = new Post();
  const user = new User();
  const {login, avatar} = await user.find(req.userId);
  const {title, status, content, categories, date} = req.body;
  try {
    const newPost = await post.createPost({author: login, title, status, content, categories, date});
    res.status(200).json({status: "success"});
  } catch (error) {
    res.status(500).json({status: "error"});
  }
}

const getAuthorAvatar = async(req, res) => {
  const {login} = req.params;
  console.log(login)
  try {
    const user = new User();
    console.log("SD")
    const findUser = await user.findUserByLogin(login);
    console.log("NONONO!", findUser)
    if(findUser) {
      return res.status(200).json({avatar: findUser.avatar});
    } else {
      throw Error();
    }
  } catch (error) {
    return res.status(403).json({error: 'User not found!'});
  }
}

const updateMyPost = async(req, res) => {
  const post = new Post();
  const {id} = req.params;
  console.log("id", id)
  const {title, categories, date, status, content} = req.body;
  console.log({title, categories, date, status})
  try {
    console.log("findPost!");
    const findPost = await post.getPost(id);

    if(findPost.length > 0) {
      await post.updatePost(id, title, status, categories, date, content);
      return res.status(200).json({status: "success"});
    }
  } catch (error) {
    return res.status(403).json({error: 'Post not found!'});
  }

}

const deleteMyPost = async(req, res) => {
  const post = new Post();

  const {id} = req.params;
  
  try {
    const findPost = await post.getPost(id);
    if(findPost.length > 0) {
      await post.deletePost(id);
      return res.status(200).json({success: "true"});
    }
  } catch (error) {
    return res.status(500).json({error: "Something bad happened!"});
  }
}

module.exports = {getAllPosts, getPost, createPost, getAuthorAvatar, updateMyPost, deleteMyPost};
