import './SingleHand.css'
// import { StyleSheet, View} from 'react-native';
// import { useEffect, useState } from 'react';

export default function SingleHand({card,setParentSelectedCard}) {    // destructure card and handleChoice props from App
    const onClickFn = () => {
        setParentSelectedCard(card);
    }

    return (
        <div 
            className="card"
            onClick={onClickFn}
        >
                {card.inhand ? <img className="front" 
                    src={card.src}
                    alt="" />
                : <rect />}
        </div>
    )
}
