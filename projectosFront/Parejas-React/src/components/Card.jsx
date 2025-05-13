export const Card = ({ image, isFlipped, onFlip }) => {
  return (
    <div className="card" onClick={onFlip}>
      <img
        src={isFlipped ? image : '/interrogante.jpg'}
        alt="Carta"
        style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}
      />
    </div>
  )
}
