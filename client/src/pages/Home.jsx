import React, { useState } from 'react'; // Import React and useState hook
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useQuery } from '@apollo/client'; // Import useQuery and gql from Apollo Client
import EmptyGrid from '../components/EmptyGrid'; // Import the EmptyGrid component
import { GET_USER_GRIDS } from '../utils/queries';


const Home = () => {
    // Initialize playermap state with an array of 100 cells filled with 'O'
    const [ships, setPlayermap] = useState(Array(100).fill('O'));

    // Example user ID, replace with actual user ID from context or props
    const userId = '12345';

    // Use Apollo Client's useQuery hook to fetch user grids
    const {loading, data} = useQuery(GET_USER_GRIDS);
   console.log(data)
    //LOADING & ERROR
    // // Conditional rendering based on the query state
    // if (loading) return <p>Loading...</p>; // Show loading message while fetching data
    // if (error) return <p>Error: {error.message}</p>; // Show error message if there is an error
    const handlePlacement = (e) => true

    return (
        <div className="container">
            {/* Render the EmptyGrid component with initial ships, handlePlacement function, and a unique gridId */}
            {/* The gridId here is "empty", and this should correspond to an initial or default grid */}
            <EmptyGrid 
                ships={ships} 
                handlePlacement={handlePlacement} 
                gridId="empty" 
            />

            {/* Navigation link to create a new grid */}
            <Link to="./creategrid">Create A Grid</Link>

            {/* Display the grids fetched from the server */}
            {data && data.grids.map((grid) => (
                /* Render the EmptyGrid component for each grid with data fetched from the server */
                /* The key prop is necessary for React to efficiently update the list */
                <EmptyGrid 
                    key={grid._id} // Unique key for each grid item
                    ships={grid.ships} // Pass the ships data to the EmptyGrid component
                    handlePlacement={handlePlacement} // Pass the handlePlacement function to each grid
                    gridId={grid._id} // Pass the unique gridId to identify each grid
                />
            ))}
        </div>
    );
};

export default Home; // Export the Home component for use in other parts of the application