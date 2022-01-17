import './SingleCard.css'
import React, { useEffect, useState } from 'react';

export default function SingleCard({card, handleChoice, disabled, setParentSelectedBoard}) {    // destructure card and handleChoice props from App

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }

    const onClickFn = () => {
        if (!card.placed){
        setParentSelectedBoard(card);
        }
    }

    useEffect(() => {
        console.log(card);
    }, [])


    return (
        <div className="card">
                {card.placed ? <img className="front" 
                    src={card.src}
                    alt="Card front" />
                : <img
                    className="back"
                    src={card.src}
                    onClick={onClickFn}
                    alt="Card back"
                />}
            <div>
                health:100
                attack:50
            </div>
                {/* <div>health:100</div>
                <div>attack:50</div>
            </div> */}
        </div>
    )
}
