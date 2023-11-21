const express = require('express');
const router = express.Router();
const {getAllCategories, createCategory, updateMyCategory, deleteMyCategory} = require('../controllers/categoriesController');

const requireAuth = require('../middleware/requireAuth');

router.get('/', getAllCategories);
router.post('/createCategory', requireAuth, createCategory);
router.patch('/update/:id', requireAuth, updateMyCategory);
router.delete('/delete/:id', requireAuth, deleteMyCategory);

module.exports = router;
