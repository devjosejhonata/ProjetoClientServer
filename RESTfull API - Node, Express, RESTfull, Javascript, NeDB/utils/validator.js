module.exports = {
    user:(app, req, res) => {
        req.assert('_name', 'O nome é  obrigatório.').notEmpty();
        //validação se nao é vazio, metodo notEmpty()
        req.assert('_email', 'O e-mail está inválido.').notEmpty().isEmail();

        let errors = req.validationErrors();
        //verificando erros

        if (errors) {
            app.utils.error.send(errors, req, res);
            //se tiver algum erro aqui dentro, me mostra um erro na tela
            return false;
            //paro a execução da pagina para que nao continue fazendo o insert
        } else {
            return true;
        }
        //se tiver erros me retorna um array, senao me retorna false
    }
};