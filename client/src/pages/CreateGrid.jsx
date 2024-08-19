import React, { useState } from "react";
import EmptyGrid from "../components/EmptyGrid";
import { useMutation } from "@apollo/client";
import { CREATE_GRID } from "../utils/mutations";
import DisplayShips from "../components/Ships";
import '../../node_modules/uikit/dist/css/uikit.css'
import '../../node_modules/uikit/dist/js/uikit.min.js'

// This is our parent function for the page
function CreateGrid(props) {
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

  const [ships, setShips] = useState([
    { shipName: "ship1", position: [] },
    { shipName: "ship2", position: [] },
    { shipName: "ship3", position: [] },
    { shipName: "ship4", position: [] },
    { shipName: "ship5", position: [] },
  ]);

  const [createGrid] = useMutation(CREATE_GRID);

  const handleShipSave = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await createGrid({
        variables: { ships: ships },
      });
      console.log("SAVED")
      redirect();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlacement = (e) => {
    if (shipName && spacesLeft > 0) {
      setShips(
        ships.map((ship) => {
          if (ship.shipName === shipName) {
            ship.position.push(parseInt(e.target.dataset.position));
          }
          return ship;
        })
      );

      const newSpacesLeft = spacesLeft - 1;
      setSpacesLeft(newSpacesLeft);
      renderShips(newSpacesLeft);
    } else if (!shipName) {
      return;
    } else {
      setMessage("Select Another Ship To Deploy!");
      setShowModal(true);
    }
  };

  const renderShips = (newSpacesLeft) => {
    if (shipName && newSpacesLeft === 0) {
      setShowShips(showShips.filter((name) => name !== shipName));
    }
  };

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

  const shipSetter = (e) => {
    closeModal();
    setShipName(e.target.dataset.name);
    setShipSize(parseInt(e.target.dataset.size));
    setSpacesLeft(parseInt(e.target.dataset.size));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const redirect = () => {
    window.location.href = `./home`;
  };

  return (
    <div
      className="grid-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <EmptyGrid ships={ships} handlePlacement={handlePlacement} />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleShipSave} className="uk-button uk-button-primary">
          Save Ship Layout
        </button>
        <button onClick={clearBoard} className="uk-button uk-button-danger" style={{ marginLeft: "10px" }}>
          Clear Board
        </button>
      </div>
      <DisplayShips shipSetter={shipSetter} showShips={showShips} />
      <h1>SPACES LEFT: {spacesLeft}</h1>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
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
