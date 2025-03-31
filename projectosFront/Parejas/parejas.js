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

function primeraPareja(event) {
  const tarjeta = event.target;

  if (tarjeta && tarjeta.classList.contains("interrogante")) {
    console.log("entra en primera pareja")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  assignarImgs();
});
document.addEventListener("click", (event) => {
  primeraPareja(event);
});