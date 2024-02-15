class User {
//Toda classe começa com letra maiuscula.

    constructor (name, gender, birth, country, email, password, photo, admin){
    //recebendo como parametros do construtor, os dados do usuário no formulário
    //Construtor: É um metodo chamado automaticamente Método Construtor, quando invocamos a classe.

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
        //guardando os dados do construtor dentro do objeto, referenciando aos objetos dentro da classe com o this.
        //o underline na frente da propriedade, subtende que se trata de uma propriedade privada, mas não é uma regra, é uma convenção.

    }

    get id() {
        return this._id;
    }

    get register() {
        return this._register;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get admin() {
        return this._admin;
    }

    set photo(value) {
        this._photo = value;
    }

    loadFromJSON(json) {
    ////carregar do JSON

        for (let name in json) {

            switch(name) {
                case '_register':
                    this[name] = new Date(json[name])
                break;
                default:
                    if (name.substring(0, 1) === '_') this[name] = json[name];

            }

        }

    }

    static getUsersStorage () {
        //obter armazenamento de usuários

        return Fetch.get('/users');
            //classe HttpRequest
            //chamando a rota que queremos

    }

    toJSON(){

        let json = {};

        Object.keys(this).forEach(key => {
            if(this[key] !== undefined) json[key] = this[key];
        });

        return json;
    }

    save() {

        return new Promise((resolve, reject) => {

            let promise;

            if (this.id) {//se tem o id, vai editar
                promise = Fetch.put(`/users/${this.id}`, this.toJSON());
            } else {//senao tem o id, vai cadastrar
                promise = Fetch.post(`/users`, this.toJSON());
            }
    
            promise.then(data => {

                this.loadFromJSON(data);

                resolve(this);

            }).catch(e => {

                reject(e);

            });

        });

    }

    remove() {

        return Fetch.delete(`/users/${this.id}`);

    }

}