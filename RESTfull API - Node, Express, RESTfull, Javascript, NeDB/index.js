/*
Validando dados recebidos via Post

*/

const express = require('express');
//carregando o módulo http
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express();
//invocando o express

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
//o limit, tratamos o tamanho da foto enviada para o servidor
//todos os dados que eu receber via post, converte em json
app.use(expressValidator());
//invocando o expressValidator

consign().include('routes').include('utils').into(app);
//invocando o consign, incluindo a pasta routes, vai incluir todos os arquivos que eu criar em routes
//incluindo em into(app)
//lendo tambem a pasta utils, qualquer arquivo que colocar aqui, carrego tambem como módulo

app.listen(4000, '127.0.0.1', () => {
    console.log('Servidor rodando! TESTANDOO');
});
//ouvindo o servidor na porta 4000