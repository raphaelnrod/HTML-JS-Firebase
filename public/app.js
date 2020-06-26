const db = firebase.database();
const fields = ["key", "name", "phone", "age", "cpf", "sexo"];
clearInputs(fields);

// carrega a lista com os dados do banco
function loadTable(name, phone, age, cpf, sexo, key){
    return `<tr>
                <th>${name}</td>
                <th>${phone}</td>
                <th>${age}</td>
                <th>${cpf}</td>
                <th>${sexo}</td>
                <th>
                    <button class="btn-update" onclick="updateClick(
                        \'${key}\'\,
                        \'${name}\'\,
                        \'${phone}\'\,
                        \'${age}\'\,
                        \'${cpf}\'\,
                        \'${sexo}\')">Alterar</button>
                    <button class="btn-del" onclick="removeUser(\'${key}\')">Excluir</button>
                </th>
            </tr>`;
}

function loadWarning(){
    return `<th>Não há registros no banco</th>`
}

//evento do click do botao enviar para pegar os dados no form
function insertClick(){
    var key = value("key");
    var name = value("name");
    var phone = value("phone");
    var age = value("age");
    var cpf = value("cpf");
    var sexo = value("sexo");
    if (isSet(key)){
        if (isSet(name, phone, age, cpf, sexo)){
            setInner("tableValues", "");
            updateUser(key, name, phone, age, cpf, sexo);
            clearInputs(fields);
        }else{
            alert("Preencha todos os campos");
        }
    } else{
        if(isSet(name, phone, age, cpf, sexo)){ 
            setInner("tableValues", "");
            create(name, phone, age, cpf, sexo); //salva no banco
            clearInputs(fields);
        }else{ 
            alert("Preencha todos os campos");        
        }
    }
}

//insere os valores no banco
function create(name, phone, age, cpf, sexo){
    db.ref('users/').push({
        name,
        phone,
        age,
        cpf,
        sexo
    });
}

//atualiza dados a partir da chave
function updateUser(key, name, phone, age, cpf, sexo){
    db.ref('users/' + key).update({
        name,
        phone,
        age,
        cpf,
        sexo
    });
}

function updateClick(key, name, phone, age, cpf, sexo){
    setInput("key", key);
    setInput("name", name);
    setInput("phone", phone);
    setInput("age", age);
    setInput("cpf", cpf);
    setInput("sexo", sexo);
}

//exclui dados no banco a partir da chave
function removeUser(key){
    if(confirm("Tem certeza que quer excluir?")){
        setInner("tableValues", "")
        db.ref('users').child(key).remove();
    }
}

//monitora alterações de dados no banco e chama a função de carregar os dados na tabela
db.ref('users').on('value', function(snapshot){
    var data = snapshot.val();
    if(data){
    $.each(data, function(key, value) {
            var table = loadTable(
                value.name,
                value.phone,
                value.age, 
                value.cpf, 
                value.sexo, 
                key);
            render('tableValues', table);
        });
    }else {
            render('tableValues', loadWarning());
    }
}); 
