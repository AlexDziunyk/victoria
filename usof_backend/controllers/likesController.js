const Likes = require('../models/likes');
const User = require('../models/user');

const addLike = async(req, res) => {
  const likes = new Likes();
  const likeObj = req.body;
  try {
    const user = new User();
    const {login} = await user.find(req.userId);

    const isLiked = await likes.getRating({...likeObj, author: login, type: 'like'});
    const isDisliked = await likes.getRating({...likeObj, author: login, type: 'dislike'});
    if(isDisliked && !isLiked) {
      const deleteDislike = await likes.deleteRating({...likeObj, author: login, type: 'dislike'});
      const addLike = await likes.changeRating({...likeObj, author: login});
      res.status(200).json({status: "like"});
    }
    else if(!isLiked) {
      const addLike = await likes.changeRating({...likeObj, author: login});
      res.status(200).json({status: "like"});
    } else {
      const deleteLike = await likes.deleteRating({...likeObj, author: login, type: 'like'});
      res.status(200).json({status: null});
    }
  } catch (error) {
    console.log(error);
  }
}

const addDislike = async(req, res) => {
  const likes = new Likes();
  const likeObj = req.body;
  try {
    const user = new User();
    const {login} = await user.find(req.userId);

    const isLiked = await likes.getRating({...likeObj, author: login, type: 'like'});
    const isDisliked = await likes.getRating({...likeObj, author: login, type: 'dislike'});
    
    if(!isLiked && isDisliked) {
      const deleteDislike = await likes.deleteRating({...likeObj, author: login, type: 'dislike'});
      res.status(200).json({status: null});
    }
    else if(isLiked) {
      const deleteLike = await likes.deleteRating({...likeObj, author: login, type: 'like'});
      const dislike = await likes.changeRating({...likeObj, author: login});
      res.status(200).json({status: "dislike"});
    } else {
      const dislike = await likes.changeRating({...likeObj, author: login});
      res.status(200).json({status: "dislike"});
    }
  } catch (error) {
    console.log(error);
  }
}

const getLikesForPost = async(req, res) => {
  console.log("12")
  const likes = new Likes();
  const {id} = req.params;
  console.log("12")
  try {
    const getAllLikesForPost = await likes.getAllPostLikesById(id);
    const getAllPostDislikesById = await likes.getAllPostDislikesById(id);
    const getLikes = getAllLikesForPost.length - getAllPostDislikesById.length;
    res.status(200).json({likes: getLikes});
  } catch (error) {
    console.log(error);
  }
}

const getLikesForComment = async(req, res) => {
  const likes = new Likes();
  const {comment_id} = req.params;
  try {
    const getAllLikesForPost = await likes.getAllCommentLikesById(comment_id);
    const getAllPostDislikesById = await likes.getAllCommentDislikesById(comment_id);
    const getLikes = getAllLikesForPost.length - getAllPostDislikesById.length;
    res.status(200).json({likes: getLikes});
  } catch (error) {
    console.log(error);
  }
}


module.exports = {addLike, getLikesForPost, addDislike, getLikesForComment};
