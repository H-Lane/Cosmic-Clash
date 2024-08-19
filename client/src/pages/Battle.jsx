import React, { useState } from "react";
import EmptyGrid from "../components/EmptyGrid";
import { useMutation, useLazyQuery } from "@apollo/client";
import { Routes, Route, useParams } from "react-router-dom";
import AttackGrid from "../components/AttackGrid";
import { CREATE_ATTACK } from "../utils/mutations";
import { GET_TURN } from "../utils/queries";

function Battle() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [atkPosition, setAtkPosition] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(false);
  const [getTurn, { data: turnData }] = useLazyQuery(GET_TURN);
  const [createAttack, { data }] = useMutation(CREATE_ATTACK);

  const rawGameId = useParams();
  const gameId = rawGameId.id;

  setInterval(() => checkTurn, 1000);

  const checkTurn = async () => {
    await getTurn({
      variables: { gameId },
    });
    if (turnData) {
      setCurrentTurn(true)
    } else {
      setCurrentTurn(false)
    }
  };

  const selectSquare = (e) => {
    setAtkPosition(parseInt(e.target.dataset.position));
    console.log(e.target.dataset.position);
  };

  const confirmAttack = async (e) => {
    e.preventDefault();
    console.log(atkPosition);
    console.log(gameId);

    try {
      const mutationResponse = await createAttack({
        variables: {
          position: atkPosition,
          gameId: gameId,
        },
      });
      console.log(mutationResponse);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
       <img
    src="\gal.PNG"  
    alt="Background"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -1, // Ensure it stays behind other content
    }}
    />  
      <AttackGrid atkPosition={atkPosition} selectSquare={selectSquare} />
      {/* {currentTurn && ( */}
      <button onClick={confirmAttack}>LAUNCH ATTACK</button>
      {/* )} */}
    </div>
  );
}

export default Battle;
