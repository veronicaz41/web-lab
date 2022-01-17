import "./Play.css";
import React, {useState} from "react";
import {Link} from "react-router-dom"

// import { Link } from "@reach/router";
const Homepage = (player) => {
  const [proof,setProof]=useState(false);
  const [error,setError]=useState(false);
  const calculateProof = async () => {
    setProof(false);
    setError(false);
    const { proof, publicSignals } =
    await snarkjs.groth16.fullProve( { a: 3, b: 11}, require("url:../../../public/circuit.wasm"), require("url:../../../public/circuit_final.zkey"));
    console.log(proof);
    console.log(publicSignals);
    
    const verificationKeyUrl = require("url:../../../public/verification_key.txt");
    const vkey = await fetch(verificationKeyUrl).then( function(res) {
      console.log(res);
      return res.json();
    });
    const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);
    console.log(res);
    if (res){setProof(true)}else{setError(true)}

  }
    return (
        <div>
          <h>{"ZK Hearthstone"}</h>
          <p>{"a blockchain hearthstone game"}</p>
          {
            proof ? <Link to="/player1"><button>
            New Game
            </button>
          </Link> : <button onClick={calculateProof}>Click me verify your identity!</button>
          }
          {proof ? <p>ZK transaction sent</p>: <></>}

          {proof ? <p>Identity verified</p>: <></>}

          {error ? <p>Failed to verify</p>: <></>}
          
          
        </div>
    );
  };
  
  export default Homepage;