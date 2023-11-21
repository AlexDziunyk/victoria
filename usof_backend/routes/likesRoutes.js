const express = require('express');
const router = express.Router();
const {addLike, getLikesForPost, addDislike, getLikesForComment} = require('../controllers/likesController');
const requireAuth = require('../middleware/requireAuth');

router.post('/addLike', requireAuth, addLike);
router.get('/postLikes/:id', requireAuth, getLikesForPost)
router.get('/commentLikes/:comment_id', requireAuth, getLikesForComment)
router.post('/addDislike', requireAuth, addDislike)
module.exports = router;
