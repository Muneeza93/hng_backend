const express = require("express");
const router = express.Router();
const User = require("../controller/user");

router.post("/create", User.create);
router.get("/", User.findAll);
router.get("/:id", User.findOne);
router.patch("/:id", User.update);
router.delete("/:id", User.delete);

module.exports = router;
