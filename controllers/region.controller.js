const Region = require("../models/region.model");


module.exports.getRegions = async (req, res) => {
  try {
    const regions = await Region.find().sort({name:1});
    res.json(regions);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener las regiones", error });
  }
};

module.exports.getRegionById = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findById(id);
    if (!region) return res.status(404).json({ msg: "Región no encontrada" });
    res.json(region);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener la región", error });
  }
}

module.exports.createRegion = async (req, res) => {
  try {
    const { signalType } = req.body;
    const newRegion = new Region({ signalType });
    await newRegion.save();
    res.json(newRegion);
  } catch (error) {
    res.status(400).json({ msg: "Error al crear la región", error });
  }
}

module.exports.updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedRegion = await Region.findByIdAndUpdate(id, { name }, { new: true });
    res.json(updatedRegion);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar la región", error });
  }
}

module.exports.deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    await Region.findByIdAndDelete(id);
    res.json({ msg: "Región eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la región", error });
  }
}