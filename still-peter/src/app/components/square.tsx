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

  const btnStyle = {
    borderWidth: props.numCols + props.numRows > 70 ? "0.1rem" : "0.2rem",
    borderRadius: `${1.5 / ((props.numCols + props.numRows) / 20)}rem`,
  };

  return (
    <div className="square-wrapper" key={props.squareKey} style={wrapStyle}>
      <button
        className={"square-button " + stateClass}
        style={btnStyle}
        onClick={() => {
          squareClicked();
        }}
      ></button>
    </div>
  );
}
