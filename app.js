const express = require("express");
const helmet = require("helmet");
const app = express();
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
const morgan = require("morgan");

/* const corsOptions = {
  origin: 'https://example.com',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
}; */
const cors = require("cors");
const allowedCors = [
  "http://localhost:8000",
  "http://localhost:8001",
  "http://localhost:8000",
  "http://localhost:8000/manager",
  "http://localhost:8000/admin",
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Obtener el origen de la solicitud
  const { method } = req; // Obtener el método HTTP de la solicitud
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    const requestHeaders = req.headers["access-control-request-headers"];
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();
});

app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

const PORT = process.env.PORT || 5001;

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
