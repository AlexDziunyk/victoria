const express = require('express');
const router = express.Router();
const {getAllPosts, getPost, createPost, getAuthorAvatar, updateMyPost, deleteMyPost} = require('../controllers/postsController');

const requireAuth = require('../middleware/requireAuth');
const isAuth = require('../middleware/isAuth');
const askAuthId = require('../middleware/askAuthId');

router.get('/', askAuthId, getAllPosts);
router.post('/createPost', requireAuth, createPost);
router.get('/authorAvatar/:login', getAuthorAvatar);
router.get('/getPost/:id', getPost);
router.patch('/updatePost/:id', requireAuth, updateMyPost)
router.delete('/delete/:id', requireAuth, deleteMyPost);

module.exports = router;
