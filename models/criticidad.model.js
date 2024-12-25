const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

const CriticalSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Critical = mongoose.model("Critical", CriticalSchema);
CriticalSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
module.exports = Critical;
