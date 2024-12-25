const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

const EncoderSchema = new mongoose.Schema(
  {
    nombreEncoder: {
      type: String,
    },
    ipEncoder: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Encoder = mongoose.model("Encoder", EncoderSchema);
EncoderSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
module.exports = Encoder;
