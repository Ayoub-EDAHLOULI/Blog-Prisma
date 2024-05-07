const express = require("express");
const router = express.Router();

// Import the createComment function from the commentController
const {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("../controller/commentController");

router.route("/comment").post(createComment);
router
  .route("/comment/:id")
  .get(getAllComments)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
