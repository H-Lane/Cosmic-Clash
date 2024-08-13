import React from 'react';
import PropTypes from 'prop-types';

// Functional component for a cell in a grid
export default function Cell(props) {
    const { style, onClick, status } = props;

    //create a function that adds a data id to each cell starting at 1-100 top left to bottom right

    // Render a cell with specified style, onClick function, and status
    return (
        <div style={{ width: '30px', height: '30px', display: 'inline-block', margin: '1px' }}>
            <button
                className={`btn btn-block ${style || ''}`} // Add style class if provided
                style={{ width: '30px', height: '30px', padding: 0, border: '1px solid transparent' }}
                onClick={onClick}
                data-position={props.dataPosition}
                
            >
                {status}
            </button>
        </div>
    );
}

// Define prop types for Cell component
Cell.propTypes = {
    style: PropTypes.string, // Style of the cell
    onClick: PropTypes.func.isRequired, // Click event handler for the cell
    status: PropTypes.string, // Status to display in the cell
};