const TipoMulticast = require("../models/tipoMulticast.model");

module.exports.getTipoMulticast = async (req, res, next) => {
  try {
    const tipoMulticasts = await TipoMulticast.find().populate(
      "signalType ipMulticast idEncoder"
    );
    res.json(tipoMulticasts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving tipoMulticasts",
    });
  }
};

module.exports.getTipoMulticastById = async (req, res, next) => {
  try {
    const tipoMulticast = await TipoMulticast.findById(req.params.id)
     .populate("signalType ipMulticast idEncoder")
     .exec();
    if (!tipoMulticast) {
      return res.status(404).json({
        success: false,
        message: "TipoMulticast not found",
      });
    }
    res.json(tipoMulticast);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving tipoMulticast",
    });
  }
};

module.exports.createTipoMulticast = async (req, res, next) => {
  try {
    const newTipoMulticast = new TipoMulticast(req.body);
    const savedTipoMulticast = await newTipoMulticast.save();
    res.json(savedTipoMulticast);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating tipoMulticast",
    });
  }
};
