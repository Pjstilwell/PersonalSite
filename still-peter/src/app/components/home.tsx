"use client";
import { useEffect, useRef, useState } from "react";
import { GridFunctions } from "../grid-functions";
import Controls from "./controls";
import Grid from "./grid";

export default function Home() {
  const [numRows, setNumRows] = useState(10);
  const [numCols, setNumCols] = useState(10);
  const [iteration, setIteration] = useState(
    GridFunctions.initialiseZeroArray(numRows, numCols)
  );
  const [nextIteration, setNextIteration] = useState(
    GridFunctions.initialiseZeroArray(numRows, numCols)
  );
  const [playing, setPlaying] = useState(false);

  // Using a ref to always get the latest value of `playing` inside the setTimeout callback
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    if (playing) {
      const timeoutId = setTimeout(() => {
        if (playingRef) {
          goClicked();
        }
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [playing, nextIteration]);

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

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

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
    playing: playing,
    togglePlaying,
  };

  return (
    <div className="home-wrapper">
      <Controls {...controlProps} />
      {iteration.length === numRows && iteration[0]?.length === numCols ? (
        <Grid {...props} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
