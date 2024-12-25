const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const RegionSchema = new mongoose.Schema(
  {
    signalType: {
      type: String,
      required: [true, "El nombre es requerido"],
      unique: [true, "El nombre de región debe ser único"],
    },
  },
  { timestamps: true, versionKey: false }
);

RegionSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("Region", RegionSchema);
