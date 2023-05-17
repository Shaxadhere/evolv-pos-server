const express = require("express");
const router = express.Router();
const { authenticatedRoute, adminRoute } = require("../middlewares/auth")
const { storeById, create, list, remove, update } = require("../controllers/store");

router.get("/", authenticatedRoute, adminRoute, list);
router.get("/:id", authenticatedRoute, adminRoute, storeById);
router.post("/", authenticatedRoute, adminRoute, create);
router.put("/:id", authenticatedRoute, adminRoute, update);
router.delete("/:id", authenticatedRoute, adminRoute, remove);

module.exports = router;