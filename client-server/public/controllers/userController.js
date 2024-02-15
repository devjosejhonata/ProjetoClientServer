class UserController {
//Toda classe começa com letra maiuscula.
//A classe UserController vai ligar a parte do model que contem os dados, com a nossa execução.

    constructor (formIdCreate, formIdUpdate, tableId){
    //Construtor: É um metodo chamado automaticamente Método Construtor, quando invocamos a classe.
    //formID, é o ID do formulário.

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);
        //pegando um elemento do documento pelo ID com o getElementByIld, nao precisa colocar o hashtag
        //formID, é o ID do formulário.
        //formEl, quer dizer elemento do formulário.

        this.onSubmit();
        //chamando o metodo criado onSubmit, toda vez que eu precisar enviar o formulário eu chamo esse metodo
        this.onEdit();
        //botao editar
        this.selectAll();
        //selecionar tudo

    }

    onEdit(){
    //botao editar    

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {
        //o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado.
        //com o addEventListener, estou dizendo para o JS, voce vai escutar o evento, exemplo evento clique, clicar no botão, clicou no botão dispara tal evento.    

            this.showPanelCreate();
            //mostrar Painel Criar

        });

        this.formUpdateEl.addEventListener("submit", event => {
            //com o addEventListener, estou dizendo para o JS, voce vai escutar o evento, exemplo evento clique, clicar no botão, clicou no botão dispara tal evento.

            event.preventDefault();
            //O comando preventDefault, cancela o comando padrão que o evento teria, nao vai mais enviar quando usa esse comando

            let btn = this.formUpdateEl.querySelector("[type=submit]")
            ////o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado.    

            btn.disabled = true;//trava o botao

            let values = this.getValues(this.formUpdateEl);
            //Método criado, getValues, obter valores

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);

            this.getPhoto(this.formUpdateEl).then(
                //getPhoto, obter foto
                (content) => {

                    if (!values.photo){ 
                        result._photo = userOld._photo;
                    } else {
                        result._photo = content;
                    }

                    let user = new User();

                    user.loadFromJSON(result);
                    //carregar do JSON

                    user.save().then(user => {

                        this.getTr(user, tr);

                        this.updateCount();
                        //atualizar contagem
    
                        this.formUpdateEl.reset();

                        btn.disabled = false;//volta a funcionar o botao
                
                        this.showPanelCreate();
                         //mostrar Painel Criar
    
                    });

                }, 
                (e) => {
                    console.error(e)
                }
            );

        });

    }

    onSubmit(){
    //Metodo criado onSubmit, toda vez que eu precisar enviar o formulário eu chamo esse metodo

        this.formEl.addEventListener("submit", event => {
            //com o addEventListener, estou dizendo para o JS, voce vai escutar o evento, exemplo evento clique, clicar no botão, clicou no botão dispara tal evento.
            //formEl, quer dizer elemento do formulário.

            event.preventDefault();
            //O comando preventDefault, cancela o comando padrão que o evento teria, nao vai mais enviar quando usa esse comando

            let btn = this.formEl.querySelector("[type=submit]");
            //o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado. 
            //formEl, quer dizer elemento do formulário.   

            btn.disabled = true;

            let values = this.getValues(this.formEl);
            //Método criado, getValues, obter valores
            //formEl, quer dizer elemento do formulário.

            if (!values) return false;

            this.getPhoto(this.formEl).then(
                //getPhoto, obter foto
                //formEl, quer dizer elemento do formulário.
                (content) => {

                    values.photo = content;

                    values.save().then(user => {
                        this.addLine(user);
                        //addLine, função adicionar linha, parametro dados do usuário
    
                        this.formEl.reset();//zera o formulario antes de habilitar novamente o botao
                        //formEl, quer dizer elemento do formulário.
    
                        btn.disabled = false;
                    });

                }, 
                (e) => {
                    console.error(e)
                }
            );
        
        });

    }

    getPhoto(formEl){
    //getPhoto, obter foto
    //formEl, quer dizer elemento do formulário.

        return new Promise((resolve, reject) => {
            //essa promessa diz que quando nao der certo o parametro resolve, vai executar o reject

            let fileReader = new FileReader();
            //FileReader: Leitor de arquivos

            let elements = [...formEl.elements].filter(item => {
                //Spread, expressao esperando multiplos parametros, o ... , tres pontos, é um operador para eu nao precisar escrever quantos indices eu tenho.
                //filter: O filter, Localiza uma informação em um array, retorna para a tela a informação.
                //formEl, quer dizer elemento do formulário.

                if (item.name === 'photo') {
                    return item;
                }

            });

            let file = elements[0].files[0];

            fileReader.onload = () => {  

                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {

                reject(e);

            };

            if(file) {
                fileReader.readAsDataURL(file);
                //O método readAsDataURL é usado para ler o conteúdo do tipo Blob ou File .
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }
            //FileReader: Leitor de arquivos

        });

    }

    getValues(formEl){
    //Método criado, getValues, obter valores
    //formEl, quer dizer elemento do formulário.

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function(field, index){
            //Spread, expressao esperando multiplos parametros, o ... , tres pontos, é um operador para eu nao precisar escrever quantos indices eu tenho.
            //O ForEach é um laço que percorre um Array, para cada item execute uma ação. O forEach está pegando cada um dos campos especificados como parametro, field.
            //o parametro index é a posição do item na lista
            //formEl, quer dizer elemento do formulário.

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                //O indexOf Realiza buscas dentro de um array, senão encontrar retorna -1.

                field.parentElement.classList.add("has-error");
                isValid = false
                //validação dos campos obrigatorios do formulario

            }

            if (field.name === "gender") {
    
                if (field.checked) {
                    user[field.name] = field.value
                }
    
            } else if(field.name == "admin") {

                user[field.name] = field.checked;

            } else {
    
                user[field.name] = field.value
    
            }
    
        });

        if (!isValid) {
            return false;
        }
    
        return new User(//retornando a resposta da classe User
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );

    }

    selectAll() {
    //selecionar tudo    

        User.getUsersStorage().then(data=> {
            //promessa retornada, pegando o objeto json como resposta

            data.users.forEach(dataUser => {
                //O ForEach é um laço que percorre um Array, para cada item execute uma ação.
                //dataUser, Dados do usuário
    
                let user = new User();
        
                user.loadFromJSON(dataUser);
                //carregar do JSON
                //dataUser, Dados do usuário
            
                this.addLine(user);
                //addLine, função adicionar linha, parametro dados do usuário
            });
        });

    };
    
    addLine(dataUser) {
    //addLine, função adicionar linha, parametro dados do usuário
    //dataUser, Dados do usuário

        let tr = this.getTr(dataUser);
        //dataUser, Dados do usuário

        this.tableEl.appendChild(tr);
        //O appendChild, permite adicionar código HTML como elemento filho do elemento atual.

        this.updateCount();
        //atualizar contagem

    }

    getTr(dataUser, tr = null) {
        //dataUser, Dados do usuário

        if (tr === null) tr = document.createElement('tr');
        //criar elemento

        tr.dataset.user = JSON.stringify(dataUser);
        //dataUser, Dados do usuário

        tr.innerHTML = `
            <td><img src=${dataUser.photo} class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        `;
        /*A propriedade innerHTML, recupera ou atribui um valor a um elemento HTML, com o innerHTML, estou colocando um texto no JS, mas 
        não é uma string, é um comando html no meu JS e precisa ser interpretado.*/
        //dataUser, Dados do usuário

        this.addEventsTr(tr);
        //adicionar eventos Tr

        return tr

    }

    addEventsTr(tr) {
    //adicionar eventos Tr

        tr.querySelector(".btn-delete").addEventListener("click", (e) => {
        //o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado.
        //com o addEventListener, estou dizendo para o JS, voce vai escutar o evento, exemplo evento clique, clicar no botão, clicou no botão dispara tal evento.    

            if(confirm("Deseja relamente excluir?")) {
            //confirm, abre uma janela de confirmação com ok e cancelar.

                let user = new User();

                user.loadFromJSON(JSON.parse(tr.dataset.user));
                //carregar do JSON

                user.remove().then(data=> {

                    tr.remove();

                    this.updateCount();
                    //atualizar contagem

                });

            }

        });

        tr.querySelector(".btn-edit").addEventListener("click", e => {
            //o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado. 
            //com o addEventListener, estou dizendo para o JS, voce vai escutar o evento, exemplo evento clique, clicar no botão, clicou no botão dispara tal evento.   

            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {
                //for in, laço para percorrer objetos

                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");
                //o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado.
                //O replace, função nativa que substitui dados, procura o primeiro elemento e substitui.    

                if (field) {

                    switch (field.type) {

                        case 'file':
                            continue;
                            break;
                            
                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            //o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado.    
                            //O replace, função nativa que substitui dados, procura o primeiro elemento e substitui.    

                            field.checked = true;
                        break;

                        case 'checkbox':
                            field.checked = json[name];
                        break;

                        default:
                            field.value = json[name];

                    }
                    //switch, comando de decisão, utiliza opções pré-definidas, quando você já sabe as opçoes que podem acontecer.  
                    //continue, palavra reservada, quer dizer, ignora o restante das instruções e avança, passa para o proximo.
                    //breack, Palavra reservada, o comando interrompe a execução do bloco switch.
                    //default, Caso nenhuma expressão tenha executado, execute o que ta dentro do default.

                    field.value = json[name];
                }

            }

            this.formUpdateEl.querySelector(".photo").src = json._photo
            //o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado.    
            
            this.showPanelUpdate();
            //mostrar Painel Criar

        });

    }

    showPanelCreate(){
    //mostrar Painel Criar

        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }

    showPanelUpdate(){
    //mostrar Painel Criar

        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
        //o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado.    

    }

    updateCount(){
    //atualizar contagem
    //usuários adm e nao adm    

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {
            //Spread, expressao esperando multiplos parametros, o ... , tres pontos, é um operador para eu nao precisar escrever quantos indices eu tenho.
            //O ForEach é um laço que percorre um Array, para cada item execute uma ação.

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;
        })

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
        //o método querySelector() retorna o primeiro Elementno documento que corresponde ao seletor ou grupo de seletores especificado.  
        /*A propriedade innerHTML, recupera ou atribui um valor a um elemento HTML, com o innerHTML, estou colocando um texto no JS, mas 
        não é uma string, é um comando html no meu JS e precisa ser interpretado.*/  

    }
}