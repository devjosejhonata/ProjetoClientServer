class HttpRequest {

    static get(url, params = {}) {
        return HttpRequest.request('GET', url, params);
    }
    static delete(url, params = {}) {
        return HttpRequest.request('DELETE', url, params);
    }
    static put(url, params = {}) {
        return HttpRequest.request('PUT', url, params);
    }
    static post(url, params = {}) {
        return HttpRequest.request('POST', url, params);
    }
    //metodo statico, rota url, parametros objeto vazio que por padrao nao sao obrigatorios
    //demtrp dos escopos retornando a classe HttpRequest, com o metodo request que criamos abaixo
    //passando como parametro qual o metodo, a url e params
    
    static request(method, url, params = {}) {
    //metodo statico, request, recebendo os metodos method, url, e params com objeto vazio

        return new Promise((resolve, reject) => {

            let ajax = new XMLHttpRequest();

            ajax.open(method.toUpperCase(), url);//falando para o ajax onde ele vai chamar e qual metodo vai usar

            ajax.onerror = event => {//outra situação de problema com ajax
                reject(e);
            };
    
            ajax.onload = event => {//evento de resposta, quando conseguiu carregar
    
               let obj = { };//objeto vazio
    
               try { 
                   obj = JSON.parse(ajax.responseText);//Objeto json respondido, responseText vai ter a informação que o servidor retornou
               } catch(e) {
                   reject(e);//se der erro, chama o reject
                   console.error(e);
               }
               //o try e catch, se no try nao for um json valido, vai me retornar um erro no catch.

               resolve(obj);//tendo sucesso na promessa, resolve
    
            };

            ajax.setRequestHeader('Content-type', 'application/json');
    
            ajax.send(JSON.stringify(params));//chamando a solicitação ajax

        });
        
    }
}