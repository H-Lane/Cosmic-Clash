import React, { useState } from 'react';
import EmptyGrid from '../components/EmptyGrid';
import { useMutation } from '@apollo/client';
import { createGrid } from '../utils/mutations'

function generateGrid(props) {

    const [shipState, setShipState] = useState({ shipName: '', position: '' });
    const [createGrid] = useMutation(CREATE_GRID);

    const handleShipSave = async (event) => {
        event.preventDefault();
        const mutationResponse = await createGrid({
            variables: {
                
            }
        });
    };


    return (
        <div className="grid-container">
            <EmptyGrid></EmptyGrid>
            <button onClick={handleShipSave}>Save Ship Layout</button>
        </div>
    )
}