const express = require("express");
const Origen = require("../controllers/origen.controller");
const router = express.Router();

router.get("/origen", Origen.getOrigene);
router.post("/origen", Origen.createOrigen);

module.exports = router;
