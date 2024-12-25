const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ChannelSchema = new mongoose.Schema(
  {
    nombreChannel: {
      type: String,
      required: true,
    },
    numeroTelsur: {
      type: String,
      required: true,
    },
    numeroGtd: {
      type: String,
    },
    urlLogo: {
      type: String,
      default:
        "https://www.telsur.cl/documents/862366/11294544/cono-gtdtv-color.png/412e80a9-279c-c523-cab0-21b09151904b?t=1724261873210",
    },
    contacto: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
        required: true,
      },
    ],
    origin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Origen",
    },
    criticalityLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Critical",
    },
    tipoMulticast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TipoMulticast",
        required: true,
      },
    ],
  },

  { timestamps: true, versionKey: false }
);

ChannelSchema.plugin(mongoosePaginate);
const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;