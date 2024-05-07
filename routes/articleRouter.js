const express = require("express");
const router = express.Router();

const {
  getAllArticles,
  createArticle,
  getOneArticle,
  updateArticle,
  deleteArticle,
} = require("../controller/articleController");

router.route("/article").get(getAllArticles).post(createArticle);
router
  .route("/article/:id")
  .get(getOneArticle)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = router;
