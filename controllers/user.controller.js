const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) =>
      res.status(400).json({ msg: "Error al obtener los usuarios", error })
    );
};

module.exports.loginUser = (req, res) => {
  const { emailUser, passwordUser } = req.body;
  User.findOne({ emailUser })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "Usuario no encontrado" });
      }
      const isValidPassword = bcrypt.compareSync(
        passwordUser,
        user.passwordUser
      );
      if (!isValidPassword) {
        return res.status(400).json({ msg: "Contraseña incorrecta" });
      }
      res.json({ msg: "Usuario logueado correctamente", user });
    })
    .catch((error) =>
      res.status(500).json({ msg: "Error al iniciar sesión", error })
    );
};

module.exports.createUser = (req, res) => {
  const { emailUser, passwordUser } = req.body;
  User.findOne({ emailUser })
    .then((userEmail) => {
      if (userEmail) {
        return res.status(400).json({ msg: "El email ya existe" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(passwordUser, salt);
      const user = new User({ emailUser, passwordUser: hashedPassword });
      user
        .save()
        .then((user) => res.json(user))
        .catch((error) =>
          res.status(500).json({ msg: "Error al crear el usuario", error })
        );
    })
    .catch((error) =>
      res.status(500).json({ msg: "Error al crear el usuario", error })
    );
};
