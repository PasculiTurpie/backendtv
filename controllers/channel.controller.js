const mongoose = require("mongoose");
const Channel = require("../models/channel.model");

const getPopulateOptions = () => [
  { path: "origin", model: "Origen" },
  { path: "criticalityLevel", model: "Critical" },
  {path: "contacto", model:"Contact"},
  {
    path: "tipoMulticast",
    populate: [
      { path: "signalType", model: "Region" },
      { path: "ipMulticast", model: "Multicast" },
      { path: "idEncoder", model: "Encoder" },
    ],
  },
];

/* const options = {
  
  sort: { numeroTelsur: 1 },
  limit: 9,
  ,
}; */


module.exports.getChannel = async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10);
  const page = parseInt(req.query.page, 10);
  try {
    const channel = await Channel.paginate({}, {populate: getPopulateOptions(), limit, page})
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};

module.exports.getAllChannel = async (req, res, next) => {

  try {
    const channel = await Channel.find().populate('contacto origin criticalityLevel tipoMulticast');
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};

module.exports.getIdChannel = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    const channel = await Channel.findById(req.params.id).populate(
      getPopulateOptions()
    );
    if (!channel)
      return res.status(404).json({ message: "Canal no encontrado" });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};

module.exports.createChannel = async (req, res, next) => {
  try {
    const requiredFields = [
      "nombreChannel",
      "numeroTelsur",
      "contacto",
      "tipoMulticast",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: `Faltan campos: ${missingFields.join(", ")}` });
    }
    const newChannel = new Channel(req.body);
    const savedChannel = await newChannel.save();
    res.status(201).json(savedChannel);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};

module.exports.updateChannel = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    const updatedChannel = await Channel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedChannel) {
      return res.status(404).json({ message: "Channel no encontrado" });
    }
    res.status(200).json(updatedChannel);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};
