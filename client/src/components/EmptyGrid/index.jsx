import React, { useState } from "react";
import Cell from "../Cell/index";
import "uikit/dist/css/uikit.min.css"; // Import UIkit CSS
import "uikit/dist/js/uikit.min.js";

// Functional component for rendering the player's ship board

const EmptyGrid = ({ ships, handlePlacement, gridId, onPlay }) => {
  // State to store the ship board grid

  const [shipBoard, setShipBoard] = useState([]);

  const positionSelected = (pos) => {
    for (let ship of ships) {
      if (ship.position.includes(pos)) return true;
    }
    return false;
  };

  // Function to render a single cell in the grid
  const renderCell = (i) => {
    const status = ships[i]; // Assuming this returns 'O' or 'X'
    const style = status === "O" ? "btn-O" : status === "X" ? "btn-X" : "";

    return (
      <Cell
        gridId={gridId}
        style={positionSelected(i + 1) ? "btn-X" : "btn-O"}
        status={positionSelected(i + 1) ? "X" : "O"}
        handlePlacement={handlePlacement}
        key={i}
        dataPosition={i + 1}
        selected={positionSelected(i + 1)}
      />
    );
  };

  // Function to render a row of cells in the grid
  const renderRow = (rowIndex) => {
    const cellsInRow = [];

    for (let x = 0; x < 10; x++) {
      cellsInRow.push(renderCell(rowIndex + x));
    }

    return <div key={rowIndex}>{cellsInRow}</div>;
  };

  // Function to render the entire ship board grid
  const renderShipBoard = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(renderRow(i * 10));
    }
    return rows;
  };

  // Render the ship board when the component mounts
  //   useEffect(() => {
  //     if (ships && ships.length > 0) {
  //       renderShipBoard();
  //     }
  //   }, [ships]);

  // Return the ship board grid
  return (
    <div
      className="ship-board"
      style={{

        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        width: "100vw",
        margin: "0 auto",
      }}
    >
      {renderShipBoard()}

      {onPlay && ( // CHANGE: Conditionally render the Play button if `onPlay` prop is provided
        <button onClick={() => onPlay(gridId)}>Play</button> // CHANGE: Render Play button with `onPlay` functionality
      )}
    </div>
  );
};

export default EmptyGrid;
