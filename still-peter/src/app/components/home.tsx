"use client";
import { useEffect, useRef, useState } from "react";
import { GridFunctions } from "../grid-functions";
import Controls, { ControlProps } from "./controls";
import AddPatternsDialog, {
  AddPatternsDialogProps,
} from "./add-patterns-dialog";
import Grid from "./grid";
import { Pattern, patternGroups } from "../resources/pattern-squares";
import InfoDialog from "./info-dialog";

export default function Home() {
  const [numRows, setNumRows] = useState(30);
  const [numCols, setNumCols] = useState(40);

  //Stores the next iteration
  const [nextIteration, setNextIteration] = useState(
    GridFunctions.initialiseZeroArray(numRows, numCols)
  );

  //Stores the history of the iterations
  const [iterationStore, setIterationStore] = useState([
    GridFunctions.initialiseZeroArray(numRows, numCols),
  ]);

  //Tracks if the game is currently playing
  const [isPlaying, setIsPlaying] = useState(false);

  //tracks if any cells are active
  const [activeCells, setActiveCells] = useState(false);

  //tracks if sequence is terminated
  const [isSeqTerminated, setIsSeqTerminated] = useState(false);

  //tracks if pattern is currently selected
  const [isPatternSelected, setIsPatternSelected] = useState(false);

  //tracks the selected pattern
  const initialPattern = patternGroups[0].patterns[0];
  const [selectedPattern, setSelectedPattern] = useState(initialPattern);

  //Tracks Pattern Dialog Open
  const [isPatternsDialogOpen, setIsPatternsDialogOpen] = useState(false);

  //Tracks Info Dialog Open
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  //Option to terminate sequence if repeating
  const [terminateSequence, setTerminateSequence] = useState(false);

  // Using a ref to always get the latest value of `playing` inside the setTimeout callback
  const playingRef = useRef(isPlaying);
  playingRef.current = isPlaying;

  useEffect(() => {
    if (isPlaying) {
      const timeoutId = setTimeout(() => {
        if (playingRef) {
          goClicked();
        }
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isPlaying, nextIteration]);

  useEffect(() => {
    const newNextIteration = GridFunctions.initialiseZeroArray(
      numRows,
      numCols
    );

    setNextIteration(newNextIteration);
  }, [numRows, numCols]);

  /**
   * Handles the logic for when a square is clicked in the grid
   * Will either apply a pattern or turn a cell on and off
   * @param rowIndex row of the cell
   * @param colIndex col of the cell
   * @param newVal boolean, if cell is to be live or dead
   */
  function squareClicked(rowIndex: number, colIndex: number, newVal: boolean) {
    //Different logic for handling when user is attempting to apply a pattern
    if (isPatternSelected) {
      setNextIteration(
        GridFunctions.applyPattern(
          selectedPattern!,
          rowIndex,
          colIndex,
          nextIteration
        )
      );
      setIsSeqTerminated(false);
      setActiveCells(
        GridFunctions.checkForActiveCells(nextIteration, numRows, numCols)
      );
    } else {
      setNextIteration(
        GridFunctions.setStateOfPosition(
          rowIndex,
          colIndex,
          newVal,
          nextIteration
        )
      );

      setIsSeqTerminated(false);

      if (newVal) setActiveCells(true);
      else
        setActiveCells(
          GridFunctions.checkForActiveCells(nextIteration, numRows, numCols)
        );
    }
  }

  /**
   * Push the current iteration into the store
   */
  function pushCurIterationToStore() {
    const curIterationStore = iterationStore;
    const curIteration = nextIteration;
    curIterationStore.push(curIteration);
    setIterationStore(curIterationStore);
  }

  /**
   * Handles when the next 'go' button is clicked
   * Will compute the next iteration, and also check for
   * sequence termination if setting is activated
   */
  function goClicked() {
    pushCurIterationToStore();
    const newIteration = GridFunctions.calculateNextIteration(
      nextIteration,
      numRows,
      numCols
    );

    //Check for termination against previous 2 iterations
    if (
      terminateSequence &&
      (checkIfSequenceTerminated(
        newIteration,
        iterationStore[iterationStore.length - 1]
      ) ||
        checkIfSequenceTerminated(
          newIteration,
          iterationStore[iterationStore.length - 2]
        ))
    ) {
      setIsSeqTerminated(true);
    }

    //sequence terminated?
    if (isSeqTerminated) {
      seqTerminatedActions();
    } else {
      setNextIteration(newIteration);
      setActiveCells(
        GridFunctions.checkForActiveCells(newIteration, numRows, numCols)
      );

      if (!activeCells) {
        setIsPlaying(false);
      }
    }
  }

  /**
   * Handles the logic for when the back button is clicked
   */
  function backClicked() {
    const newIteration = iterationStore.pop()!;
    setNextIteration(newIteration);

    setActiveCells(
      GridFunctions.checkForActiveCells(newIteration, numRows, numCols)
    );

    setIsSeqTerminated(false);
  }

  /**
   * Checks the input numRows value and sets it
   * @param val Input value
   */
  function numRowsChanged(val: string) {
    let numVal = parseInt(val, 10);
    if (numVal > 100) numVal = 100;
    else if (numVal < 1) numVal = 1;
    if (!isNaN(numVal)) {
      setNumRows(numVal);
    }
    setIsSeqTerminated(false);
  }

  /**
   * Checks the input numCols value and sets it
   * @param val Input value
   */
  function numColsChanged(val: string) {
    let numVal = parseInt(val, 10);
    if (numVal > 100) numVal = 100;
    else if (numVal < 1) numVal = 1;
    if (!isNaN(numVal)) {
      setNumCols(numVal);
    }
    setIsSeqTerminated(false);
  }

  /**
   * Randomly turns kills or brings to life every cell in the grid
   */
  function randomise() {
    //randomise grid
    const newIteration = GridFunctions.randomiseIteration(numRows, numCols);
    setNextIteration(newIteration);

    //TODO: fix back button duplicating iterations when randomised
    const curIterationStore = [
      GridFunctions.initialiseZeroArray(numRows, numCols),
      newIteration,
    ];
    setIterationStore(curIterationStore);
    console.log(iterationStore);

    setActiveCells(
      GridFunctions.checkForActiveCells(newIteration, numRows, numCols)
    );

    setIsSeqTerminated(false);
  }

  /**
   * Empties the grid and the iteration store
   */
  function clearGrid() {
    //clear store
    setIterationStore([GridFunctions.initialiseZeroArray(numRows, numCols)]);

    //clean grid
    const newIteration = GridFunctions.createIterationArray(numRows, numCols);
    setNextIteration(newIteration);

    // setActiveCells(false);
    setIsSeqTerminated(false);
  }

  /**
   * Checks if the two iterations are equal by checking each element
   * @param m1 Iteration 1
   * @param m2 Iteration 2
   */
  function checkIfSequenceTerminated(m1: boolean[][], m2: boolean[][]) {
    const same = (m1: boolean[][], m2: boolean[][]) =>
      m1.flat().every((val, ind) => val === m2.flat()[ind]);

    return same(m1, m2);
  }

  /**
   * Handles when the sequence is terminated
   */
  function seqTerminatedActions() {
    setIsPlaying(false);
  }

  /**
   * Handles when a pattern is selected to be applied to the grid
   * @param pattern Selected pattern
   */
  function patternSelectedActions(pattern: Pattern) {
    setIsPatternSelected(true);
    setSelectedPattern(pattern);
    togglePatternsDialog();
  }

  function togglePlaying() {
    setIsPlaying((prev) => !prev);
  }

  function patternUnselected() {
    if (isPatternSelected) setIsPatternSelected(false);
  }

  function togglePatternsDialog() {
    const dialogOpen = isPatternsDialogOpen;
    setIsPatternsDialogOpen(!dialogOpen);
  }

  function toggleInfoDialog() {
    const dialogOpen = isInfoDialogOpen;
    setIsInfoDialogOpen(!dialogOpen);
  }

  function toggleTerminateSequence() {
    setTerminateSequence(!terminateSequence);
  }

  const gridProps = {
    iteration: nextIteration,
    squareClicked,
    numRows: numRows,
    numCols: numCols,
    seqTerminated: isSeqTerminated,
    patternSelected: isPatternSelected,
    selectedPattern: selectedPattern,
    isInfoDialogGrid: false,
  };

  const controlProps: ControlProps = {
    goClicked,
    backClicked,
    numRows: numRows,
    numRowsChanged,
    numCols: numCols,
    numColsChanged,
    randomise,
    clear: clearGrid,
    isPlaying: isPlaying,
    togglePlaying,
    iterationsLength: iterationStore.length,
    activeCells: activeCells,
    isSeqTerminated: isSeqTerminated,
    isPatternSelected: isPatternSelected,
    selectedPattern: selectedPattern,
    patternSelectedActions,
    openPatternsDialog: togglePatternsDialog,
    openInfoDialog: toggleInfoDialog,
    terminateSequence,
    toggleTerminateSequence,
  };

  const addPatternsDialogProps: AddPatternsDialogProps = {
    isPatternsDialogOpen: isPatternsDialogOpen,
    openPatternsDialog: togglePatternsDialog,
    numRows: numRows,
    numCols: numCols,
    isPatternSelected: isPatternSelected,
    selectedPattern: selectedPattern,
    patternSelectedActions,
  };

  return (
    <div onClick={patternUnselected} className="home-wrapper">
      <Controls {...controlProps} />
      {nextIteration.length === numRows &&
      nextIteration[0]?.length === numCols ? (
        <Grid {...gridProps} />
      ) : (
        <div></div>
      )}
      <AddPatternsDialog {...addPatternsDialogProps}></AddPatternsDialog>
      <InfoDialog
        isDialogOpen={isInfoDialogOpen}
        triggerOpen={() => toggleInfoDialog()}
      ></InfoDialog>
    </div>
  );
}
