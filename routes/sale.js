const express = require("express");
const router = express.Router();
const { authenticatedRoute } = require("../middlewares/auth")
const { saleById, create, list, remove, update, report } = require("../controllers/sale");

router.get("/", authenticatedRoute, list);
router.get("/report", authenticatedRoute, report);
router.get("/:id", authenticatedRoute, saleById);
router.post("/", authenticatedRoute, create);
router.put("/:id", authenticatedRoute, update);
router.delete("/:id", authenticatedRoute, remove);

module.exports = router;