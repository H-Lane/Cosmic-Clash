import React, { useState } from "react";
import Cell from "../Cell/index";

// Functional component for rendering the player's attack grid
const AttackGrid = ({ ships, handleAttack }) => {
  // State to store the attack grid
  const [attackBoard, setAttackBoard] = useState([]);

  const positionAttacked = (pos) => {
    for (let ship of ships) {
      if (ship.position.includes(pos)) return true;
    }
    return false;
  };

  // Function to render a single cell in the attack grid
  const renderCell = (i) => {
    const status = ships[i]; // Assuming this returns 'O' or 'X'
    const style = positionAttacked(i + 1) ? "btn-X" : "btn-O";

    return (
      <Cell
        style={positionAttacked(i + 1) ? "btn-X" : "btn-O"}
        status={positionAttacked(i + 1) ? "X" : "O"}
        handleAttack={handleAttack}
        key={i}
        dataPosition={i + 1}
        attacked={positionAttacked(i + 1)}
      />
    );
  };

  // Function to render a row of cells in the attack grid
  const renderRow = (rowIndex) => {
    const cellsInRow = [];

    for (let x = 0; x < 10; x++) {
      cellsInRow.push(renderCell(rowIndex + x));
    }

    return <div key={rowIndex}>{cellsInRow}</div>;
  };

  // Function to render the entire attack grid
  const renderAttackGrid = () => {
    const rows = [];

    for (let i = 0; i < 10; i++) {
      rows.push(renderRow(i * 10));
    }
    return rows;
  };

  // Return the attack grid
  return <div className="attack-board">{renderAttackGrid()}</div>;
};

export default AttackGrid;