type DisplaySquareProps = {
  squareState: boolean;
  numRows: number;
  numCols: number;
  applyingPatternStyle: boolean;
};

export default function DisplaySquare(props: DisplaySquareProps) {
  const stateClass = props.squareState ? "square-on" : "square-off";
  const btnStyle = {
    width: `calc(100% / ${props.numCols})`,
  };
  const childDivStyle = props.applyingPatternStyle
    ? {
        borderRadius:
          props.numRows > 8 || props.numCols > 8 ? "0.3rem" : "1rem",
        borderWidth:
          props.numRows > 8 || props.numCols > 8 ? "0.05rem" : "0.2em",
      }
    : {
        borderRadius:
          props.numRows > 8 || props.numCols > 8 ? "0.1rem" : "0.15rem",
        borderWidth:
          props.numRows > 8 || props.numCols > 8 ? "0.05rem" : "0.05rem",
      };

  return (
    <div style={btnStyle}>
      <div
        style={childDivStyle}
        className={"display-square " + stateClass}
      ></div>
    </div>
  );
}
