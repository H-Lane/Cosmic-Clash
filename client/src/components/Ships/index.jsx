const DisplayShips = ({ shipSetter, showShips }) => {
  //showShips is a string that contains all of the ships the user has yet to place

  return (
    <div>
      <ul>
        {showShips.includes("ship1") && (
          <li>
            <button
              data-name="ship1"
              data-size="5"
              onClick={shipSetter}
            > Carrier</button>
          </li>
        )}
        {showShips.includes("ship2") && (
          <li>
            <button
              data-name="ship2"
              data-size="4"
              onClick={shipSetter}
            > Battleship</button>
          </li>
        )}
        {showShips.includes("ship3") && (
          <li>
            <button
              data-name="ship3"
              data-size="3"
              onClick={shipSetter}
            > Destroyer</button>
          </li>
        )}
        {showShips.includes("ship4") && (
          <li>
            <button
              data-name="ship4"
              data-size="3"
              onClick={shipSetter}
            > Submarine</button>
          </li>
        )}
        {showShips.includes("ship5") && (
          <li>
            <button
              data-name="ship5"
              data-size="2"
              onClick={shipSetter}
            > Patrol</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DisplayShips;
