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
  /^http:\/\/172\.19\.14\.135(:\d+)?(\/.*)?$/, // Permite cualquier puerto y rutas bajo esta IP
  /^https:\/\/172\.19\.14\.135(:\d+)?(\/.*)?$/, 
  /^http:\/\/(www\.)?tv-operaciones\.cl(\/.*)?$/,
  /^https:\/\/(www\.)?tv-operaciones\.cl(\/.*)?$/,
  /^http:\/\/localhost(:\d+)?(\/.*)?$/ // Para desarrollo local
];


// Configuración de CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedCors.some((pattern) => pattern.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  exposedHeaders: ["Authorization"], // Exponer encabezados específicos si es necesario
  credentials: true, // Habilitar envío de cookies y credenciales
  preflightContinue: false,
  optionsSuccessStatus: 204, // Respuesta exitosa para preflight
};

app.use((err, req, res, next) => {
  if (err instanceof Error && err.message === "Not allowed by CORS") {
    res.status(403).json({ message: "CORS error: Access Denied" });
  } else {
    next(err);
  }
});


app.options("*", cors(corsOptions)); // Opciones para preflight
 // Integrar el middleware de CORS
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
