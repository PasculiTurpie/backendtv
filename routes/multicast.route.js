const express = require("express");
const router = express.Router();
const Multicast = require("../controllers/multicast.controller");

router.get("/multicast", Multicast.getMulticasts);
router.post("/multicast", Multicast.createMulticast);

module.exports = router;
