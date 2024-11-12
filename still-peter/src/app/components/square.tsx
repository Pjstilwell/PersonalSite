import { useEffect, useState } from "react";

export default function Square(props: any) {
  const [squareState, setSquareState] = useState<boolean | null>(null);

  useEffect(() => {
    setSquareState(props.stateInput);
  }, [props]);

  function squareClicked() {
    let newVal = !squareState;
    setSquareState(newVal);

    //tell Home
    props.squareClicked(props.squareIndexRow, props.squareIndexCol, newVal);
  }

  const stateClass = squareState ? "square-on" : "square-off";

  const wrapStyle = {
    width: `calc(100% / ${props.numCols})`,
  };

  let borderWidth;
  let borderRadius;
  if (props.numCols + props.numRows > 150) {
    borderWidth = "0.01rem";
    borderRadius = "0.01rem";
  } else if (props.numCols + props.numRows > 100) {
    borderWidth = "0.05rem";
    borderRadius = "0.1rem";
  } else if (props.numCols + props.numRows > 70) {
    borderWidth = "0.1rem";
    borderRadius = "0.25rem";
  } else {
    borderWidth = "0.2rem";
    borderRadius = "0.5rem";
  }

  const btnStyle = {
    borderWidth: borderWidth,
    borderRadius: `${0.5 / ((props.numCols + props.numRows) / 20)}rem`,
  };

  return (
    <div className="square-wrapper" key={props.squareKey} style={wrapStyle}>
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
