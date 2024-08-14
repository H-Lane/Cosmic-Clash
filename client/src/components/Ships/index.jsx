const DisplayShips = ({shipSetter}) => {


  return (
    <div>
      <ul>
        <li>
          <button data-name="ship1" data-size="5" onClick={shipSetter}></button>
        </li>
        <li>
          <button data-name="ship2" data-size="4" onClick={shipSetter}></button>
        </li>
        <li>
          <button data-name="ship3" data-size="3" onClick={shipSetter}></button>
        </li>
        <li>
          <button data-name="ship4" data-size="3" onClick={shipSetter}></button>
        </li>
        <li>
          <button data-name="ship5" data-size="2" onClick={shipSetter}></button>
        </li>
      </ul>
    </div>
  );
};

export default DisplayShips;
