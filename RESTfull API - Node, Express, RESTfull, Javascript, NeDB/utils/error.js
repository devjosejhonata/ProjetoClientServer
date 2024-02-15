module.exports = {
    send: (err, req, res, code = 400) => {
        console.log(`error: ${err}`);
        res.status(code).json({
        error:err
        });
    }
};
//funçao que toda vez que precisar, exporto como módulo
//sempre que eu precisar exibir um erro eu vou colocar nesse bloco que estou usando