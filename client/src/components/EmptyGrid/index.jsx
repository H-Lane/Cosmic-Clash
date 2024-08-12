import React, { useState, useEffect } from 'react';
import Cell from '../Cell/index';


// Functional component for rendering the player's ship board
const EmptyGrid = ({ playermap, onBoardClick }) => {
    // State to store the ship board grid
    const [shipBoard, setShipBoard] = useState([]);

    // Function to render a single cell in the grid
   const renderCell = (i) => {
    const status = playermap[i][0]; // Assuming this returns 'O' or 'X'
    const style = status === 'O' ? 'btn-O' : status === 'X' ? 'btn-X' : '';

    return (
        <Cell
            style={style}
            status={status}
            onClick={() => onBoardClick(i)}
            key={i}
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

        setShipBoard(rows);
    };

    // Render the ship board when the component mounts
    useEffect(() => {
    if (playermap && playermap.length > 0) {
        renderShipBoard();
    }
}, [playermap]);

    // Return the ship board grid
    return <div className='ship-board'>{shipBoard}</div>;
};

export default EmptyGrid; 