const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const http = require('http');

const config = require('./src/config/index.js');
const routes = require('./src/routes/routes.js');

const { port, allowedDomains } = config;


const app = express();

// habilitar body-parser
app.use(express.urlencoded({extended:true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

//Validamos el dominio
app.use(cors({origin: allowedDomains}));

app.use(helmet());

app.use(compression());

app.use('/api', routes());

const server = http.createServer(app);


server.listen(port, () =>{
    console.log("Server is up and run in port " + port); 
});