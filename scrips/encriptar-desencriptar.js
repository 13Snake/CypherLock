//BLOQUEAR TEXT AREA QUE MUESTRA EL TEXTO ENCRIPTADO O DESENCRIPTADO
function bloquearTextArea(){
    const AreaTextoTratado = document.getElementById("textoTratado");
    AreaTextoTratado.readOnly = true;
}

//REMOVER MAYUSCULAS, CARACTERES ACENTUADOS Y ESPECIALES
function romoverCaracteresEspeciales(textoAcondicionado){
    textoAcondicionado = textoAcondicionado.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    textoAcondicionado = textoAcondicionado.replace(/[^a-z0-9\s]/g, "");
    return textoAcondicionado;
}

//COLOCAR EL PUNTERO EN EL INPUT
let inputTexto = document.getElementById("input-texto");
let contenedorTextoInput = document.getElementById("contenedorTextoInput");

contenedorTextoInput.addEventListener('click', function () {
    inputTexto.focus();
});

inputTexto.addEventListener("input", function(event){
    let textoInputUsuario = event.target.value;
    let textoSinCaracteresEspeciales = romoverCaracteresEspeciales(textoInputUsuario);
    event.target.value = textoSinCaracteresEspeciales;
});


const claveEncriptacion = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat"
};

function revisarTextoInput(){
    let textoIngresado = document.getElementById("input-texto");
    if(textoIngresado.value.trim() == ""){
        alert("El campo no puede estar vacio, intente de nuevo");
        return false;
    }
    return true;
}

function colocarTexto(textoTratado){
    let contenedorTextoInput = document.getElementById("contenedorTextoInicial");
    let contenedorTextoTratado = document.getElementById("contenedorTextoTratado");
    let textAreaEncriptado = document.getElementById("textoTratado");

    contenedorTextoInput.style.display = "none";
    contenedorTextoTratado.style.display = "flex";
    textAreaEncriptado.value = textoTratado;
}

function encriptarTexto(){
    if(!revisarTextoInput()){
        return 0;
    }

    let textoSinEncriptar = document.getElementById("input-texto");
    let textoEncriptado = textoSinEncriptar.value;
    textoSinEncriptar.value = "";
    
    let objEncriptacion = Object.entries(claveEncriptacion);

    for(let [claveObj, valorObj] of objEncriptacion){
        textoEncriptado = textoEncriptado.replace(new RegExp(claveObj, "g"), valorObj); 
    }

    colocarTexto(textoEncriptado);
}

function desencriptarTexto(){
    if(!revisarTextoInput()){
        return 0;
    }

    let textoEncriptado = document.getElementById("input-texto");
    let textoDesencriptado = textoEncriptado.value;
    textoEncriptado.value = "";
    
    let objEncriptacion = Object.entries(claveEncriptacion);

    for(let [claveObj, valorObj] of objEncriptacion){
        textoDesencriptado = textoDesencriptado.replace(new RegExp(valorObj, "g"), claveObj); 
    }

    colocarTexto(textoDesencriptado);
}

function copiarTexto(){
    const textAreaTratado = document.getElementById("textoTratado");
    const textAreaUsuario = document.getElementById("input-texto");

    let textoCopiar = textAreaTratado.value;

    if(navigator.clipboard){
        navigator.clipboard.writeText(textoCopiar)
        .then(() => {
            alert("Texto copiado");
        })
        .catch((error) => {
            alert("Error al copiar el tecto (" + error + ")");
        });
    }else{
        textAreaTratado.select();
        document.execCommand("copy");
        textAreaTratado.setSelectionRange(0,0);
        alert("Texto copiado");
    }
    textAreaUsuario.focus();
}