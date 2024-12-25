const express = require("express");
const router = express.Router();
const Region = require("../controllers/region.controller");

router.get("/region", Region.getRegions);
router.post("/region", Region.createRegion);

module.exports = router;
