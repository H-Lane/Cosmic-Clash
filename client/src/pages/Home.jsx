import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyGrid from '../components/EmptyGrid';


const Home = () => {
    // Initialize playermap state
    const [ships, setPlayermap] = useState(Array(100).fill('O'));

    // Event handler for board click
    const handleBoardClick = (index) => {
        console.log(`Cell ${index} clicked`);
        
        // Update ships state or trigger some action based on the index
        // For example, update the ships state to mark the cell as clicked
        const updatedPlayermap = [...ships];
        updatedPlayermap[index] = 'X';
        setPlayermap(updatedPlayermap);
    };

    return (
        <div className="container">
            
            <Link to="./creategrid" >Create A Grid</Link>

        </div>
    );
};

export default Home;