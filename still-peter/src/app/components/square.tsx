import { useEffect, useState } from "react";
import { Pattern } from "../resources/pattern-squares";

type SquareProps = {
  squareKey: string;
  stateInput: boolean;
  squareIndexRow: number;
  squareIndexCol: number;
  squareClicked?: (rowIndex: number, colIndex: number, newVal: boolean) => void;
  numRows: number;
  numCols: number;
  isPatternSelected?: boolean;
  selectedPattern?: Pattern;
  infoDialog: boolean;
};

export default function Square(props: SquareProps) {
  const [squareState, setSquareState] = useState<boolean | null>(null);

  useEffect(() => {
    setSquareState(props.stateInput);
  }, [props]);

  function squareClicked() {
    const newVal = !squareState;
    setSquareState(newVal);

    //tell Home square was clicked
    if (props.squareClicked)
      props.squareClicked(props.squareIndexRow, props.squareIndexCol, newVal);
  }

  //handle dynamic styling based on cell alive or dead
  const stateClass = squareState ? "square-on" : "square-off";

  //border width changes based on total number of rows and columns
  let borderWidth;
  if (props.numCols + props.numRows > 150) {
    borderWidth = "0.01rem";
  } else if (props.numCols + props.numRows > 100) {
    borderWidth = "0.05rem";
  } else if (props.numCols + props.numRows > 70) {
    borderWidth = "0.1rem";
  } else {
    borderWidth = "0.2rem";
  }

  /**
   * Checks if a square should be disabled based on the selected pattern
   * This prevents user selecting a grid position where the pattern would not fit
   * @returns
   */
  function checkDisabled(): boolean {
    if (props.selectedPattern != undefined) {
      //If pattern is selected and square is in a space where
      //the pattern doesn't fit then should be disabled
      return (
        (props.isPatternSelected &&
          (props.squareIndexCol + props.selectedPattern.size[0] >
            props.numCols ||
            props.squareIndexRow + props.selectedPattern.size[1] >
              props.numRows)) ??
        false
      );
    } else return true;
  }

  const buttonClass = props.infoDialog
    ? "square-button-info "
    : "square-button ";

  return (
    <div className="square-wrapper" key={props.squareKey + "-wrap"}>
      <button
        id={props.infoDialog ? "info-" + props.squareKey : props.squareKey}
        key={props.squareKey}
        className={buttonClass + stateClass}
        onClick={() => {
          if (squareClicked() != undefined) {
            squareClicked();
          }
        }}
        disabled={checkDisabled()}
      ></button>
    </div>
  );
}
