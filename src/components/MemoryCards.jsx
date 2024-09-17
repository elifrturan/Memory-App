import React from 'react'

export default function MemoryCards({card, handleSelected, disabled, rotated}) {

  const handleClick = () => {
    if(!disabled){
        handleSelected(card);
    }
  } 

  return (
    <div className="card" key={card.id}>
        <div className={rotated ? "rotated" : ""}>
            <img className='cardFront' src={card.path} alt="" />
            <img className='cardBack' onClick={handleClick} src="./img/cover.jpeg" alt="" />
        </div>
    </div>
  )
}
