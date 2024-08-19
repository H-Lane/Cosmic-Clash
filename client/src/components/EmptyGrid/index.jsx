import React, { useState } from "react";
import Cell from "../Cell/index";
import 'uikit/dist/css/uikit.min.css'; // Import UIkit CSS
import 'uikit/dist/js/uikit.min.js';

// Functional component for rendering the player's ship board
const EmptyGrid = ({ ships, handlePlacement, gridId }) => {
  // Function to check if a position is selected
  const positionSelected = (pos) => {
    for (let ship of ships) {
      if (ship.position.includes(pos)) return true;
    }
    return false;
  };

  // Function to render a single cell in the grid
  const renderCell = (i) => {
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

  // Function to render the entire ship board grid
  const renderShipBoard = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      const cellsInRow = [];
      for (let x = 0; x < 10; x++) {
        cellsInRow.push(renderCell(i * 10 + x));
      }
      rows.push(
        <div key={i} style={{ display: "flex" }}>
          {cellsInRow}
        </div>
      );
    }
    return rows;
  };

  // Return the ship board grid centered on the page
  return (
    <div
      className="ship-board"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        margin: "0 auto",
      }}
    >
      <div>{renderShipBoard()}</div>
    </div>
  );
};

export default EmptyGrid;
