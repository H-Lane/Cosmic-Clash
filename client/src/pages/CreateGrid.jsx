import React, { useState } from "react";
import EmptyGrid from "../components/EmptyGrid";
import { useMutation } from "@apollo/client";
import { CREATE_GRID } from "../utils/mutations";
import DisplayShips from "../components/Ships";

//This is our parent function for the page
function CreateGrid(props) {
  //Variable to hold selected ship from ship components
  const [shipName, setShipName] = useState("");
  const [shipSize, setShipSize] = useState(0);
  const [spacesLeft, setSpacesLeft] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const [showShips, setShowShips] = useState([
    "ship1",
    "ship2",
    "ship3",
    "ship4",
    "ship5",
  ]);

  //Here we set up a useState expecting an array of five objects
  const [ships, setShips] = useState([
    { shipName: "ship1", position: [] },
    { shipName: "ship2", position: [] },
    { shipName: "ship3", position: [] },
    { shipName: "ship4", position: [] },
    { shipName: "ship5", position: [] },
  ]);

  //We bring in our createGrid mutation
  const [createGrid, { data, error }] = useMutation(CREATE_GRID);

  //This is the function that goes off when the User clicks the save ship layout button
  const handleShipSave = async (event) => {
    console.log(ships);
    event.preventDefault();

    //Send the useState array off to the createGrid mutation
    try {
      const mutationResponse = await createGrid({
        variables: { ships: ships },
      });
    } catch (err) {
      console.error(err);
      console.log(error);
    }
  };

  //This is the listener that is updating the useState for the ships whenever a ship is placed
  const handlePlacement = (e) => {
    //first we check if there are still places left for the ship the user has selected
    if (shipName && spacesLeft > 0) {
      //call the ship setter function to map through our ships use state and check the ship selected against the names of the ships in the use state, then update the position array to contain the grid position of the clicked square.
      setShips(
        ships.map((ship) => {
          if (ship.shipName === shipName) {
            ship.position.push(parseInt(e.target.dataset.position));
            console.log(ship);
          }
          return ship;
        })
      );

      //create a variable to hold the new spaces left to pass to the renderShips function
      const newSpacesLeft = spacesLeft - 1;

      //Reduce the number of spaces left to select by one in the use state
      setSpacesLeft(newSpacesLeft);

      //call the function to rerender ships if the current ship has no spaces left
      renderShips(newSpacesLeft);
    } else if (!shipName) {
      return;
    } else {
      //Set a message to display in the modal and call the modal to display
      setMessage("Select Another Ship To Deploy!");
      setShowModal(true);
    }
  };

  //Conditionally render displayed ships
  const renderShips = (newSpacesLeft) => {
    if (shipName && newSpacesLeft === 0) {
      setShowShips(showShips.filter((name) => name !== shipName));
    }
  };

  //function to clear the selected positions currently on the board and reshow any removed ships from the list of ships
  const clearBoard = () => {
    setShips(
      ships.map((ship) => {
        if (ship.position.length > 0) {
          ship.position = [];
        }
        return ship;
      })
    );
    setShowShips(["ship1", "ship2", "ship3", "ship4", "ship5"]);
  };

  //Sets the selected ship from the ship component to the use states associated with them. Also displays the size of the ship to the page so that the User knows how many squares they have left.
  //FUTURE: Change styling to display the selected ship and stop user from selecting another ship until the ship is fully placed
  const shipSetter = (e) => {
    //We close the modal if necessary
    closeModal();
    setShipName(e.target.dataset.name);
    setShipSize(parseInt(e.target.dataset.size));
    setSpacesLeft(parseInt(e.target.dataset.size));
  };

  //Method to handle the modal close button
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="grid-container">
      <EmptyGrid ships={ships} handlePlacement={handlePlacement} />
      <button onClick={handleShipSave}>Save Ship Layout</button>
      <DisplayShips shipSetter={shipSetter} showShips={showShips} />
      <button onClick={clearBoard}>Clear Board</button>
      <h1>SPACES LEFT: {spacesLeft}</h1>
      {/* This is a modal to display any information stored in the message useState as a modal to a user. ORRNDREA WE WILL NEED THIS TO BE A STYLED MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* This is the button to close the modal */}
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{message}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateGrid;
