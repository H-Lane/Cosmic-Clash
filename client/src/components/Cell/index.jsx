import React from 'react';
import PropTypes from 'prop-types';

// Functional component for a cell in a grid
export default function Cell(props) {
    const { style, onClick, status } = props;

    // Render a cell with specified style, onClick function, and status
    return (
        <div style={{ width: '30px', height: '30px', display: 'inline-block', margin: '1px' }}>
            <button
                className={`btn btn-block ${style || ''}`} // Add style class if provided
                style={{ width: '100%', height: '100%', padding: 0, border: '1px solid #ccc' }}
                onClick={onClick}
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
    status: PropTypes.string.isRequired, // Status to display in the cell
};