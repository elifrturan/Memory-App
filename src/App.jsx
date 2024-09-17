import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'
import MemoryCards from './components/MemoryCards';

const cardList = [
  { "path": "/img/1.jpeg", matched: false},
  { "path": "/img/2.jpeg", matched: false},
  { "path": "/img/3.jpeg", matched: false},
  { "path": "/img/4.jpeg", matched: false},
  { "path": "/img/5.jpeg", matched: false},
  { "path": "/img/6.jpeg", matched: false}
];

function App() {
  
  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const prepareCards = () => {

    const sortedCards = [...cardList, ...cardList]
    .sort(() => 0.5 - Math.random())
    .map((card) => ({...card, id: Math.random()}));

    setCards(sortedCards);
    setSelectedOne(null);
    setSelectedTwo(null);
    setScore(0);
  }
  
  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
  }

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    if(selectedOne && selectedTwo){
      setDisabled(true);
      if(selectedOne.path ===selectedTwo.path){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.path === selectedOne.path){
              return { ...card, matched: true}
            }else{
              return card;
            }
          })
        })
        setScore(prevScore => prevScore + 1);
        resetState();
      }else{
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
  }

  return (
    <div className="container">
      <h1>Memory App</h1>
      <button onClick={prepareCards}>Start</button>
      <h3>Score: {score}</h3>
      <div className="card-grid">
        {
          cards.map((card) => {
            return(
              <MemoryCards 
              card={card} 
              key={card.id} 
              handleSelected={handleSelected}
              disabled={disabled}
              rotated={card === selectedOne || card === selectedTwo || card.matched}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default App
