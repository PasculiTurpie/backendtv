const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

const OrigenSchema = new mongoose.Schema(
  {
    nombreOrigen: {
      type: String,
      required: [true, "El nombre del origen es requerido"],
      unique: [true, "El nombre del origen debe ser único"],
    },
  },
  { timeseries: true, versionKey: false }
);

const Origen = mongoose.model("Origen", OrigenSchema);
OrigenSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
module.exports = Origen;
