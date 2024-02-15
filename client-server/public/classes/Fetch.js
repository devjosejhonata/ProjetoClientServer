class Fetch {

    static get(url, params = {}) {
        return Fetch.request('GET', url, params);
    }
    static delete(url, params = {}) {
        return Fetch.request('DELETE', url, params);
    }
    static put(url, params = {}) {
        return Fetch.request('PUT', url, params);
    }
    static post(url, params = {}) {
        return Fetch.request('POST', url, params);
    }
    //metodo statico, rota url, parametros objeto vazio que por padrao nao sao obrigatorios
    //demtrp dos escopos retornando a classe HttpRequest, com o metodo request que criamos abaixo
    //passando como parametro qual o metodo, a url e params
    
    static request(method, url, params = {}) {
    //metodo statico, request, recebendo os metodos method, url, e params com objeto vazio

        return new Promise((resolve, reject) => {

            let request;

            switch (method.toLowerCase()) {
                case 'get':
                    request = url;
                break;
                default:

                request = new Request(url, {
                method,
                body: JSON.stringify(params),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });


            }

            fetch(request).then(response => {
                response.json().then(json => {
                    resolve(json);
                }).catch(e => {
                    reject(e);
                });
            });
        }).catch(e => {
            reject(e);
        });
        
    }
}
