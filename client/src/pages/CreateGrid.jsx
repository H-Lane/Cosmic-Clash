import React, { useState } from "react";
import EmptyGrid from "../components/EmptyGrid";
import { useMutation } from "@apollo/client";
import { CREATE_GRID } from "../utils/mutations";
import DisplayShips from "../components/Ships";

//This is our parent function for the page
function CreateGrid(props) {
  //Variable to hold selected ship from ship components
  //const [selectedShip, setSelectedShip] = useState([]);
  const [shipName, setShipName] = useState("");
  const [shipSize, setShipSize] = useState(0);
  const [spacesLeft, setSpacesLeft] = useState(0);

  //Here we set up a useState expecting an array of five objects
  const [ships, setShips] = useState([
    { shipName: "ship1", position: [] },
    { shipName: "ship2", position: [] },
    { shipName: "ship3", position: [] },
    { shipName: "ship4", position: [] },
    { shipName: "ship5", position: [] },
  ]);

  //We bring in our createGrid mutation
  const [createGrid, { data }] = useMutation(CREATE_GRID);

  //This is the function that goes off when the User clicks the save ship layout button
  const handleShipSave = async (event) => {
    event.preventDefault();
    // map though our ships array in useState and pull the ship with the position
    const positions = ships.map((ship) => ({
      shipName: ship.shipName,
      position: ship.position,
    }));

    //Send the useState array off to the createGrid mutation
    const mutationResponse = await createGrid({
      variables: {
        ships: positions,
      },
    });
  };

  //This is the listener that is updating the useState whenever a ship is placed
  const handlePlacement = (e) => {
    setShips(
      ships.map((ship) => {
        if (ship.shipName === shipName) {
          ship.position.push(parseInt(e.target.dataset.position));
          console.log(ship);
        }
        return ship;
      })
    );
    setSpacesLeft(spacesLeft-1)
  };

  //Sets the selected ship from the ship component to the use states associated with them. Also displays the size of the ship to the page so that the User knows how many square they have left.
  //FUTURE: Change styling to display the selected ship and stop user from selecting another ship until the ship is fully placed
  const shipSetter = (e) => {
    setShipName(e.target.dataset.name);
    setShipSize(parseInt(e.target.dataset.size));
    setSpacesLeft(parseInt(e.target.dataset.size));
  };

  return (
    <div className="grid-container">
      <EmptyGrid ships={ships} handlePlacement={handlePlacement} />
      <button onClick={handleShipSave}>Save Ship Layout</button>
      <DisplayShips shipSetter={shipSetter} />
      <h1>SPACES LEFT: {spacesLeft}</h1>
    </div>
  );
}

export default CreateGrid;
