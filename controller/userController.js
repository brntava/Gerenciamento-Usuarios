class UserController {

    constructor(formId) {

        this.formEl = document.getElementById(formId)

    }

    onSubmit() {

        this.formEl.addEventListener('submit', e =>{

            e.preventDefault();

            this.getValues();

        })
    }

    getValues() {

        let user = {}

        this.formEl.elements.forEach( (item, index) => {

            if(item.name == 'gender'){
        
                if(item.checked){
                    user[item.name] = item.value
                }
        
            } else{
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
        console.log(dataUser)
    
        document.getElementById('table-users').innerHTML = `
    
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>`;
    
    }

}