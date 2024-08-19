
const getButtonSize = (size) => {
  switch(size) {
    case '5':
      return { width: '160px', height: '40px' }; // Large button
    case '4':
      return { width: '150px', height: '40px' }; // Medium button
    case '3':
      return { width: '140px', height: '40px' }; // Small button
    case '2':
      return { width: '130px', height: '40px' }; // Extra small button
    default:
      return { width: '120px', height: '40px' }; // Default size
  }
};



const DisplayShips = ({ shipSetter, showShips }) => {
  //showShips is a string that contains all of the ships the user has yet to place

 
  
  return (
    <div>
      <ul className="uk-list">
        {showShips.includes("ship1") && (
          <li>
            <button
              className="uk-button"
              data-name="ship1"
              data-size="5"
              onClick={shipSetter}
              style={{
                ...getButtonSize('5'),
                backgroundColor: 'gray',
                color: 'gold',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Ship 1
            </button>
          </li>
        )}
        {showShips.includes("ship2") && (
          <li>
            <button
              className="uk-button"
              data-name="ship"
              data-size="4"
              onClick={shipSetter}
              style={{
                ...getButtonSize('4'),
                backgroundColor: 'gray',
                color: 'gold',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Ship 2
            </button>
          </li>
        )}
        {showShips.includes("ship3") && (
          <li>
            <button
              className="uk-button"
              data-name="ship3"
              data-size="3"
              onClick={shipSetter}
              style={{
                ...getButtonSize('3'),
                backgroundColor: 'gray',
                color: 'gold',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Ship 3
            </button>
          </li>
        )}
        {showShips.includes("ship4") && (
          <li>
            <button
              className="uk-button"
              data-name="ship4"
              data-size="3"
              onClick={shipSetter}
              style={{
                ...getButtonSize('3'),
                backgroundColor: 'gray',
                color: 'gold',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Ship 4
            </button>
          </li>
        )}
        {showShips.includes("ship5") && (
          <li>
            <button
              className="uk-button"
              data-name="ship5"
              data-size="2"
              onClick={shipSetter}
              style={{
                ...getButtonSize('2'),
                backgroundColor: 'gray',
                color: 'gold',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Ship 5
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DisplayShips;