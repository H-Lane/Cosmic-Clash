import React, { useState } from 'react'; // Import React and useState hook
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useQuery, useMutation } from '@apollo/client'; // Import useQuery and gql from Apollo Client
import EmptyGrid from '../components/EmptyGrid'; // Import the EmptyGrid component
import { GET_USER_GRIDS } from '../utils/queries';
import { JOIN_GAME, CREATE_GAME } from "../utils/mutations"

const Home = () => {
    // Initialize playermap state with an array of 100 cells filled with 'O'
    const [ships, setPlayermap] = useState(Array(100).fill('O'));

    // Example user ID, replace with actual user ID from context or props
    const userId = '12345';

    // Use Apollo Client's useQuery hook to fetch user grids
    const {loading, data} = useQuery(GET_USER_GRIDS);
   console.log(data)
   const [joinGame] = useMutation(JOIN_GAME);
    const [createGame] = useMutation(CREATE_GAME);
    
    // Function to handle play button click
    const handlePlay = async (gridId) => {
        try {
            // Attempt to join an existing game with the specified gridId
            const { data: joinData } = await joinGame({
                variables: { gridId },
            });

            // If the joinGame mutation returns data, handle it (game joined successfully)
            if (joinData.joinGame) {
                console.log('Game joined:', joinData.joinGame);
                // Additional logic for successfully joining a game can be added here
            } else {
                // If no game was found, create a new game
                console.log('No game found, creating a new game...');
                const { data: createData } = await createGame({
                    variables: { gridId }, // Pass necessary variables
                });
                console.log('New game created:', createData.createGame);
                // Additional logic for successfully creating a game can be added here
            }
        } catch (error) {
            console.error('Error joining/creating game:', error); // Handle any errors
        }
    };
   
    //LOADING & ERROR
    // // Conditional rendering based on the query state
    // if (loading) return <p>Loading...</p>; // Show loading message while fetching data
    // if (error) return <p>Error: {error.message}</p>; // Show error message if there is an error
   
    const handlePlacement = (e) => true

    return (
        <div className="container">

            {/* Navigation link to create a new grid */}
            <Link to="./creategrid">Create A Grid</Link>

            {/* Render EmptyGrid for each grid fetched from the server */}
            {data && data.grids.map((grid) => (
                <EmptyGrid 
                    key={grid._id} // Unique key for each grid item
                    ships={grid.ships} // Pass the ships data to each EmptyGrid
                    handlePlacement={handlePlacement} // Pass the handlePlacement function
                    gridId={grid._id} // Pass the unique gridId
                    onPlay={handlePlay} // Pass the handlePlay function as onPlay prop
                />
            ))}
        </div>
    );
};

export default Home;