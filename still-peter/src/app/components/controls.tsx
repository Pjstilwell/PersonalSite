import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import DisplaySquare from "./display-square";
import { Pattern } from "../resources/pattern-squares";

export type ControlProps = {
  goClicked: () => void;
  backClicked: () => void;
  numRows: number;
  numRowsChanged: (num: string) => void;
  numCols: number;
  numColsChanged: (num: string) => void;
  randomise: () => void;
  clear: () => void;
  isPlaying: boolean;
  togglePlaying: () => void;
  iterationsLength: number;
  activeCells: boolean;
  isSeqTerminated: boolean;
  isPatternSelected: boolean;
  selectedPattern: Pattern;
  patternSelectedActions: (pattern: Pattern) => void;
  openPatternsDialog: () => void;
  openInfoDialog: () => void;
  terminateSequence: boolean;
  toggleTerminateSequence: () => void;
};

export default function Controls(props: ControlProps) {
  console.log(props);
  const playClickedClass = props.isPlaying ? "clicked-button" : "";

  function createPattern(pattern: Pattern, applyingPatternStyle: boolean) {
    const displayedPattern: React.ReactNode[] = [];

    for (let i = 0; i < pattern.size[1]; i++) {
      const row = [];

      for (let j = 0; j < pattern.size[0]; j++) {
        const squareProps = {
          squareState: pattern.pattern[i][j],
          numRows: pattern.size[1],
          numCols: pattern.size[0],
          applyingPatternStyle,
        };
        row.push(squareProps);
      }
      displayedPattern.push(
        <div
          className="display-grid-row-wrapper"
          key={i}
          style={{ height: `${100 / pattern.size[1]}%` }}
        >
          {row.map((val, index) => {
            return <DisplaySquare {...val} key={i + "-" + index} />;
          })}
        </div>
      );
    }

    return displayedPattern;
  }

  if (props.isPatternSelected) {
    console.log("here");
    const applyingPattern = createPattern(props.selectedPattern, true);
    return (
      <div className="add-pattern-wrapper">
        <h1 className="add-pattern-title">Add Pattern to Grid</h1>
        <div className="add-pattern-arrow">
          <span className="material-symbols-outlined">arrow_forward</span>
        </div>
        <h1>Currently Applying:</h1>
        <h1>{props.selectedPattern.patternName}</h1>
        <div className="applying-pattern-wrapper">{applyingPattern}</div>
        <div className="cancel-wrap">
          <button>
            <span className="material-symbols-outlined">close</span>Cancel
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="control-wrapper">
        <Tooltip title="Info">
          <button onClick={() => props.openInfoDialog()}>
            <span className="material-symbols-outlined">info</span>
          </button>
        </Tooltip>
        <div className="title-wrapper">
          <h1 className="title">GAME OF LIFE</h1>
        </div>

        <div className="scrub-wrapper">
          <Tooltip title={"Back Step"}>
            <span>
              <button
                disabled={props.iterationsLength < 2}
                onClick={() => props.backClicked()}
              >
                <span className="material-symbols-outlined">first_page</span>
              </button>
            </span>
          </Tooltip>
          <Tooltip title={"Play/Pause"}>
            <span>
              <button
                disabled={!props.activeCells || props.isSeqTerminated}
                className={playClickedClass}
                onClick={() => props.togglePlaying()}
              >
                <span className="material-symbols-outlined">play_pause</span>
              </button>
            </span>
          </Tooltip>
          <Tooltip title={"Next Step"}>
            <span>
              <button
                disabled={!props.activeCells || props.isSeqTerminated}
                onClick={() => props.goClicked()}
              >
                <span className="material-symbols-outlined">last_page</span>
              </button>
            </span>
          </Tooltip>
        </div>
        <div className="button-wrapper">
          <Tooltip title={"Randomise Grid"}>
            <span>
              <button
                disabled={props.isPlaying}
                onClick={() => props.randomise()}
              >
                <span className="material-symbols-outlined casino-logo-spacing">
                  casino
                </span>
                <p>Randomise</p>
              </button>
            </span>
          </Tooltip>
          <Tooltip title={"Empty Grid"}>
            <span>
              <button
                disabled={!props.activeCells || props.isPlaying}
                onClick={() => props.clear()}
              >
                <span className="material-symbols-outlined casino-logo-spacing">
                  check_box_outline_blank
                </span>
                <p>Clear</p>
              </button>
            </span>
          </Tooltip>
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
        <div className="button-wrapper">
          <Tooltip title="Pick a pattern to add to the grid">
            <button onClick={() => props.openPatternsDialog()}>
              <span className="material-symbols-outlined casino-logo-spacing">
                rocket_launch
              </span>
              Add Patterns
            </button>
          </Tooltip>
        </div>
        <div className="flexy-info" style={{ marginTop: "1rem" }}>
          <Tooltip title="Terminate sequence if sequence is repeating">
            <FormControlLabel
              control={
                <Checkbox
                  value={props.terminateSequence}
                  onChange={() => props.toggleTerminateSequence()}
                  id="toggle-term-seq"
                ></Checkbox>
              }
              label="Terminate Sequence"
            />
          </Tooltip>
        </div>
      </div>
    );
  }
}
