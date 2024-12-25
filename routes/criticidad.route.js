const express = require("express");
const Critical = require("../controllers/criticidad.controller");
const router = express.Router();

router.get("/criticidad", Critical.getCritics);
router.post("/criticidad", Critical.createCritical);

module.exports = router;
