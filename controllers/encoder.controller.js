const Encoder = require("../models/encoder.model");

module.exports.getEncoders = async (req, res) => {
  try {
    const encoders = await Encoder.find().sort({ nombreEncoder: 1 });
    res.json(encoders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los encoders" });
  }
};

module.exports.createEncoder = async (req, res) => {
  try {
    const { nombreEncoder, ipEncoder } = req.body;
    const encoder = new Encoder({ nombreEncoder, ipEncoder });
    await encoder.save();
    res.json(encoder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el encoder" });
  }
};
