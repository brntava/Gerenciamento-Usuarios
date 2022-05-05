class UserController {

    constructor(formEl, tableEl) {

        this.formEl = document.getElementById(formEl);
        this.tableEl = document.getElementById(tableEl);
        this.onSubmit();

    }

    onSubmit() {

        this.formEl.addEventListener('submit', e =>{

            e.preventDefault();

            let values = this.getValues();

            // Retorno da promise

            this.getPhoto().then(
            (content) => {

                values.photo = content;
                this.addLine(values);
                
            },
            (e) =>{
                console.error(e);
            })

        })
    }

    // Pegar a foto

    getPhoto(){

        return new Promise((resolve, reject) => {

        let fileReader = new FileReader();

        // Filtra a array e cria uma nova com os dados filtrados

        let elements = [...this.formEl.elements].filter(item => {

            if(item.name == 'photo'){
                return item;
            }

        })

        // Pega o primeiro elemento do form e o primeiro file

        let file = (elements[0].files[0]);

        // Quando terminar de carregar a img, executa essa funçao

        fileReader.onload = () => {

            resolve(fileReader.result)

        };

        // Se der erro

        fileReader.onerror = (e) => {

            reject(e);

        };

        if(file){

            fileReader.readAsDataURL(file);

        } else{

            resolve('dist/img/boxed-bg.jpg')
        }

        });

    }
    

    // Retorna o usuario

    getValues() {

        let user = {};

        // ... quando não sabe quantos itens vao ter no array

        [...this.formEl.elements].forEach( (item, index) => {

            if(item.name == 'gender'){
        
                if(item.checked){
                    user[item.name] = item.value;
                }
        
            } else if(item.name == 'admin'){

                user[item.name] = item.checked;

            }else{
                // Colocar o valor dentro do user
                user[item.name] = item.value
            }
        });
    
        return new User(
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

    addLine(dataUser){

        let tr = document.createElement('tr');

        tr.innerHTML = `
            <td> <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${dataUser.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;
    
        this.tableEl.appendChild(tr);
    
    }

}