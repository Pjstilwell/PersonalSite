import { patternSquares } from "../resources/pattern-squares";
import { Patterns } from "../resources/Patterns";
import DisplaySquare from "./display-square";

type ControlProps = {
  goClicked: Function;
  backClicked: Function;
  numRows: number;
  numRowsChanged: Function;
  numCols: number;
  numColsChanged: Function;
  randomise: Function;
  clear: Function;
  playing: boolean;
  togglePlaying: Function;
  iterationsLength: number;
  activeCells: boolean;
  seqTerminated: boolean;
  patternSelected: boolean;
  selectedPattern: Patterns;
  patternSelectedActions: Function;
};

export default function Controls(props: ControlProps) {
  const playClickedClass = props.playing ? "clicked-button" : "";

  const overlay = props.patternSelected ? <div id="overlay"></div> : "";

  //Create list of patterns
  let patternList: any[] = [];
  const patternKeys = Object.keys(Patterns).filter((key) => isNaN(Number(key)));

  patternKeys.forEach((pattern) => {
    const selectedClass =
      props.selectedPattern == pattern ? "clicked-button" : "";
    patternList.push(
      <div key={pattern} className="pattern-wrapper">
        <button
          onClick={() => props.patternSelectedActions(pattern)}
          className={"pattern-button " + selectedClass}
        >
          <p>{pattern}</p>
        </button>
      </div>
    );
  });

  let displayedPattern: any[] = [];
  for (let i = 0; i < patternSquares[props.selectedPattern].size[1]; i++) {
    let row = [];

    for (let j = 0; j < patternSquares[props.selectedPattern].size[0]; j++) {
      let squareProps = {
        squareState: patternSquares[props.selectedPattern].squares.some(
          (square) => square[0] === i && square[1] === j
        ),
        numRows: patternSquares[props.selectedPattern].size[1],
        numCols: patternSquares[props.selectedPattern].size[0],
      };
      row.push(squareProps);
    }
    displayedPattern.push(
      <div className="display-grid-wrapper" key={i}>
        {row.map((val, index) => {
          return <DisplaySquare {...val} key={i + "-" + index} />;
        })}
      </div>
    );
  }

  return (
    <div className="control-wrapper">
      {overlay}
      <div className="title-wrapper">
        <h1 className="title">GAME OF LIFE</h1>
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
            disabled={!props.activeCells || props.seqTerminated}
            className={playClickedClass}
            onClick={() => props.togglePlaying()}
          >
            <span className="material-symbols-outlined">play_pause</span>
          </button>
          <button
            disabled={!props.activeCells || props.seqTerminated}
            onClick={() => props.goClicked()}
          >
            <span className="material-symbols-outlined">last_page</span>
          </button>
        </div>
        <div className="button-wrapper">
          <button disabled={props.playing} onClick={() => props.randomise()}>
            <span className="material-symbols-outlined casino-logo-spacing">
              casino
            </span>
            <p>Randomise</p>
          </button>
          <button
            disabled={!props.activeCells || props.playing}
            onClick={() => props.clear()}
          >
            <span className="material-symbols-outlined casino-logo-spacing">
              check_box_outline_blank
            </span>
            <p>Clear</p>
          </button>
        </div>

        <div className="row-col-controls-wrapper">
          <div className="flexy">
            <p id="row-para">Rows (1-100):</p>
          </div>
          <input
            id="row-input"
            type="number"
            min={0}
            max={100}
            value={props.numRows}
            onChange={(e) => props.numRowsChanged(e.target.value)}
          ></input>
          <div className="flexy">
            <p id="col-para">Columns (1-100):</p>
          </div>
          <input
            id="col-input"
            type="number"
            min={0}
            max={100}
            value={props.numCols}
            onChange={(e) => props.numColsChanged(e.target.value)}
          ></input>
        </div>
        <div className="add-patterns-text-wrapper">
          <p>Add Patterns</p>
        </div>
        <div className="patterns-wrapper">{patternList}</div>
      </div>
      <div className="pattern-display-wrapper">{displayedPattern}</div>
    </div>
  );
}
