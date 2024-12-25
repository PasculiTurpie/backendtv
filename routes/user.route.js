const express = require("express");
const User = require("../controllers/user.controller");

const router = express.Router();

router.get("/user", User.getUsers);
router.post("/registro", User.createUser);
router.post("/login", User.loginUser);

module.exports = router;
