const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    emailUser: {
      type: String,
      required: [true, "El email es requerido"],
      unique: [true, "El mail debe ser único"],
    },
    passwordUser: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          );
        },
        message:
          "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.",
      },
    },
  },
  { timestamps: true, versionKey: false}
);

const User = mongoose.model("User", UserSchema);
UserSchema.plugin(uniqueValidator, { message: `El email ya existe!!!` });
module.exports = User;
