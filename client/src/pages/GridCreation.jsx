import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { createGrid } from '../utils/queries';
import { EmptyGrid } from '../components'

function setGrid(props) {
    return <EmptyGrid
    playermap={playermap}
    onBoardClick={onBoardClick}
    ></EmptyGrid>
};

export default setGrid;

