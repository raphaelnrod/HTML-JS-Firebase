// HTML get functions
value = (req) => document.getElementById(req).value;
render = (req,res) => document.getElementById(req).innerHTML+=res;
setInput = (req,res) => document.getElementById(req).value=res;
setInner = (req,res) => document.getElementById(req).innerHTML=res;

//limpa os input do form
const clearInputs = (params) => {
    params.map((item) => document.getElementById(item).value = "");
}

//confirma se todos os campos estao preenchidos no form
const isSet = (...params) => {
    const arr = params.map((item) => item == "" ? false : true);
    const res = arr.find((item) => item == false);
    if(typeof res === "undefined") return true;
};