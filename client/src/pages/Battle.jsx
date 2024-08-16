import React, { useState } from "react";
import EmptyGrid from "../components/EmptyGrid";
import { useMutation } from "@apollo/client";
import AttackGrid from "../components/AttackGrid";

function Battle() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [atkPosition, setAtkPosition] = useState(0);

  const selectSquare = (e) => {
    setAtkPosition(parseInt(e.target.dataset.position));
    console.log(e.target.dataset.position);
  };

  return (
    <div>
      <AttackGrid atkPosition={atkPosition} selectSquare={selectSquare} />
    </div>
  );
}

export default Battle;
