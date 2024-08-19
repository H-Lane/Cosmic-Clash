import React, { useState, useEffect } from "react"; // Import React and useState hook
import { Link, Navigate } from "react-router-dom"; // Import Link for navigation
import { useQuery, useMutation, useLazyQuery } from "@apollo/client"; // Import useQuery and gql from Apollo Client
import EmptyGrid from "../components/EmptyGrid"; // Import the EmptyGrid component
import { GET_USER_GRIDS, GET_GAME } from "../utils/queries";
import { JOIN_GAME, CREATE_GAME } from "../utils/mutations";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../../node_modules/uikit/dist/css/uikit.css";
import "../../node_modules/uikit/dist/js/uikit.min.js";
const Home = () => {
  // Initialize playermap state with an array of 100 cells filled with 'O'
  const [ships, setPlayermap] = useState(Array(100).fill("O"));

  // Use Apollo Client's useQuery hook to fetch user grids
  const { loading, data } = useQuery(GET_USER_GRIDS);
  console.log(data);
  const [joinGame] = useMutation(JOIN_GAME);
  const [createGame] = useMutation(CREATE_GAME);
  const [getGame, { data: gameData }] = useLazyQuery(GET_GAME);
  const [gameDataUpdated, setGameDataUpdated] = useState(false);
  let playerJoined;

  // useEffect(() => {
  //   console.log(gameData);
  //   const handleGameData = () => {
  //     console.log(gameData);
  //     //console.log(gameData.game._id);
  //     if (gameData && gameData.game) {
  //       const { playerTwo, _id } = gameData.game;
  //       if (!playerTwo) {
  //         console.log("No Opponent Found");
  //       } else {
  //         console.log("Opponent Found!");
  //         <Navigate to={`./battle/${_id}`} />
  //       }
  //     }
  //   };
  //   if (gameDataUpdated) {
  //     handleGameData();
  //     setGameDataUpdated(false);
  //   } else {
  //     handleGameData();
  //     setGameDataUpdated(true);
  //   }
  // }, [gameData, gameDataUpdated]);

  // useEffect(() => {
  //   if (gameData) {
  //     setGameDataUpdated(true);
  //   }
  // }, [gameData]);

  // Function to handle play button click
  const handlePlay = async (gridId) => {
    try {
      // Attempt to join an existing game with the specified gridId
      const { data: joinData } = await joinGame({
        variables: { gridId },
      });

      // If the joinGame mutation returns data, handle it (game joined successfully)
      if (joinData.joinGame) {
        console.log("Game joined:", joinData.joinGame);
        const gameId = joinData.joinGame._id;
        <Navigate to={`./battle/${gameId}`} />
        // Additional logic for successfully joining a game can be added here
      } else {
        // If no game was found, create a new game
        console.log("No game found, creating a new game...");
        const { data: createData } = await createGame({
          variables: { gridId }, // Pass necessary variables
        });
        console.log("New game created:", createData.createGame);
        const gameId = createData.createGame._id;

        playerJoined = setInterval(() => searchForOpp(gameId), 3000);

        // Additional logic for successfully creating a game can be added here
      }
    } catch (error) {
      console.error("Error joining/creating game:", error); // Handle any errors
    }
  };

  const searchForOpp = async (gameId) => {
    console.log(gameId);
    const gameHolder = await getGame({ variables: { gameId } });
    console.log(gameHolder)
    console.log(gameHolder.data.game.playerTwo)
    if (gameHolder.data.game.playerTwo) {
      clearInterval(playerJoined);
      <Navigate to={`./battle/${gameId}`} />
    }
  };

  const redirect = (gameId) => {
    window.location.href = `./battle/${gameId}`;
  };

  //LOADING & ERROR
  // // Conditional rendering based on the query state
  // if (loading) return <p>Loading...</p>; // Show loading message while fetching data
  // if (error) return <p>Error: {error.message}</p>; // Show error message if there is an error

  const handlePlacement = (e) => true;

  return (
    <div className="container">
    <img
    src="\src\assets\gal.PNG"  
    alt="Background"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -1, // Ensure it stays behind other content
    }}
    />
      {/* Navigation link to create a new grid */}
      <Link to="./creategrid">Create A Grid</Link>

      {/* Render EmptyGrid for each grid fetched from the server */}
      {data &&
        data.grids.map((grid) => (
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
