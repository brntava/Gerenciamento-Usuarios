let fields = document.querySelectorAll('#form-user-create [name]');
let user = {};

fields.forEach( (item, index) => {

    if(item.name == 'gender'){

        if(fields.checked){
            user.gender
        }

    } else{

        // Add o valor do nome direto no user
        user[item.name] = fields.value
    }
})

console.log(user)

