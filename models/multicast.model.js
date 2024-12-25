const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

const MulticastSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    ipMulticast: {
      type: String,
      required: [true, "La multicast es requerido"],
      unique: [true, "La multicast debe ser única"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Multicast = mongoose.model("Multicast", MulticastSchema);
MulticastSchema.plugin(uniqueValidator, { message: "{PATH} debe ser única" });
module.exports = Multicast;
