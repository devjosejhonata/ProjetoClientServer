let NeDB = require('nedb');
//solicitando meu NeDB, banco de dados javascript
let db = new NeDB({
    filename:'users.db', //nome do arquivo
    autoload:true //assim que rodar o código, se o arquivo nao existir ja cria, ja carrega pra mim, ja fica com ele automatico
});
//criando o banco de dados NeDB

module.exports = app => {
    
    let route = app.route('/users');

    route.get((req, res) => {

        db.find({}).sort({name:1}).exec((err, users)=> {
        //listando os usuários //ordenando o resultado //executando o comando
            if (err) {
            //se der um erro exibe o erro
                app.utils.error.send(err, req, res);
            } else {
            //se cair no else deu tudo certo
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        users //se tover i,a chave que é o mesmo nome da variavel, basta usar uma vez só
                    });
                    //resposta da rota /users
            }
        });

    });
    
    route.post((req, res) => {
    //rota post

        if (!app.utils.validator.user(app, req, res)) return false;
    
        db.insert(req.body, (err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
        //salvando o registro no banco
    
    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {
        db.findOne({_id:req.params.id}).exec((err, user) => {
        //o metodo findOne, localiza apenas um registro
        //especifico o parametro que quero como id
        //executo o parametro
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
    });

    routeId.put((req, res) => {

        if (!app.utils.validator.user(app, req, res)) return false;

        db.update({_id:req.params.id}, req.body, err => {
        //o metodo update, edita um registro
        //especifico o parametro que quero como id
        //executo o parametro
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
                //juntando as duas informações no object.assign
            }
        });
    });

    routeId.delete((req, res) => {
    //metodo delete, excluindo um registro
        db.remove({_id:req.params.id}, {}, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
                //se funcionar, mostro o id que excluimos
            }
        })
    });

};
//função que recebe o app