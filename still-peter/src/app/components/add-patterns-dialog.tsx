import { Dialog, Tooltip } from "@mui/material";
import DisplaySquare from "./display-square";
import { patternGroups, Pattern } from "../resources/pattern-squares";
import "../../app/add-patterns-dialog.scss";

export type AddPatternsDialogProps = {
  patternsDialogOpen: boolean;
  openPatternsDialog: () => void;
  patternSelected: boolean;
  selectedPattern: Pattern;
  patternSelectedActions: (pattern: Pattern) => void;
  numRows: number;
  numCols: number;
};
export default function AddPatternsDialog(props: AddPatternsDialogProps) {
  const patternListWrapper: React.ReactNode[] = [];

  for (const group of patternGroups) {
    //Create list of patterns
    const patternList: React.ReactNode[] = [];
    for (const pattern of group.patterns) {
      const selectedClass =
        props.selectedPattern == pattern && props.patternSelected
          ? "clicked-button"
          : "";

      const disabled =
        pattern.size[0] > props.numCols || pattern.size[1] > props.numRows;

      if (disabled) {
        patternList.push(
          <Tooltip
            title="Grid too small to insert pattern"
            placement="right"
            key={"tt-" + pattern.patternName}
          >
            <span>
              <button
                key={pattern.patternName}
                className={"pattern-button " + selectedClass}
              >
                <p>{pattern.patternName}</p>

                <div className="display-grid-wrapper">
                  {createPattern(pattern, false)}
                </div>
              </button>
            </span>
          </Tooltip>
        );
      } else {
        patternList.push(
          <button
            key={pattern.patternName}
            onClick={() => props.patternSelectedActions(pattern)}
            className={"pattern-button " + selectedClass}
          >
            <p>{pattern.patternName}</p>

            <div className="display-grid-wrapper">
              {createPattern(pattern, false)}
            </div>
          </button>
        );
      }
    }
    patternListWrapper.push(
      <div key={group.groupName + "wrap"} className="pattern-group-wrapper">
        <p className="pattern-group-name">{group.groupName}</p>
        {patternList}
      </div>
    );
  }

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

  return (
    <Dialog open={props.patternsDialogOpen} className="dialog-style">
      <div className="dialog-wrapper">
        <div className="dialog-title-wrapper">
          <h1 className="dialog-title">Add Patterns</h1>
          <button onClick={() => props.openPatternsDialog()}>
            <span className="material-symbols-outlined">close</span>
            Close
          </button>
        </div>
        <p>Select a pattern below to add to the grid.</p>
        <div className="dialog-content">
          <div className="patterns-settings-wrapper">
            <div className="patterns-wrapper">{patternListWrapper}</div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
