const express = require("express");
const router = express.Router();

const {
  getCategoriesOnArticle,
  createCategoryOnArticle,
  deleteCategoryOnArticle,
} = require("../controller/categoriesOnArticlesController");

router.route("/article/:articleId/categories").get(getCategoriesOnArticle);
router
  .route("/article/:articleId/category/:categoryId")
  .post(createCategoryOnArticle)
  .delete(deleteCategoryOnArticle);

module.exports = router;
