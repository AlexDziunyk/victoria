const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireRoleAdmin = require('../middleware/requireRoleAdmin');
const {getAllPosts, getAllCategories, getAllUsers, getAllComments} = require('../controllers/adminController');

router.get('/posts', requireRoleAdmin, getAllPosts);
router.get('/categories', requireRoleAdmin, getAllCategories);
router.get('/users', requireRoleAdmin, getAllUsers);
router.get('/comments', requireRoleAdmin, getAllComments);
module.exports = router;
