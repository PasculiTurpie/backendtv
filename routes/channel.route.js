const express = require("express");
const router = express.Router();
const Channel = require("../controllers/channel.controller");

router.get("/channel", Channel.getChannel);
router.get("/channel/all", Channel.getAllChannel);
router.get("/channel/:id", Channel.getIdChannel);
router.post("/channel", Channel.createChannel);
router.patch("/channel/:id", Channel.updateChannel);

module.exports = router;
