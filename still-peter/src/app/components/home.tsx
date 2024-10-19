"use client";
import { useEffect, useState } from "react";
import { GridFunctions } from "../grid-functions";
import Controls from "./controls";
import Grid from "./grid";

export default function Home() {
  const [numRows, setNumRows] = useState(5);
  const [numCols, setNumCols] = useState(5);
  const [iteration, setIteration] = useState(
    GridFunctions.initialiseZeroArray(numRows, numCols)
  );
  const [nextIteration, setNextIteration] = useState(
    GridFunctions.initialiseZeroArray(numRows, numCols)
  );

  useEffect(() => {
    const newIteration = GridFunctions.initialiseZeroArray(numRows, numCols);
    const newNextIteration = GridFunctions.initialiseZeroArray(
      numRows,
      numCols
    );

    setIteration(newIteration);
    setNextIteration(newNextIteration);
  }, [numRows, numCols]);

  function squareClicked(rowIndex: number, colIndex: number, newVal: boolean) {
    setNextIteration(
      GridFunctions.setStateOfPosition(
        rowIndex,
        colIndex,
        newVal,
        nextIteration
      )
    );
  }

  function goClicked() {
    let newIteration = GridFunctions.calculateNextIteration(
      nextIteration,
      numRows,
      numCols
    );
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
    let newIteration = GridFunctions.randomiseIteration(numRows, numCols);
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
    randomise,
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
