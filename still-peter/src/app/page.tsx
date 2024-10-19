"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GridIteration } from "./gridIteration";
import { randomInt } from "crypto";

export default function Home() {
  const [numRows, setNumRows] = useState(6);
  const [numCols, setNumCols] = useState(5);
  const [iteration, setIteration] = useState(
    initialiseZeroArray(numRows, numCols)
  );
  const [nextIteration, setNextIteration] = useState(
    initialiseZeroArray(numRows, numCols)
  );

  useEffect(() => {
    const newIteration = initialiseZeroArray(numRows, numCols);
    const newNextIteration = initialiseZeroArray(numRows, numCols);
    
    setIteration(newIteration);
    setNextIteration(newNextIteration);
  }, [numRows, numCols]);

  function squareClicked(rowIndex: number, colIndex: number, newVal: boolean) {
    setNextIteration(
      setStateOfPosition(rowIndex, colIndex, newVal, nextIteration)
    );
  }

  function goClicked() {
    let newIteration = calculateNextIteration(nextIteration, numRows, numCols);
    setNextIteration(newIteration);
    setIteration(newIteration);
  }

  function numRowsChanged(val: string) {
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal)) {
      setNumRows(numVal);
    }
  }

  function numColsChanged(val: string) {
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal)) {
      setNumCols(numVal);
    }
  }

  function randomise() {
    let newIteration = randomiseIteration(numRows, numCols);
    setNextIteration(newIteration);
    setIteration(newIteration);
  }

  let props = {
    iteration: iteration,
    squareClicked,
    numRows: numRows,
    numCols: numCols,
  };

  let controlProps = {
    goClicked,
    numRows: numRows,
    numRowsChanged,
    numCols: numCols,
    numColsChanged,
    randomise
  };

  return (
    <div className="home-wrapper">
      <Controls {...controlProps} />
      {iteration.length === numRows && iteration[0]?.length === numCols ? (
        <Grid {...props} />
      ) : (
        <div>Loading Grid...</div>
      )}
    </div>
  );
}

function Grid(props: any) {
  let iteration = props.iteration;

  // Add defensive checks
  if (!iteration || iteration.length === 0 || !iteration[0] || iteration[0].length === 0) {
    return <div>Loading...</div>; 
  }

  let rows = [];
  for (let i = 0; i < props.numRows; i++) {
    let row = [];

    //for every element in numCols create a Square in the current row,
    //give it a unique key
    for (let j = 0; j < props.numCols; j++) {
      let squareProps = {
        squareKey: i + "-" + j,
        stateInput: iteration[i][j],
        squareIndexRow: i,
        squareIndexCol: j,
        squareClicked: props.squareClicked,
        numRows: props.numRows,
        numCols: props.numCols
      };
      row.push(squareProps);
    }
    rows.push(
      <div className="grid-wrapper" key={i} style={{ height: `calc(100% / ${props.numRows})`}}>
        {row.map((val, index) => {
          return <Square {...val} key={i + "-" + index} />;
        })}
      </div>
    );
  }

  return <div className="page-wrapper">{rows}</div>;
}

function Controls(props: any) {
  return (
    <div className="control-wrapper">
      <h1 className="title">Game of Life</h1>
      <div className="settings-wrapper"><button onClick={() => props.goClicked()}>go</button>
      <div className="flexSetting"><p>numRows:</p>
      <input
        type="number"
        min={0}
        max={100}
        value={props.numRows}
        onChange={(e) => props.numRowsChanged(e.target.value)}
      ></input></div>
      <div className="flexSetting"><p>numRows:</p>
      <input
        type="number"
        min={0}
        max={100}
        value={props.numCols}
        onChange={(e) => props.numColsChanged(e.target.value)}
      ></input></div>
      </div>
      
      

<button onClick={() => props.randomise()}>randomise</button>
    </div>
  );
}

function Square(props: any) {
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

  return (
    <div className="square-wrapper" key={props.squareKey} style={{ width: `calc(100% / ${props.numCols})`}}>
      <button
        className="square-button"
        style={{ backgroundColor: squareState ? "black" : "white" }}
        onClick={() => {
          squareClicked();
        }}
      ></button>
    </div>
  );
}

function initialiseZeroArray(numRows: any, numCols: any) {
  return createIterationArray(numRows, numCols);
}

function createIterationArray(numRows: number, numCols: number): boolean[][] {
  let iteration: boolean[][] = [];

  for (let i = 0; i < numRows; i++) {
    iteration[i] = Array(numCols).fill(false);
  }

  return iteration;
}

function setStateOfPosition(
  rowIndex: number,
  colIndex: number,
  state: boolean,
  newIteration: boolean[][]
) {
  newIteration[rowIndex][colIndex] = state;
  return newIteration;
}

function calculateNextIteration(
  currentIteration: boolean[][],
  numRows: number,
  numCols: number
): boolean[][] {
  const ci = takeMatrixCopy(currentIteration);
  let nextIteration = takeMatrixCopy(currentIteration);

  /**
   * Any live cell with fewer than two live neighbours dies, as if by underpopulation.
   * Any live cell with two or three live neighbours lives on to the next generation.
   * Any live cell with more than three live neighbours dies, as if by overpopulation.
   * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
   */
  for (let i: number = 0; i < numRows; i++) {
    for (let j: number = 0; j < numCols; j++) {
      let numLiveNeighbours = 0;
      if (i != numRows - 1 && j != numCols - 1 && ci[i + 1][j + 1])
        numLiveNeighbours++;
      if (i != numRows - 1 && ci[i + 1][j]) numLiveNeighbours++;
      if (i != numRows - 1 && j != 0 && ci[i + 1][j - 1]) numLiveNeighbours++;
      if (i != 0 && j != numCols - 1 && ci[i - 1][j + 1]) numLiveNeighbours++;
      if (i != 0 && ci[i - 1][j]) numLiveNeighbours++;
      if (i != 0 && j != 0 && ci[i - 1][j - 1]) numLiveNeighbours++;
      if (j != numCols - 1 && ci[i][j + 1]) numLiveNeighbours++;
      if (j != 0 && ci[i][j - 1]) numLiveNeighbours++;

      if (ci[i][j]) {
        if (numLiveNeighbours < 2) nextIteration[i][j] = !nextIteration[i][j];
        if (numLiveNeighbours > 3) nextIteration[i][j] = !nextIteration[i][j];
      } else {
        if (numLiveNeighbours == 3) nextIteration[i][j] = !nextIteration[i][j];
      }

      console.log(
        "i: " + i + " j: " + j + " liveneighbours: " + numLiveNeighbours + " was: " + ci[i][j] + " now: " + nextIteration[i][j]
      );
    }
  }

  console.log(ci);
  console.log(nextIteration);

  return nextIteration;
}

function takeMatrixCopy(input: boolean[][]): boolean[][] {
  let output: boolean[][] = [];

  for (let i = 0; i < input.length; i++) {
    output[i] = [];
    for (let j = 0; j < input[i].length; j++) {
      output[i][j] = input[i][j];
    }
  }

  return output;
}

function randomiseIteration(numRows: number, numCols: number): boolean[][] {
  let iteration: boolean[][] = [];

  for (let i = 0; i < numRows; i++) {
    iteration[i] = [];
    for (let j = 0; j < numCols; j++) {
      iteration[i][j] = Math.random() < 0.5;
    }
  }

  return iteration;
}
