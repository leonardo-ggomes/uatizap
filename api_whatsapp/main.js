//Libs necessárias
const express = require('express');
const cors = require("cors");
const authRoute = require('./routes/auth.route.js');

const APP = express();
APP.use(cors());
APP.use(express.json())
APP.use(authRoute);

const PORT = 3001;
const SERVER = "localhost"
const MSG = `Servidor Online em ${SERVER}:${PORT}`
APP.listen(PORT, () => console.log(MSG));