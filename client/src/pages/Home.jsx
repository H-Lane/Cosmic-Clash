import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyGrid from '../components/EmptyGrid';
import Login from './Login'; // Assuming Login component handles both login and signup modes

const Home = () => {
    const [playermap, setPlayermap] = useState(Array(100).fill('O'));
    const [isLoginMode, setIsLoginMode] = useState(true); // Track login/signup mode

    const handleBoardClick = (index) => {
        console.log(`Cell ${index} clicked`);

        const updatedPlayermap = [...playermap];
        updatedPlayermap[index] = 'X';
        setPlayermap(updatedPlayermap);
    };

    const toggleLoginMode = () => {
        setIsLoginMode(!isLoginMode); // Toggle between login and signup modes
    };

    return (
        <div className="container">
            <header>
                <button onClick={toggleLoginMode}>
                    {isLoginMode ? 'Sign Up' : 'Log In'}
                </button>
            </header>

            {isLoginMode ? (
                <Login mode="login" /> // Pass 'login' mode to the Login component
            ) : (
                <Login mode="signup" /> // Pass 'signup' mode to the Login component
            )}

            {/* <EmptyGrid playermap={playermap} onBoardClick={handleBoardClick} /> */}
            <Link to="/CreateGrid">Create A Grid</Link>
        </div>
    );
};

export default Home;