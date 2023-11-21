const Category = require('../models/category');
const User = require('../models/user');

const getAllCategories = async(req, res) => {
  const category = new Category();
  try {
    const allCategories = await category.getAllCategories();
    return res.status(200).json({categories: allCategories});
  } catch (error) {
    return res.status(500).json({error: "Error with categories"});
  }
}

const createCategory = async(req, res) => {
  const user = new User();
  const category = new Category();
  const {title, description} = req.body;
  const id = req.userId;
  try {
    const findUser = await user.find(id);
    console.log(findUser)
    if(findUser) {
      const createCategory = await category.createCategory({title, description, author: findUser.login});
      return res.status(200).json({status: "success"});
    }
  } catch (error) {
    return res.status(500).json({error: "Couldn't create category"});
  }
}

const updateMyCategory = async(req, res) => {
  const category = new Category();
  const {id} = req.params;
  const {title, description} = req.body;
  try {
    const findCategory = await category.getCategory(id);
    if(findCategory.length > 0) {
      await category.updateCategory(id, title, description)
      return res.status(200).json({status: "success"});
    }
  } catch (error) {
    return res.status(500).json({error: "Something bad happened!"});
  }
}

const deleteMyCategory = async(req, res) => {
  const category = new Category();
  const {id} = req.params;
  try {
    const findCategory = await category.getCategory(id);
    if(findCategory.length > 0) {
      await category.deleteCategory(id)
      return res.status(200).json({status: "success"});
    }
  } catch (error) {
    return res.status(500).json({error: "Something bad happened!"});
  }
}


module.exports = {getAllCategories, createCategory, updateMyCategory, deleteMyCategory};
