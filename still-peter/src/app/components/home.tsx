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
  const [iterationStore, setIterationStore] = useState(
    GridFunctions.initialiseIterationStore(numRows, numCols)
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

  function pushCurIterationToStore() {
    //push current iteration into store
    let curIterationStore = iterationStore;
    const curIteration = nextIteration;
    curIterationStore.push(curIteration);
    setIterationStore(curIterationStore);
  }

  function goClicked() {
    pushCurIterationToStore();
    let newIteration = GridFunctions.calculateNextIteration(
      nextIteration,
      numRows,
      numCols
    );
    setNextIteration(newIteration);
    setIteration(newIteration);
  }

  function backClicked() {
    let newIteration = iterationStore.pop()!;
    setNextIteration(newIteration);
    setIteration(newIteration);
    console.log(iterationStore);
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
    //randomise grid
    let newIteration = GridFunctions.randomiseIteration(numRows, numCols);
    setNextIteration(newIteration);
    setIteration(newIteration);

    //TODO: look into bug that store isn't clearing?
    //clear store
    setIterationStore(GridFunctions.initialiseIterationStore(numRows, numCols));

    pushCurIterationToStore();
  }

  function clearGrid() {
    //clear store
    setIterationStore(GridFunctions.initialiseIterationStore(numRows, numCols));

    //clean grid
    let newIteration = GridFunctions.createIterationArray(numRows, numCols);
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
    backClicked,
    numRows: numRows,
    numRowsChanged,
    numCols: numCols,
    numColsChanged,
    randomise,
    clear: clearGrid,
    playing: playing,
    togglePlaying,
    iterationsLength: iterationStore.length,
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
