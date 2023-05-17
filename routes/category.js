const express = require("express");
const router = express.Router();
const { authenticatedRoute } = require("../middlewares/auth")
const { categoryById, create, list, remove, update } = require("../controllers/category");

router.get("/", authenticatedRoute, list);
router.get("/:id", authenticatedRoute, categoryById);
router.post("/", authenticatedRoute, create);
router.put("/:id", authenticatedRoute, update);
router.delete("/:id", authenticatedRoute, remove);

module.exports = router;