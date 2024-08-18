import React, { useState } from "react";
import EmptyGrid from "../components/EmptyGrid";
import { useMutation } from "@apollo/client";
import AttackGrid from "../components/AttackGrid";
//import { CREATE_ATTACK } from "../utils/mutations"

function Battle() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [atkPosition, setAtkPosition] = useState(0);

    const [createAttack, {data} ] = useMutation(CREATE_ATTACK);

  const selectSquare = (e) => {
    setAtkPosition(parseInt(e.target.dataset.position));
    console.log(e.target.dataset.position);
  };

//   const  = (e) => {
//     e.preventDefault();
confirmAttack
//     try {
//         const mutationResponse = await confirmAttack({
//             variables: { position: atkPosition }
//         });
//     } catch (err) {
//         console.error(err);
//         console.log(error);
//       }
//   };

  return (
    <div>
      <AttackGrid atkPosition={atkPosition} selectSquare={selectSquare} />
      <button onClick={confirmAttack}>LAUNCH ATTACK</button>
    </div>
  );
}

export default Battle;
