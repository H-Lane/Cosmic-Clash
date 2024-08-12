import React, { useState } from "react";
import EmptyGrid from "../components/EmptyGrid";
import { useMutation } from "@apollo/client";
import { createGrid } from "../utils/mutations";

function generateGrid(props) {
  const [ships, setShips] = useState([
    { shipName: "ship1", position: [] },
    { shipName: "ship2", position: [] },
    { shipName: "ship3", position: [] },
    { shipName: "ship4", position: [] },
    { shipName: "ship5", position: [] }
  ]);
  const [createGrid] = useMutation(CREATE_GRID);

  const handleShipSave = async (event) => {
    event.preventDefault();
    const positions = ships.map(ship => ({
        shipName: ship.shipName,
        position: ship.position
    }));

    const mutationResponse = await createGrid({
      variables: {
        ships: positions
      },
    });
  };

  const handlePlacement = (e) => {
    const { position, value } = e.target;
    const shipName = e.target.dataset.className; //Make sure to create an empty dataclass on each square that can be updated to contain the name of the ship in that space
    const shipIndex = ships.findIndex(ship => ship.shipName === shipName); 
    
    if (shipIndex !== -1) {
        const updatedShips = [...ships];
        updatedShips[shipIndex].position.push(position);
        setShips(updatedShips);
    } else {
        console.error("Ship Not Found In Ships Array.");
    }
  };

  return (
    <div className="grid-container">
      <EmptyGrid playermap={playermap} onBoardClick={handlePlacement}></EmptyGrid>
      <button onClick={handleShipSave}>Save Ship Layout</button>
    </div>
  );
};

export default generateGrid;
