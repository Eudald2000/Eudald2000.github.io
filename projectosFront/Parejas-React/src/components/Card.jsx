import { useState } from 'react'

export const Card = ({ image, mostrarCarta }) => {
  const [volteada, setVolteada] = useState(false)

  const handleClick = () => {
    setVolteada(!volteada)
    mostrarCarta(image) // Pasar el evento y la imagen
    console.log()
  }

  return (
    <>
    <div className="card" >
      <img onClick={handleClick} src={volteada ? image : '/interrogante.jpg'} alt="Carta" />
    </div>
    </>
  )
}
