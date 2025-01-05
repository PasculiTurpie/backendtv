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

const allowedOrigins = [
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
);

app.use(express.json());
 // habilitar CORS para todas las peticiones

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
