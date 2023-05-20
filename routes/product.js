const express = require("express");
const router = express.Router();
const { authenticatedRoute } = require("../middlewares/auth")
const { productById, create, list, remove, update } = require("../controllers/product");

router.get("/", authenticatedRoute, list);
router.get("/:id", authenticatedRoute, productById);
router.post("/", authenticatedRoute,  create);
router.put("/:id", authenticatedRoute, update);
router.delete("/:id", authenticatedRoute, remove);

module.exports = router;