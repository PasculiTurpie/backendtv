const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

const ContactSchema = new mongoose.Schema(
  {
    nombreContact: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    emailContact: {
      type: String,
      lowercase: true,
      unique: true,
      required: false,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "El email debe tener un formato válido",
      },
    },
    telefonoContact: {
      type: String,
      unique: true,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = mongoose.model('Contact', ContactSchema)
ContactSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })
module.exports = Contact;