import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <Link to="/creategrid">
                <button className="btn btn-primary">Create A Grid</button>
            </Link>
        </div>
    );
};

export default Home;