const express = require("express");
const router = express.Router();
const Encoder = require("../controllers/encoder.controller");

router.get("/encoder", Encoder.getEncoders);
router.post("/encoder", Encoder.createEncoder);

module.exports = router;
