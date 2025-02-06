const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const User = require("./routes/user.route");
const Region = require("./routes/region.route");
const Channel = require("./routes/channel.route");
const Encoder = require("./routes/encoder.route");
const Origen = require("./routes/origen.route");
const Critical = require("./routes/criticidad.route");
const Multicast = require("./routes/multicast.route");
const TipoMulticast = require("./routes/tipoMulticast.route");
const Contact = require("./routes/contact.route");
const { mongoose } = require("./config/config.mongoose");

const app = express();

app.use(helmet());
app.use(morgan("dev"));


app.use(cors({
    origin: 'https://signal-operacionestv, http://signal-operacionestv',  // Reemplázalo por el dominio del frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

/* app.use(cors()); */
app.use(express.json());


const PORT = process.env.PORT || 5001;

// Rutas de la API
app.use(
  "/api/v1",
  User,
  Region,
  Channel,
  Encoder,
  Origen,
  Critical,
  Multicast,
  TipoMulticast,
  Contact
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
