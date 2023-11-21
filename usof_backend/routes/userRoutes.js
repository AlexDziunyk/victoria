const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {changeFullName, changeAvatar, getMyPosts, getMyComments, getMyCategories, deleteUser} = require('../controllers/userController');
const askAuthId = require('../middleware/askAuthId');

router.patch('/changeFullName', requireAuth, changeFullName);
router.patch('/changeAvatar', requireAuth, changeAvatar);
router.get('/myPosts', requireAuth, getMyPosts);
router.get('/myComments', requireAuth, getMyComments);
router.get('/myCategories', requireAuth, getMyCategories);
router.delete('/delete/:id', askAuthId, deleteUser);

module.exports = router;
