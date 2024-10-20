export default function Controls(props: any) {
  const playClickedClass = props.playing ? "clicked-button" : "";
  return (
    <div className="control-wrapper">
      <h1 className="title">Game of Life</h1>
      <div className="settings-wrapper">
        <div className="scrub-wrapper">
          <button>
            <span className="material-symbols-outlined">first_page</span>
          </button>
          <button
            className={playClickedClass}
            onClick={() => props.setPlaying(!props.playing)}
          >
            <span className="material-symbols-outlined">play_pause</span>
          </button>
          <button onClick={() => props.goClicked()}>
            <span className="material-symbols-outlined">last_page</span>
          </button>
        </div>
        <div className="randomise-wrapper">
          <button onClick={() => props.randomise()}>
            <span className="material-symbols-outlined casino-logo-spacing">
              casino
            </span>
            Randomise
          </button>
        </div>

        <div className="row-col-controls-wrapper">
          <p id="row-para">Rows:</p>
          <input
            id="row-input"
            type="number"
            min={0}
            max={100}
            value={props.numRows}
            onChange={(e) => props.numRowsChanged(e.target.value)}
          ></input>
          <p id="col-para">Columns:</p>
          <input
            id="col-input"
            type="number"
            min={0}
            max={100}
            value={props.numCols}
            onChange={(e) => props.numColsChanged(e.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
}
