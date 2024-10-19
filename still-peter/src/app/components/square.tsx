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

  return (
    <div
      className="square-wrapper"
      key={props.squareKey}
      style={{ width: `calc(100% / ${props.numCols})` }}
    >
      <button
        className={"square-button " + stateClass}
        onClick={() => {
          squareClicked();
        }}
      ></button>
    </div>
  );
}
