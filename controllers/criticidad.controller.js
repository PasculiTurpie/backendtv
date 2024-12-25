const Critical = require("../models/criticidad.model");

module.exports.createCritical = async (req, res) => {
  try {
    const critical = new Critical(req.body);
    await critical.save();
    res.status(201).json(critical);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la crítica", error });
  }
};

module.exports.getCritics = async (req, res) => {
  try {
    const critics = await Critical.find().sort({ category: 1 });
    res.json(critics);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las críticas", error });
  }
};
