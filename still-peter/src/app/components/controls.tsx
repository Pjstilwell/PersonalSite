export default function Controls(props: any) {
  const playClickedClass = props.playing ? "clicked-button" : "";
  return (
    <div className="control-wrapper">
      <div className="title-wrapper">
        <h1 className="title pixelify-sans-ps">GAME OF LIFE</h1>
      </div>

      <div className="settings-wrapper">
        <div className="scrub-wrapper">
          <button
            disabled={props.iterationsLength < 2}
            onClick={() => props.backClicked()}
          >
            <span className="material-symbols-outlined">first_page</span>
          </button>
          <button
            className={playClickedClass}
            onClick={() => props.togglePlaying()}
          >
            <span className="material-symbols-outlined">play_pause</span>
          </button>
          <button onClick={() => props.goClicked()}>
            <span className="material-symbols-outlined">last_page</span>
          </button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => props.randomise()}>
            <span className="material-symbols-outlined casino-logo-spacing">
              casino
            </span>
            <p className="pixelify-sans-ps">Randomise</p>
          </button>
          <button onClick={() => props.clear()}>
            <span className="material-symbols-outlined casino-logo-spacing">
              check_box_outline_blank
            </span>
            <p className="pixelify-sans-ps">Clear</p>
          </button>
        </div>

        <div className="row-col-controls-wrapper">
          <div className="flexy">
            <p id="row-para" className="pixelify-sans-ps">
              Rows:
            </p>
          </div>
          <input
            id="row-input"
            type="number"
            className="pixelify-sans-ps"
            min={0}
            max={100}
            value={props.numRows}
            onChange={(e) => props.numRowsChanged(e.target.value)}
          ></input>
          <div className="flexy">
            <p id="col-para" className="pixelify-sans-ps">
              Columns:
            </p>
          </div>

          <input
            id="col-input"
            type="number"
            className="pixelify-sans-ps"
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
