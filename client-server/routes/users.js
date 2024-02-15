let express = require('express');
let assert = require('assert');
let restify = require('restify-clients');
let router = express.Router();

// Creates a JSON client
let client = restify.createJsonClient({
  url: 'http://localhost:4000/'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
//Rota / no servidor
  client.get('/users', function(err, request, response, obj) {
    assert.ifError(err);
  
    res.json(obj);
  });

});
router.get('/:id', function(req, res, next) {//chamando a rota /users no meu restfull api, chamando pelo id do usuário

  client.get(`/users/${req.params.id}`, function(err, request, response, obj) {
    assert.ifError(err);
  
    res.json(obj);
  });

});
router.put('/:id', function(req, res, next) {//chamando a rota /users no meu restfull api, chamando pelo id do usuário

  client.put(`/users/${req.params.id}`, req.body, function(err, request, response, obj) {//com o req.body eu informo qual o campo id to editando
    assert.ifError(err);
  
    res.json(obj);
  });

});
router.delete('/:id', function(req, res, next) {//chamando a rota /users no meu restfull api, chamando pelo id do usuário

  client.del(`/users/${req.params.id}`, function(err, request, response, obj) {//o restify usa o delete só com 3 digitos, del
    assert.ifError(err);
  
    res.json(obj);
  });

});
router.post('/', function(req, res, next) {//post para primeiro cadastro, recebo ele na rota principal, nao tem id pois o id vai ser gerado

  client.post(`/users`, req.body, function(err, request, response, obj) {//req.body para passar os dados
    assert.ifError(err);
  
    res.json(obj);
  });

});

module.exports = router;
