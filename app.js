const fs = require('fs');
const https = require('https');
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


const allowedOrigins = [
  'https://signal-operacionestv',
  'https://172.19.14.135:5000',
  'https://172.19.14.135',
  'https://signal-operacionestv/api/v1',
  'https://172.19.14.135:5000/api/v1',
  'https://signal-operacionestv/api/v1/channel',
  'https://172.19.14.135:5000/api/v1/channel'
];

app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Habilita el envío de cookies si es necesario
}));

app.options('*', cors()); // Maneja pre-flight requests

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

const options = {
  key: fs.readFileSync('/etc/nginx/ssl/server.key'),
  cert: fs.readFileSync('/etc/nginx/ssl/server.crt')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS en https://172.19.14.135:${PORT}`);
});