export default function Controls(props: any) {
    return (
      <div className="control-wrapper">
        <h1 className="title">Game of Life</h1>
        <div className="settings-wrapper">
          <button onClick={() => props.goClicked()}>go</button>
          <div className="flexSetting">
            <p>numRows:</p>
            <input
              type="number"
              min={0}
              max={100}
              value={props.numRows}
              onChange={(e) => props.numRowsChanged(e.target.value)}
            ></input>
          </div>
          <div className="flexSetting">
            <p>numRows:</p>
            <input
              type="number"
              min={0}
              max={100}
              value={props.numCols}
              onChange={(e) => props.numColsChanged(e.target.value)}
            ></input>
          </div>
        </div>
  
        <button onClick={() => props.randomise()}>randomise</button>
      </div>
    );
  }