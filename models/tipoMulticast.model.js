const mongoose = require("mongoose");

const TipoMulticastSchema = new mongoose.Schema(
  {
    signalType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
    },
    ipMulticast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Multicast",
    },
    idEncoder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Encoder",
    },
  },
  { timestamps: true, versionKey: false }
);
const TipoMulticast = mongoose.model("TipoMulticast", TipoMulticastSchema);
module.exports = TipoMulticast;
