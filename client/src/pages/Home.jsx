import React, { useState } from 'react'; // Import React and useState hook
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useQuery, gql } from '@apollo/client'; // Import useQuery and gql from Apollo Client
import EmptyGrid from '../components/EmptyGrid'; // Import the EmptyGrid component
import { GET_USER_GRIDS } from '../utils/queries';


const Home = () => {
    // Initialize playermap state with an array of 100 cells filled with 'O'
    const [ships, setPlayermap] = useState(Array(100).fill('O'));

    // Example user ID, replace with actual user ID from context or props
    const userId = '12345';

    // Use Apollo Client's useQuery hook to fetch user grids
    const userGrids = useQuery(GET_USER_GRIDS);

    // // Conditional rendering based on the query state
    // if (loading) return <p>Loading...</p>; // Show loading message while fetching data
    // if (error) return <p>Error: {error.message}</p>; // Show error message if there is an error

    return (
        <div className="container">
            {/* Render the EmptyGrid component and pass the userId as children */}
            <EmptyGrid userGrid={userGrid}></EmptyGrid>
            
            {/* Navigation link to create a new grid */}
            <Link to="./creategrid">Create A Grid</Link>

            {/* Display user's grids */}
            <div className="user-grids">
                {data.getUserGrids.map((grid) => (
                    <div key={grid.id} className="grid">
                        {/* Render each grid; customize this based on your grid structure */}
                        {grid.cells.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className={`cell ${cell === 'X' ? 'hit' : ''}`}
                                onClick={() => handleBoardClick(cellIndex)}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home; // Export the Home component
