const Region = require("../models/region.model");


module.exports.getRegions = async (req, res) => {
  try {
    const regions = await Region.find().sort({name:1});
    res.json(regions);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener las regiones", error });
  }
};

module.exports.createRegion = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newRegion = new Region({ name });
    await newRegion.save();
    res.json(newRegion);
    next();
  } catch (error) {
    res.status(400).json({ msg: "Error al crear la región", error });
  }
}