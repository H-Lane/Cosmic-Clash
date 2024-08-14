import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyGrid from '../components/EmptyGrid';
import Auth from './Auth'; // Import the Auth component

const Home = () => {
    const [ships, setPlayermap] = useState(Array(100).fill('O'));
    const [isAuthOpen, setIsAuthOpen] = useState(false); // State to control modal visibility

    const handleBoardClick = (index) => {
        console.log(`Cell ${index} clicked`);
        const updatedPlayermap = [...ships];
        updatedPlayermap[index] = 'X';
        setPlayermap(updatedPlayermap);
    };

    const toggleAuthModal = () => {
        setIsAuthOpen(!isAuthOpen); // Toggle modal visibility
    };

    return (
        <div className="container">
            <Link to="./creategrid">Create A Grid</Link>
            <button onClick={toggleAuthModal}>Login / Signup</button>
            {isAuthOpen && <Auth onClose={toggleAuthModal} />} {/* Render modal conditionally */}
        </div>
    );
};

export default Home;