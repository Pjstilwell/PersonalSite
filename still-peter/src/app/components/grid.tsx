import { Pattern } from "../resources/pattern-squares";
import Square from "./square";

type GridProps = {
  iteration: boolean[][];
  squareClicked?: (rowIndex: number, colIndex: number, newVal: boolean) => void;
  numRows: number;
  numCols: number;
  seqTerminated?: boolean;
  isPatternSelected?: boolean;
  selectedPattern?: Pattern;
  isInfoDialogGrid: boolean;
  isPlayingExample: boolean;
};

export default function Grid(props: GridProps) {
  const iteration = props.iteration;
  const wrapperClass = props.isInfoDialogGrid
    ? "info-page-wrapper"
    : "page-wrapper ";
  const seqTermClass = props.seqTerminated ? " flash-terminated" : "";
  const isPlayingClass = props.isPlayingExample ? " playing-example" : "";

  //Return Loading if iteration not initialised
  if (
    !iteration ||
    iteration.length === 0 ||
    !iteration[0] ||
    iteration[0].length === 0
  ) {
    return <div>Loading...</div>;
  }

  const rows = [];
  for (let i = 0; i < props.numRows; i++) {
    const row = [];

    //for every element in numCols create a Square in the current row,
    //give it a unique key
    for (let j = 0; j < props.numCols; j++) {
      const squareProps = {
        squareKey: i + "-" + j,
        stateInput: iteration[i][j],
        squareIndexRow: i,
        squareIndexCol: j,
        squareClicked: props.squareClicked,
        numRows: props.numRows,
        numCols: props.numCols,
        isPatternSelected: props.isPatternSelected,
        selectedPattern: props.selectedPattern,
        infoDialog: props.isInfoDialogGrid,
      };
      row.push(squareProps);
    }
    rows.push(
      <div
        className={"grid-wrapper" + isPlayingClass}
        key={i}
        style={{ height: `calc(100% / ${props.numRows})` }}
      >
        {row.map((val, index) => {
          return <Square {...val} key={i + "-" + index} />;
        })}
      </div>
    );
  }

  return <div className={wrapperClass + seqTermClass}>{rows}</div>;
}
