import { useEffect, useState } from "react";
import { Pattern } from "../resources/pattern-squares";

type SquareProps = {
  stateInput: boolean;
  squareIndexRow: number;
  squareIndexCol: number;
  squareClicked: (rowIndex: number, colIndex: number, newVal: boolean) => void;
  numRows: number;
  numCols: number;
  patternSelected: boolean;
  selectedPattern: Pattern;
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
    borderWidth: borderWidth,
    borderRadius: `${0.5 / ((props.numCols + props.numRows) / 20)}rem`,
  };

  return (
    <div className="square-wrapper" style={wrapStyle}>
      <button
        className={"square-button grid-square " + stateClass}
        style={btnStyle}
        onClick={() => {
          squareClicked();
        }}
        disabled={
          props.patternSelected &&
          (props.squareIndexCol + props.selectedPattern.size[0] >
            props.numCols ||
            props.squareIndexRow + props.selectedPattern.size[1] >
              props.numRows)
        }
      ></button>
    </div>
  );
}
