const express = require("express");
const router = express.Router();

const {
  createCategory,
  createMultipleCategories,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} = require("../controller/categoryController");

router.route("/category").post(createCategory);
router
  .route("/categories")
  .post(createMultipleCategories)
  .get(getAllCategories)
  .delete(deleteAllCategories);

router
  .route("/category/:id")
  .get(getOneCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
