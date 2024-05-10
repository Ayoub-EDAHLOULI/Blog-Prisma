const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  deleteAllUsers,
} = require("../controller/userController");

router.route("/user").post(createUser);
router.route("/users").get(getUsers).delete(deleteAllUsers);
router.route("/user/:id").put(updateUser).delete(deleteUser);

module.exports = router;
