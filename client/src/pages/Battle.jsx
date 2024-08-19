import React, { useState } from "react";
import EmptyGrid from "../components/EmptyGrid";
import { useMutation } from "@apollo/client";
import { Routes, Route, useParams } from "react-router-dom";
import AttackGrid from "../components/AttackGrid";

import { CREATE_ATTACK } from "../utils/mutations";

function Battle() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [atkPosition, setAtkPosition] = useState(0);
  const gameId = useParams();
  console.log(gameId);

  const [createAttack, { data }] = useMutation(CREATE_ATTACK);

  const selectSquare = (e) => {
    setAtkPosition(parseInt(e.target.dataset.position));
    console.log(e.target.dataset.position);
  };

  const confirmAttack = async (e) => {
    e.preventDefault();

    try {
      const mutationResponse = await createAttack({
        variables: {
          position: atkPosition,
          gameId: gameId,
        },
      });
    } catch (err) {
      console.error(err);
      console.log(error);
    }
  };

  return (
    <div>
      <AttackGrid atkPosition={atkPosition} selectSquare={selectSquare} />
      <button onClick={confirmAttack}>LAUNCH ATTACK</button>
    </div>
  );
}

export default Battle;
