const express = require("express");
const Region = require("../controllers/region.controller");
const router = express.Router();

router.get("/region", Region.getRegions);
router.get("/region/:id", Region.getRegionById);
router.post("/region", Region.createRegion);
router.patch("/region/:id", Region.updateRegion);
router.delete("/region/:id", Region.deleteRegion);


module.exports = router;
