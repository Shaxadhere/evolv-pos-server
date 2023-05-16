const express = require("express");
const router = express.Router();
const { authenticatedRoute } = require("../middlewares/auth")
const { signin, changePassword, } = require("../controllers/auth");

router.post("/signin", signin);
router.post("/change-password", authenticatedRoute, changePassword)

module.exports = router;