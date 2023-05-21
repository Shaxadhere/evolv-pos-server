const express = require("express");
const router = express.Router();
const { authenticatedRoute } = require("../middlewares/auth")
const { customerById, create, list, remove, update } = require("../controllers/customer");

router.get("/", authenticatedRoute, list);
router.get("/:id", authenticatedRoute, customerById);
router.post("/", authenticatedRoute, create);
router.put("/:id", authenticatedRoute, update);
router.delete("/:id", authenticatedRoute, remove);

module.exports = router;