const express = require("express");
const router = express.Router();
const { authenticatedRoute, adminRoute } = require("../middlewares/auth")
const { userById, create, list, remove, update } = require("../controllers/user");

router.get("/", authenticatedRoute, adminRoute, list);
router.get("/:id", authenticatedRoute, adminRoute, userById);
router.post("/", create);
router.put("/:id", authenticatedRoute, adminRoute, update);
router.delete("/:id", authenticatedRoute, adminRoute, remove);

module.exports = router;