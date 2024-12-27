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

const allowedCors = [
  "http://172.19.14.135",
  "https://172.19.14.135",
  "http://172.19.14.135:5000",
  "https://172.19.14.135:5000",
  "http://172.19.14.135:5000/api/v1/channel",
  "https://172.19.14.135:5000/api/v1/channel",
  "http://172.19.14.135:8000",
  "http://172.19.14.135:8001",
  "http://172.19.14.135:8000/manager",
  "http://172.19.14.135:8000/admin",
  "http://api.tv-operaciones.cl/",
  "https://api.tv-operaciones.cl/",
  "http://tv-operaciones.cl",
  "http://www.tv-operaciones.cl",
  "https://www.tv-operaciones.cl",
  "http://tv-operaciones.cl/manager",
  "http://www.tv-operaciones.cl/manager",
  "http://tv-operaciones.cl/admin",
  "http://www.tv-operaciones.cl/admin",
  "http://localhost:8000",
  "http://localhost:8001",
  "http://localhost:8000/manager",
  "http://localhost:8000/admin",
  "http://localhost:8001/manager",
  "http://localhost:8001/admin",
];

// Configuración de CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Permite solicitudes desde orígenes especificados o sin origen (por ejemplo, herramientas como Postman)
    if (!origin || allowedCors.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // Integrar el middleware de CORS
app.use(helmet());
app.use(morgan("dev"));
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
