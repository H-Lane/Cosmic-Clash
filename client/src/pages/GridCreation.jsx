import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { createGrid } from '../utils/queries';
import { EmptyGrid } from '../components'

function setGrid(props) {
    return <EmptyGrid
    playermap={playermap}
    onBoardClick={onBoardClick}
    ></EmptyGrid>
};

export default setGrid;


//import React from 'react';
//import './Grid.css'; 

// Grid component that generates a grid of cells
//const Grid = ({ onBoardClick }) => {
  // Function to create grid cells
 // const createGrid = () => {
   // const cells = [];
    
    // Loop to generate 100 cells (10x10 grid)
    //for (let i = 0; i < 100; i++) {
     // const row = Math.floor(i / 10); // Calculate row number
     // const col = i % 10; // Calculate column number
     // const cellKey = `${row}-${col}`; // Create a unique key for each cell

      // Push each cell into the cells array
     // cells.push(
       // <div
       //   key={cellKey} // Assign unique key to each cell
       //   className="grid-cell" // Apply CSS class for styling
      //    onClick={() => onBoardClick(row, col)} // Handle cell click event
      // />
    //  );
    //}
   // return cells; // Return the array of cells
 // };

  // Render the grid using UIkit classes
  //return (
    //<div className="uk-grid uk-grid-small uk-child-width-auto@s uk-text-center" uk-grid="true">
     // {createGrid()} {/* Generate and display grid cells */}
    //</div>
  //);
//};

//export default Grid; // Export the Grid component
