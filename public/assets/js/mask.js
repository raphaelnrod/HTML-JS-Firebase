
// funcao para o input so aceitar numeros
const onlyNumber = (field) => {
    document.getElementById(field).addEventListener("input", function() {
      var index = document.getElementById(field).value.length;
      var str = document.getElementById(field).value
      if(isNaN(Number(str.charAt(index - 1)))) {
        document.getElementById(field).value = str.substr(0, index - 1)
      }
  });
}

//mascara do CPF
onlyNumber("cpf");
document.addEventListener('keydown', function(event) { 
    if(event.keyCode != 46 && event.keyCode != 8){
    var index = document.getElementById("cpf").value.length;
    if (index === 3 || index === 7)
      document.getElementById("cpf").value = document.getElementById("cpf").value + ".";
    else if (index === 11) 
      document.getElementById("cpf").value = document.getElementById("cpf").value + "-";
    }
});

//máscara do telefone
onlyNumber("phone");
document.getElementById("phone").addEventListener('keydown', function(event) { 
    if(event.keyCode != 46 && event.keyCode != 8){
    var index = document.getElementById("phone").value.length;
    if (index === 0)document.getElementById("phone").value = document.getElementById("phone").value + "(";
    else if (index === 3) document.getElementById("phone").value = document.getElementById("phone").value + ") ";
    else if (index === 10) document.getElementById("phone").value = document.getElementById("phone").value + "-";
  }
});


