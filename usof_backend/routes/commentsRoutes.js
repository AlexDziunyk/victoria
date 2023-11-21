const express = require('express');
const router = express.Router();
const {getComments, createComment, deleteMyComment, updateMyComment, getAuthorAvatar} = require('../controllers/commentsController');


const requireAuth = require('../middleware/requireAuth');
const isAuth = require('../middleware/isAuth');

router.get('/authorAvatar/:login', getAuthorAvatar);
router.get('/getComments/:id', getComments);
router.post('/createComment', requireAuth, createComment);
router.patch('/update/:id', requireAuth, updateMyComment);
router.delete('/delete/:id', requireAuth, deleteMyComment);

module.exports = router;
