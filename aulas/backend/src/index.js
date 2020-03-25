const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Indicando que sera utilizado json nas requisições
app.use(cors());  // módulo de segurança
app.use(express.json());
app.use(routes);
app.listen(3333);