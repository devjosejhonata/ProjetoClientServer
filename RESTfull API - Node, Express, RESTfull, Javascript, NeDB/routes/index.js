module.exports = app => {
        
app.get('/', (req, res) => {
        //utilizando o meto get, para acessar as rotas, teremos um parametro antes da requisição e resposta, que sera a rota
               
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Olá Jhon Jhon</h1>');
        //resposta da rota /
});
};
//exportando o routes para o arquivo index principal do projeto
//tudo que eu criar dentro desse routes, ele vai ser exportado para quem tiver chamando ou requerindo esse arquivo index.js como módulo.