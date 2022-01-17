import React from "react";
import { useEffect, useState } from 'react';
import "../../utilities.css";
import "./Play.css";
import SinglePlant from './Plant';
import SingleCard from './SingleCard';
import SingleHand from './SingleHand';

// array of card images
const cardImages = [
    { src: '../../../public/img/fox.png'},
    { src: '../../../public/img/dog.png'},
    { src: '../../../public/img/cat.png'},
    { src: '../../../public/img/eagle.png'},
    { src: '../../../public/img/rabbid.png'},
    { src: '../../../public/img/boy.png'},
  ]

const TERRAINS = [
  { src: "../../../public/img/terrain.jpg"},
  { src: "../../../public/img/terrain.jpg"},
  { src: "../../../public/img/terrain.jpg"},
  { src: "../../../public/img/terrain.jpg"},
  { src: "../../../public/img/terrain.jpg"},
  { src: "../../../public/img/terrain.jpg"}
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const Play = (calculateProof,player) => {

  const INIT_HEALTH=100;
  const [cards1, setCards1] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [hands1, setHands1] = useState([]);
  const [hands2, setHands2] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      // if (choiceOne.src === choiceTwo.src) {
      //   setCards(prevCards => {
      //     return prevCards.map((card) => {
      //       if (card.src === choiceOne.src) {
      //         return { ...card, matched: true }
      //       } else {
      //         return card;
      //       }
      //     })
      //   })
      //   resetTurn();
      // } else {
      //   setTimeout(() => resetTurn(), 1000);
      // }
    }
  }, [choiceOne, choiceTwo])

  // TODO: selectedCard will store the Card that's selected, basically it will pass the
  // selected card from child component to parent component.
  const [drawn, setDrawn] =useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(()=>{
    // selectedBoard.placed=true;
    setDrawn(false);

    let idxToReplace = -1;
    for (let i = 0; i < cards1.length; i++) {
      if (cards1[i].id === selectedBoard.id) {
        idxToReplace = i;
        break;
      }
    }
    if (idxToReplace !== -1) {
      selectedCard.placed=true;
      cards1[idxToReplace] = selectedCard;
    }

    const newhands1 = [...hands1];
    for (const card of newhands1){
      if (card.id===selectedCard.id){
        card.inhand=false;
      }
    }
    setHands1(newhands1);
  },[selectedBoard])

  const [turns, setTurns] = useState(true);

  const [plantHealth1, setPlantHealth1] = useState(INIT_HEALTH);
  const [plantHealth2, setPlantHealth2] = useState(INIT_HEALTH);

  const decrementHealth = (id) => {
    if (id===1){
      setPlantHealth1(Math.max(plantHealth1 - 10,0));
    } else {
      setPlantHealth2(Math.max(plantHealth2 - 10,0));
    }
  };

  // const [flipped,setFlipped]=useState(false);
  // const HandlePlace = (card) => {
  //     card.placed=true;
  //     card.inhand=false;
  //     setSelectedBoard(card.id);

  //     // TODO: cards1 should be initialized to a list of nulls. 
  //     // copy cards1 and replace the clicked grid idx with the 
  //     // selctedCard (returned from setParentSelectedCard in SingleCard).
  //     // TODO: copy the whole hands1 and remove the selected card.
  // }

  // shuffle cards, duplicate cards to get set of 12, assign random ID to each
  const resetGame = () => {
    const shuffledCards = [...cardImages]      // 2 lots of card images
      .sort(() => Math.random() - 0.5)                        // shuffled array
      .map((card) => ({ ...card, id: Math.random(), placed: false, inhand:false }))        // add on random ID number to each card

    const initCards = [...TERRAINS]
      .map((card) => ({ ...card, id: Math.random(), placed: false, inhand:false }))
    setCards1(initCards);
    setCards2([...initCards]);
    setHands1(shuffledCards);
    setHands2([...shuffledCards]);
    setPlantHealth1(INIT_HEALTH);
    setPlantHealth2(INIT_HEALTH);
    setIdx(0);
    
  }

  const [idx,setIdx]=useState(0);

  // TODO: when the drawn card is already inPlace, choose another number

  const handleDraw = () => {
    setDrawn(true);
    const newhand = [...hands1];
    newhand[idx].inhand = true;
    setHands1(newhand);
    setIdx(Math.min(5,idx+1));
  }

  // const drawNewCard = () => {
  //   while (true) {
  //     const card = getRandomInt(6);
  //     if (!(card in drawnCard)){
  //       drawnCard.add(card);
  //       return card;
  //     }
  //   }
  // }

  // handle a user choice, update choice one or two
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)        // if choiceOne is null (is false), update with setChoiceOne, else update choiceTwo with setChoiceTwo
  }

  // reset game automagically
  useEffect(() => {
    resetGame()
  }, [])

  // // reset choices and increase number of turns
  // const resetTurn = () => {
  //   setChoiceOne(null);
  //   setChoiceTwo(null);
  //   setTurns(prevTurns => prevTurns + 1);
  //   setDisabled(false);
  // }

  return (
      <div>
        <div className="Play-newgame">
        <button onClick={resetGame}>New Game</button>
        <p >{turns ? "your turn": "opponent's turn"}</p>
        </div>
        <div className="u-inlineBlock">
            <div className="Play-plant1">
                <SinglePlant health={plantHealth1} decrement={() => decrementHealth(1)}/>
            </div>
            <div className="Play-planthealth"></div>
        </div>

        <div className="card-grid">
        {cards2.map((card) => (
            <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            setParentSelectedBoard={setSelectedBoard}
            // cardFlipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
        </div>
        <div className="card-grid">
        {cards1.map((card) => (
            <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            setParentSelectedBoard={setSelectedBoard}
            // cardFlipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
        </div>
        <div className="u-inlineBlock">
            <div className="Play-plant1">
                <SinglePlant health={plantHealth2} decrement={() => decrementHealth(2)} />
            </div>
            <div className="Play-planthealth"></div>
        </div>

        <div className="card-grid">
        {hands1.map((card) => (
            <SingleHand
            key={card.id}
            card={card}
            setParentSelectedCard={setSelectedCard}
            />
        ))}
        </div>

        <div className="draw">
            <button onClick={handleDraw}>Draw Card</button>
            {/* <button
        onClick={calculateProof}
      >Click me!</button> */}
        </div>
        {drawn?<p>Click a minion to select and click a grid to place</p>:<></>}
        
      </div>
  );
};

export default Play;

// Questions
// new game
// place card, can't choose another position after placing a card
// drawn card, how to draw new card
// hover over will get the minion healtha nd