export default function DisplaySquare(props: any) {
  const stateClass = props.squareState ? "square-on" : "square-off";
  const btnStyle = {
    width: `calc(90% / ${props.numCols})`,
  };

  return (
    <div key={props.squareKey} style={btnStyle}>
      <div className={"display-square " + stateClass}></div>
    </div>
  );
}
