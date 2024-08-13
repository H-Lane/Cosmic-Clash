import React, { useState } from "react";
import EmptyGrid from "../components/EmptyGrid";
import { useMutation } from "@apollo/client";
import { CREATE_GRID } from "../utils/mutations";

//This is our parent function for the page
function generateGrid(props) {
    //Here we set up a useState expecting an array of five objects
  const [ships, setShips] = useState([
    { shipName: "ship1", position: [1,2,3] },
    { shipName: "ship2", position: [34,35,36] },
    { shipName: "ship3", position: [44,88] },
    { shipName: "ship4", position: [] },
    { shipName: "ship5", position: [] }
  ]);
  //We bring in our createGrid mutation
  const [createGrid, { data }] = useMutation(CREATE_GRID);

  //This is the function that goes off when the User clicks the save ship layout button
  const handleShipSave = async (event) => {
    event.preventDefault();
    // map though our ships array in useState and pull the ship with the position
    const positions = ships.map(ship => ({
        shipName: ship.shipName,
        position: ship.position
    }));

    //Send the useState array off to the createGrid mutation
    const mutationResponse = await createGrid({
      variables: {
        ships: positions
      },
    });
  };

  //This is the listener that is updating the useState whenever a ship is placed
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
          <EmptyGrid ships={ships} onBoardClick={handlePlacement}></EmptyGrid>
      <button onClick={handleShipSave}>Save Ship Layout</button>
    </div>
  );
};


export default generateGrid;

