const express = require("express");
const router = express.Router();

// Import the createComment function from the commentController
const {
  createComment,
  getAllComments,
  getOneComment,
  updateComment,
  deleteComment,
} = require("../controller/commentController");
const { route } = require("./userRouter");

router.route("/comment").post(createComment);
router.route("/comments/:id").get(getAllComments);
router
  .route("/comment/:id")
  .get(getOneComment)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
