const colores = ['rojo', 'verde', 'amarillo', 'azul', 'naranja', 'lila'];

// Inventa la sequencia a adivinar
let coloresAleatorios = [];
for (let i = 0; i < 4; i++) {
  let indiceAleatorio = Math.floor(Math.random() * colores.length);
  let colorAleatorio = colores[indiceAleatorio];
  coloresAleatorios.push(colorAleatorio);
}
//console.log(coloresAleatorios); // Imprime los colores aleatorios en la consola

// Cambia el color de la circunferencia en la que se hace click
function cambioColor(id) {
  var circ = document.getElementById(id);
  var cirClass = circ.classList;
  for (i = 0; i < colores.length; i++) {
    if (cirClass[1] == colores[5]) {
      cirClass.remove(colores[5])
      cirClass.add(colores[0])
      break;
    } else if (cirClass[1] == 'blanco') {
      cirClass.remove('blanco')
      cirClass.add(colores[0])
      break;
    }
    else if (cirClass[1] == colores[i]) {
      cirClass.remove(colores[i])
      cirClass.add(colores[i + 1])
      break;
    }
  }
}

function comprovarSolucion(id1, id2, id3, id4, idS1, idS2, idS3, idS4) {
  var c1 = document.getElementById(id1);
  var c2 = document.getElementById(id2);
  var c3 = document.getElementById(id3);
  var c4 = document.getElementById(id4);

  var s1 = document.getElementById(idS1);
  var s2 = document.getElementById(idS2);
  var s3 = document.getElementById(idS3);
  var s4 = document.getElementById(idS4);

  var classC1 = c1.classList;
  var classC2 = c2.classList;
  var classC3 = c3.classList;
  var classC4 = c4.classList;

  let resp = [classC1[1], classC2[1], classC3[1], classC4[1]];
  let sol = [s1, s2, s3, s4];
  let puntos = [s1.classList, s2.classList, s3.classList, s4.classList,]
  let copia = [];

  //Copia la sequencia de colores aleatorios
  for (let i = 0; i < 4; i++) {
    copia[i] = [...coloresAleatorios][i]
  }

  //Comprueba si la sequencia es correcta
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (resp[i] == copia[j]) {
        if (i == j) {
          //Si coincide el color y la posicion se pone en rojo
          sol[i].classList.remove(puntos[i][1]);
          sol[i].classList.add('rojo');
          copia[i] = 'text';
          break;
        } else {
          //Si el color se encuentra en la sequencia pero no en la posicion aplica la classe negro
          sol[i].classList.remove(puntos[i][1]);
          sol[i].classList.add('negro');
        }
      }
    }
  }
  // Si todos los circulos estan en rojo, ha ganado
  if (s1.classList[1] == 'rojo' && s2.classList[1] == 'rojo' && s3.classList[1] == 'rojo' && s4.classList[1] == 'rojo') {
    alert('HAS GANADO');
    location.reload();
  }

}

function noNone(id, id2) {
  var s4 = document.getElementById(id);
  var classS4 = s4.classList;
  s4.classList.remove(classS4[1]);

  var s1 = document.getElementById(id2);
  var classS4 = s1.classList;
  s1.classList.add('noClick');
}

function comprovarDerrota(){
  var sol1 = document.getElementById('sol37').classList
  var sol2 = document.getElementById('sol38').classList
  var sol3 = document.getElementById('sol39').classList
  var sol4 = document.getElementById('sol40').classList

  if(sol1[1] != 'rojo' || sol2[1] != 'rojo' || sol3[1] != 'rojo' || sol4[1] != 'rojo'){
    alert('HAS PERDIDO. No has conseguido adivinar la secuencia.');
    location.reload();
  }
}