import { Tooltip } from "@mui/material";
import { patternGroups, Pattern } from "../resources/pattern-squares";
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
  selectedPattern: Pattern;
  patternSelectedActions: Function;
};

export default function Controls(props: ControlProps) {
  const playClickedClass = props.playing ? "clicked-button" : "";

  const patternSelectedOverlay = props.patternSelected ? (
    <div id="overlay"></div>
  ) : (
    ""
  );

  const patternListWrapper: any[] = [];

  for (let group of patternGroups) {
    //Create list of patterns
    let patternList: any[] = [];
    for (let pattern of group.patterns) {
      const selectedClass =
        props.selectedPattern == pattern && props.patternSelected
          ? "clicked-button"
          : "";

      const disabled =
        pattern.size[0] > props.numCols || pattern.size[1] > props.numRows;

      patternList.push(
        <Tooltip
          title={disabled ? "Grid too small to insert pattern" : ""}
          placement="right"
        >
          <button
            key={pattern.patternName}
            onClick={() => props.patternSelectedActions(pattern)}
            className={"pattern-button " + selectedClass}
            disabled={disabled}
          >
            <p>{pattern.patternName}</p>

            <div className="display-grid-wrapper">
              {createPattern(pattern, false)}
            </div>
          </button>
        </Tooltip>
      );
    }
    patternListWrapper.push(
      <div>
        <p className="pattern-group-name">{group.groupName}</p>
        {patternList}
      </div>
    );
  }

  function createPattern(pattern: Pattern, applyingPatternStyle: boolean) {
    let displayedPattern: any[] = [];

    for (let i = 0; i < pattern.size[1]; i++) {
      let row = [];

      for (let j = 0; j < pattern.size[0]; j++) {
        let squareProps = {
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

  if (props.patternSelected) {
    let applyingPattern = createPattern(props.selectedPattern, true);
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
        <div className="settings-big-wrapper">
          <div className="title-wrapper">
            <h1 className="title">GAME OF LIFE</h1>
          </div>

          <div className="scrub-wrapper">
            <Tooltip title={"Back Step"}>
              <button
                disabled={props.iterationsLength < 2}
                onClick={() => props.backClicked()}
              >
                <span className="material-symbols-outlined">first_page</span>
              </button>
            </Tooltip>
            <Tooltip title={"Play/Pause"}>
              <button
                disabled={!props.activeCells || props.seqTerminated}
                className={playClickedClass}
                onClick={() => props.togglePlaying()}
              >
                <span className="material-symbols-outlined">play_pause</span>
              </button>
            </Tooltip>
            <Tooltip title={"Next Step"}>
              <button
                disabled={!props.activeCells || props.seqTerminated}
                onClick={() => props.goClicked()}
              >
                <span className="material-symbols-outlined">last_page</span>
              </button>
            </Tooltip>
          </div>
          <div className="button-wrapper">
            <Tooltip title={"Randomise Grid"}>
              <button
                disabled={props.playing}
                onClick={() => props.randomise()}
              >
                <span className="material-symbols-outlined casino-logo-spacing">
                  casino
                </span>
                <p>Randomise</p>
              </button>
            </Tooltip>
            <Tooltip title={"Empty Grid"}>
              <button
                disabled={!props.activeCells || props.playing}
                onClick={() => props.clear()}
              >
                <span className="material-symbols-outlined casino-logo-spacing">
                  check_box_outline_blank
                </span>
                <p>Clear</p>
              </button>
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
        </div>
        <div className="patterns-settings-wrapper">
          <div className="add-patterns-text-wrapper">
            <p>Add Patterns</p>
          </div>
          <div className="patterns-wrapper">{patternListWrapper}</div>
        </div>
      </div>
    );
  }
}
