let numeroSecreto = 0;
let intentos = 1;
let maxIntentos = 5;
let listaNumeros = [];
let numeroMaximo = 100;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento("p", `Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}`);
        habilitarNuevo();
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento("p", 'Fallaste, el número secreto es MENOR');
        } else {
            asignarTextoElemento("p", 'Fallaste, el número secreto es MAYOR');
        }
        intentos++;
        limpiarCaja();
    }

    if (intentos > maxIntentos) {
        asignarTextoElemento("p", `Has agotado tus intentos. El número secreto era ${numeroSecreto}`);
        habilitarNuevo();
    }
}

function limpiarCaja() {
    let cajaDeTexto = document.querySelector('#valorUsuario');
    cajaDeTexto.value = "";
    cajaDeTexto.focus();
}

function generarNumeroSecreto() {
    if (listaNumeros.length > 5) {
        listaNumeros.shift();
    }
    let numSecret;
    do {
        numSecret = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumeros.includes(numSecret));

    listaNumeros.push(numSecret);
    return numSecret;
}

function habilitarNuevo() {
    document.getElementById('reiniciar').removeAttribute('disabled');
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(listaNumeros);
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('valorUsuario').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            verificarIntento();
        }
    });
});

condicionesIniciales();