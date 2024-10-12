'use client';
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  let numRows: number = 5;
  let numCols: number = 5;

  let iteration = createIterationArray(numRows, numCols);

  const squareClickedParent = (squareIndexRow: number, squareIndexCol: number) => {
    console.log(squareIndexRow);
    console.log(squareIndexCol);
  };

  let rows = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      let props = {
        squareKey: i + '-' + j,
        stateInput: iteration[i][j],
        squareClickedParent: squareClickedParent,
        squareIndexRow: i,
        squareIndexCol: j,
      };
      const key = i + '-' + j;
      row.push(<Square {...props}/>);
    }
    rows.push(<div className="grid-wrapper" key={i}>{row}</div>);
  }

  return <div className="page-wrapper">{rows}</div>;
}

function Square(props: any) {
    const [state, setState] = useState(props.stateInput);

    function squareClicked() {
      setState(!state);
    }

    return (
      <div className="square-wrapper" key={props.squareKey}>
        <button
          className="square-button"
          style={{ backgroundColor: state ? "black" : "white" }}
          onClick={() => {props.squareClickedParent(props.squareIndexRow, props.squareIndexCol); squareClicked()}
          }
        ></button>
      </div>
    );
  }

function createIterationArray(numRows: number, numCols: number): boolean[][] {
  let iteration: boolean[][] = [];
  let iterationRow: boolean[] = [];

  for (let i = 0; i < numCols; i++) {
    iterationRow.push(false);
  }

  for (let i = 0; i < numRows; i++) {
    iteration.push(iterationRow);
  }

  return iteration;
}
