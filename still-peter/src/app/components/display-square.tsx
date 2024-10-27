export default function DisplaySquare(props: any) {
  const stateClass = props.squareState ? "square-on" : "square-off";

  console.log(props.squareState);

  const btnStyle = {
    width: `calc(100% / ${props.numRows})`,
  };

  return (
    <div
      className="display-square-wrapper"
      key={props.squareKey}
      style={btnStyle}
    >
      <button
        disabled={true}
        className={"display-square " + stateClass}
      ></button>
    </div>
  );
}
