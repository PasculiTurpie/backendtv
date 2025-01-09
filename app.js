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

/* const allowedCors = [
  "http://192.168.5.248",
  "http://192.168.5.248:5000/",
  "http://localhost:5000/",
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
]; */

// Configuración de CORS
/* const corsOptions = {
  origin: 'http://172.19.14.135', // IP del frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}; */

app.use(helmet());
app.use(morgan("dev"));

/* const allowedOrigins = [
  "http://192.168.5.248",
  "http://192.168.5.248:8000",
  "http://192.168.5.248:5000",
  "http://tv-operaciones.cl",
  "http://www.tv-operaciones.cl",
  "http://api.tv-operaciones.cl",
  "http://localhost:8000",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Permite el acceso
      } else {
        callback(new Error("CORS no permitido")); // Rechaza el acceso
      }
    },
    credentials: true, // Permitir envío de cookies o autenticación
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
  })
); */

/* const allowedCors = [
  "http://localhost:8000",
  "http://localhost:8001",
  "http://tv-operaciones.cl",
  "http://www.tv-operaciones.cl",
  "http://api.tv-operaciones.cl",
  "http://192.168.5.248",
  "http://192.168.5.248:8000",
  "http://192.168.5.248:8001",
  "http://192.168.5.248:5000",
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
}); */

const allowedCors = [
  "http://localhost:8000",
  "http://localhost:8001",
  "http://tv-operaciones.cl",
  "http://www.tv-operaciones.cl",
  "http://api.tv-operaciones.cl",
  "http://192.168.57.128",
  "http://192.168.57.128:8000",
  "http://192.168.57.128:8001",
  "http://192.168.57.128:5000",
];


const corsOptions = {
  origin: allowedCors, // Solo permite solicitudes desde este dominio
  methods: "GET,POST, PUT, PATCH, DELETE", // Solo permite GET y POST
  allowedHeaders: "Content-Type,Authorization", // Permite estos encabezados
  preflightContinue: false, // No enviar respuestas de preflight a la siguiente ruta
  optionsSuccessStatus: 200, // Cambiar el código de estado para las respuestas de preflight
};

app.use(cors(corsOptions));
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
