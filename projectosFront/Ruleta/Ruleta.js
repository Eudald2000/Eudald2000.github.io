
function cambiAposta(id) {
    // Obtén el elemento select
    var tipo = document.getElementById(id);
    // Lista de todos los ids de los selects
    var ids = ['sencilla', 'falta/passa', 'parell/senar', 'vermell/negre', 'dotzena', 'sisena', 'columna'];
    // Añade la clase 'none' a todos los selects
    for (var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).classList.add('none');
    }
    // Si el valor seleccionado está en la lista de ids
    if (ids.includes(tipo.value)) {
        // Elimina la clase 'none' del select correspondiente
        document.getElementById(tipo.value).classList.remove('none');
    }
}

function verificarApostar(id) {
    var numAl = Math.floor(Math.random() * 37);

    var tipo = document.getElementById(id).value;
    const ids = ['sencilla', 'falta/passa', 'parell/senar', 'vermell/negre', 'dotzena', 'sisena', 'columna'];
    var apuesta = document.getElementById(tipo).value
    var cant = document.getElementById('cant1').value;
    var res = 0;
    const select1 = document.querySelector('select[id="' + tipo + '"]');
    const option1 = select1.options[select1.selectedIndex];
    const numeros1 = option1.value.split(',').map(Number);

    for (i = 0; i <= ids.length; i++) {
        if (tipo == ids[0]) {
            if (apuesta == numAl) {
                res = cant * 36;
                document.getElementById('resultado').textContent = "¡Felicitaciones! Has acertado la apuesta has ganado " + res + "$";
                break;
            } else {
                document.getElementById('resultado').textContent = "Lo siento, no has acertado la apuesta sencilla. El número aleatorio era " + numAl + ".";
            }
        }
        else if (tipo == ids[1]) {
            if (numAl == 0) {
                res = cant / 2;
                document.getElementById('resultado').textContent = "Mala suerte ha salido el 0, ahora tienes " + res + "$";
            }
            else if (apuesta == 'falta' && numAl >= 1 && numAl <= 18) {
                res = cant * 2;
                document.getElementById('resultado').textContent = "¡Felicitaciones! Has acertado la apuesta has ganado " + res + "$";
            } else if (apuesta == 'passa' && numAl >= 19 && numAl <= 36) {
                res = cant * 2;
                document.getElementById('resultado').textContent = "¡Felicitaciones! Has acertado la apuesta has ganado " + res + "$";
            } else {
                document.getElementById('resultado').textContent = "Lo siento, no has acertado. El número aleatorio era " + numAl + ".";
            }
        } else if (tipo == ids[2]) {
            if (numAl == 0) {
                res = cant / 2;
                document.getElementById('resultado').textContent = "Mala suerte ha salido el 0, ahora tienes " + res + "$";
            } else if (apuesta == 'parell' && numAl % 2 == 0) {
                res = cant * 2;
                document.getElementById('resultado').textContent = "¡Felicitaciones! Has acertado la apuesta has ganado " + res + "$";
            } else if (apuesta == 'senar' && numAl % 2 != 0) {
                res = cant * 2;
                document.getElementById('resultado').textContent = "¡Felicitaciones! Has acertado la apuesta has ganado " + res + "$";
            } else {
                document.getElementById('resultado').textContent = "Lo siento, no has acertado. El número aleatorio era " + numAl + ".";
            }
        } else if (tipo == ids[3]) {
            if (numAl == 0) {
                res = cant / 2;
                document.getElementById('resultado').textContent = "Mala suerte ha salido el 0, ahora tienes " + res + "$";
            } else if (numeros1.includes(numAl)) {
                res = cant * 2;
                document.getElementById('resultado').textContent = "¡Felicitaciones! Has acertado la apuesta has ganado " + res + "$";
            } else {
                document.getElementById('resultado').textContent = "Lo siento, no has acertado. El número aleatorio era " + numAl + ".";
            }
        }else if (tipo == ids[4]) {
            if (numAl == 0) {
                res = cant / 2;
                document.getElementById('resultado').textContent = "Mala suerte ha salido el 0, ahora tienes " + res + "$";
            } else if (numeros1.includes(numAl)) {
                res = cant * 3;
                document.getElementById('resultado').textContent = "¡Felicitaciones! Has acertado la apuesta has ganado " + res + "$";
            } else {
                document.getElementById('resultado').textContent = "Lo siento, no has acertado. El número aleatorio era " + numAl + ".";
            }
        }else if (tipo == ids[5]) {
            if (numAl == 0) {
                res = cant / 2;
                document.getElementById('resultado').textContent = "Mala suerte ha salido el 0, ahora tienes " + res + "$";
            } else if (numeros1.includes(numAl)) {
                res = cant * 6;
                document.getElementById('resultado').textContent = "¡Felicitaciones! Has acertado la apuesta has ganado " + res + "$";
            } else {
                document.getElementById('resultado').textContent = "Lo siento, no has acertado. El número aleatorio era " + numAl + ".";
            }
        }else if (tipo == ids[6]) {
            if (numAl == 0) {
                res = cant / 2;
                document.getElementById('resultado').textContent = "Mala suerte ha salido el 0, ahora tienes " + res + "$";
            } else if (numeros1.includes(numAl)) {
                res = cant * 3;
                document.getElementById('resultado').textContent = "¡Felicitaciones! Has acertado la apuesta has ganado " + res + "$";
            } else {
                document.getElementById('resultado').textContent = "Lo siento, no has acertado. El número aleatorio era " + numAl + ".";
            }
        }
    }
}
