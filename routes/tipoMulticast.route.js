const express = require("express");
const TipoMulticast = require("../controllers/tipoMulticast.controller");
const router = express.Router();

router.get("/tipo-multicast", TipoMulticast.getTipoMulticast);
router.get("/tipo-multicast/:id", TipoMulticast.getTipoMulticastById);
router.post("/tipo-multicast", TipoMulticast.createTipoMulticast);

module.exports = router;
