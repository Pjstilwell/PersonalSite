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
  patternSelected?: boolean;
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

    //tell Home
    if (props.squareClicked)
      props.squareClicked(props.squareIndexRow, props.squareIndexCol, newVal);
  }

  const stateClass = squareState ? "square-on" : "square-off";

  const wrapStyle = {
    width: `calc(100% / ${props.numCols})`,
  };

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

  const btnStyle = {
    borderWidth: props.infoDialog ? "0.1rem" : borderWidth,
    borderRadius: props.infoDialog
      ? "0.1rem"
      : `${0.5 / ((props.numCols + props.numRows) / 20)}rem`,
  };

  function checkDisabled(): boolean {
    if (props.selectedPattern != undefined) {
      return (
        (props.patternSelected &&
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
    <div
      className="square-wrapper"
      style={wrapStyle}
      key={props.squareKey + "-wrap"}
    >
      <button
        id={props.infoDialog ? "info-" + props.squareKey : props.squareKey}
        key={props.squareKey}
        className={buttonClass + stateClass}
        style={btnStyle}
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
