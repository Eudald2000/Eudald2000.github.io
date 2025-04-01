const imagenes = [
  "ainz", "ainz",
  "itadori", "itadori",
  "luffy", "luffy",
  "naruto", "naruto",
  "gojo", "gojo",
  "ichigo", "ichigo",
  "killua", "killua",
  "senku", "senku",
  "sjw", "sjw",
  "tanjiro", "tanjiro"
];
const imgs = document.querySelectorAll(".card");
let primeraSeleccion = null;
let segundaSeleccion = null;
let bloqueo = false;
let contador = 0;
const marcador = document.getElementById("marcador");
const restart = document.getElementById("restart");

function assignarImgs() {
  // Crear una copia de la lista para iterar
  const copiaImagenes = [...imagenes];
  const copiaImgs = [...imgs];

  copiaImagenes.forEach(() => {
    const randomIndex = Math.floor(Math.random() * imagenes.length);
    const randomImage = copiaImgs.splice(randomIndex, 1)[0];

    const randomIndexInterr = Math.floor(Math.random() * copiaImgs.length);
    const randomInterr = imagenes.splice(randomIndexInterr, 1)[0];

    randomImage.classList.add(randomInterr);
    randomImage.classList.add("interrogante");
  });
}

function primeraCarta(event) {
  const tarjeta = event.target;
  if (tarjeta && !bloqueo) {
    tarjeta.classList.remove("interrogante");
    primeraSeleccion = tarjeta;
    console.log("Primera seleccion: ", primeraSeleccion.classList);
  }
}

function segundaCarta(event) {
  const tarjeta = event.target;
  if (tarjeta && tarjeta !== primeraSeleccion && !bloqueo) {
    tarjeta.classList.remove("interrogante");
    segundaSeleccion = tarjeta;
    console.log("Segunda seleccion: ", segundaSeleccion.classList);
  }
  comprobarPareja();
}

function comprobarPareja() {
  bloqueo = true;
  if (!primeraSeleccion || !segundaSeleccion) {
    console.error("Error: Una de las selecciones es null.");
    bloqueo = false; // Desbloquear para evitar que el juego quede bloqueado
    return;
  }

  if (primeraSeleccion.classList[1] == segundaSeleccion.classList[1]) {
    console.log("Son iguales");
    primeraSeleccion.classList.add("correcto");
    segundaSeleccion.classList.add("correcto");
    setTimeout(() => {
      primeraSeleccion = null;
      segundaSeleccion = null;
      bloqueo = false;
      contador += 1;
      actualizarMarcador();
      
    }, 500);
  } else {
    console.log("No son iguales");
    setTimeout(() => {
      if (primeraSeleccion && segundaSeleccion) {
        primeraSeleccion.classList.add("interrogante");
        segundaSeleccion.classList.add("interrogante");
      }
      primeraSeleccion = null;
      segundaSeleccion = null;
      bloqueo = false;
      contador += 1;
      actualizarMarcador();
    }, 500);
  }
}

function actualizarMarcador() {
  marcador.textContent = `Turnos: ${contador}`;
}

document.addEventListener("DOMContentLoaded", () => {
  assignarImgs();
});
document.addEventListener("click", (event) => {
  // Bloquear clics si el juego está en estado de bloqueo
  if (bloqueo) return;
  if (!primeraSeleccion && !segundaSeleccion &&
    event.target.classList.contains("card") &&
    event.target.classList.contains("interrogante")) {
    primeraCarta(event);
  } else if (primeraSeleccion &&
    event.target.classList.contains("card") &&
    event.target.classList.contains("interrogante")) {
    segundaCarta(event);
  }
});

restart.addEventListener("click", () => {
  console.log("Reiniciando el juego...");
  primeraSeleccion = null;
  segundaSeleccion = null;
  bloqueo = false;
  contador = 0;
  actualizarMarcador();
  imgs.forEach((card) => {
    card.className = "card interrogante"; // Restablecer las clases a su estado inicial
  });
  assignarImgs();
});