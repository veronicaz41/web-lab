import './Plant.css'
import { useEffect, useState } from 'react';

export default function SinglePlant({health, decrement}) {    // destructure plant

    return (
        <div className="Plant-health">
                <img align="middle"
                    className="plant"
                    src={'../../../public/img/plant.png'}
                    width="100"
                    height="100"
                    onClick={decrement}
                />
                <p>plant health: {} {health}</p> 
        </div>
    )
}
