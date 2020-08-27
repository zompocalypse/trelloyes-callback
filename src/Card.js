import React from 'react';
import './Card.css';

export default function Card(card) {
  return (
    <div className='Card'>
      <button id={card.id} onClick={() => card.onDeleteCard(card.id)}
        type='button'
      >
        delete
      </button>
      <h3>{card.title}</h3>
      <p>{card.content}</p>
    </div>
  )
}
