import React, { useState } from 'react';
import EmptyGrid from '../components/EmptyGrid/index';

const CreateGrid = () => {
    // Initialize playermap state
    const [playermap, setPlayermap] = useState(Array(100).fill('O'));

    // Event handler for board click
    const handleBoardClick = (index) => {
        console.log(`Cell ${index} clicked`);

        // Toggle between selecting and unselecting a cell
        const updatedPlayermap = [...playermap];
        if (updatedPlayermap[index] === 'X') {
            updatedPlayermap[index] = 'O'; // Change back to initial state
        } else {
            updatedPlayermap[index] = 'X'; // Select the cell
        }
        setPlayermap(updatedPlayermap);
    
    };

    return (
        <div className="container">
            <EmptyGrid playermap={playermap} onBoardClick={handleBoardClick} />
        </div>
    );
};


export default CreateGrid;