class Utils {
//Toda classe começa com letra maiuscula.
//Tudo que eu precisar de formatação, validação, coisas rapidas, eu posso usar aqui no meu arquivo Utils

    static dateFormat(date) {
        //metodo criado para formatar as datas
        //estamos chamando o metodo direto pelo nome da classe, estou usando o static para chamar o metodo sem criar uma instancia da classe

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

    }

}