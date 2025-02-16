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
  const [numRows, setNumRows] = useState(50);
  const [numCols, setNumCols] = useState(50);
  const [nextIteration, setNextIteration] = useState(
    GridFunctions.initialiseZeroArray(numRows, numCols)
  );
  const [iterationStore, setIterationStore] = useState(
    GridFunctions.initialiseIterationStore(numRows, numCols)
  );
  const [playing, setPlaying] = useState(false);

  //tracks if any cells are active
  const [activeCells, setActiveCells] = useState(false);

  //tracks if sequence is terminated
  const [seqTerminated, setSeqTerminated] = useState(false);

  //tracks if pattern is currently selected
  const [patternSelected, setPatternSelected] = useState(false);

  //tracks the selected pattern
  const initialPattern = patternGroups[0].patterns[0];
  const [selectedPattern, setSelectedPattern] = useState(initialPattern);

  //Tracks Pattern Dialog Open
  const [patternsDialogOpen, setPatternsDialogOpen] = useState(false);

  //Tracks Info Dialog Open
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  //Option to terminate sequence if repeating
  const [terminateSequence, setTerminateSequence] = useState(false);

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
    const newNextIteration = GridFunctions.initialiseZeroArray(
      numRows,
      numCols
    );

    setNextIteration(newNextIteration);
  }, [numRows, numCols]);

  function squareClicked(rowIndex: number, colIndex: number, newVal: boolean) {
    //Different logic for handling when user is attempting to apply a pattern
    if (patternSelected) {
      setNextIteration(
        GridFunctions.applyPattern(
          selectedPattern!,
          rowIndex,
          colIndex,
          nextIteration
        )
      );
      setSeqTerminated(false);
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

      setSeqTerminated(false);

      if (newVal) setActiveCells(true);
      else
        setActiveCells(
          GridFunctions.checkForActiveCells(nextIteration, numRows, numCols)
        );
    }
  }

  function pushCurIterationToStore() {
    //push current iteration into store
    const curIterationStore = iterationStore;
    const curIteration = nextIteration;
    curIterationStore.push(curIteration);
    setIterationStore(curIterationStore);
  }

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
      setSeqTerminated(true);
    }

    //sequence terminated?
    if (seqTerminated) {
      seqTerminatedActions();
    } else {
      setNextIteration(newIteration);
      setActiveCells(
        GridFunctions.checkForActiveCells(newIteration, numRows, numCols)
      );
    }
  }

  function backClicked() {
    const newIteration = iterationStore.pop()!;
    setNextIteration(newIteration);

    setActiveCells(
      GridFunctions.checkForActiveCells(newIteration, numRows, numCols)
    );

    setSeqTerminated(false);
  }

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

  function numRowsChanged(val: string) {
    let numVal = parseInt(val, 10);
    if (numVal > 100) numVal = 100;
    else if (numVal < 1) numVal = 1;
    if (!isNaN(numVal)) {
      setNumRows(numVal);
    }
    setSeqTerminated(false);
  }

  function numColsChanged(val: string) {
    let numVal = parseInt(val, 10);
    if (numVal > 100) numVal = 100;
    else if (numVal < 1) numVal = 1;
    if (!isNaN(numVal)) {
      setNumCols(numVal);
    }
    setSeqTerminated(false);
  }

  function randomise() {
    //randomise grid
    const newIteration = GridFunctions.randomiseIteration(numRows, numCols);
    setNextIteration(newIteration);

    //TODO: look into bug that store isn't clearing?
    //clear store
    setIterationStore(GridFunctions.initialiseIterationStore(numRows, numCols));

    pushCurIterationToStore();

    setActiveCells(
      GridFunctions.checkForActiveCells(newIteration, numRows, numCols)
    );

    setSeqTerminated(false);
  }

  function clearGrid() {
    //clear store
    setIterationStore(GridFunctions.initialiseIterationStore(numRows, numCols));

    //clean grid
    const newIteration = GridFunctions.createIterationArray(numRows, numCols);
    setNextIteration(newIteration);

    setActiveCells(false);
    setSeqTerminated(false);
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

  function seqTerminatedActions() {
    setPlaying(false);
  }

  function patternSelectedActions(pattern: Pattern) {
    setPatternSelected(true);
    setSelectedPattern(pattern);
    togglePatternsDialog();
  }

  function patternUnselected() {
    if (patternSelected) setPatternSelected(false);
  }

  function togglePatternsDialog() {
    const dialogOpen = patternsDialogOpen;
    setPatternsDialogOpen(!dialogOpen);
  }

  function toggleInfoDialog() {
    const dialogOpen = infoDialogOpen;
    setInfoDialogOpen(!dialogOpen);
  }

  function toggleTerminateSequence() {
    setTerminateSequence(!terminateSequence);
  }

  const props = {
    iteration: nextIteration,
    squareClicked,
    numRows: numRows,
    numCols: numCols,
    seqTerminated: seqTerminated,
    patternSelected: patternSelected,
    selectedPattern: selectedPattern,
    infoDialog: false,
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
    playing: playing,
    togglePlaying,
    iterationsLength: iterationStore.length,
    activeCells: activeCells,
    seqTerminated: seqTerminated,
    patternSelected: patternSelected,
    selectedPattern: selectedPattern,
    patternSelectedActions,
    openPatternsDialog: togglePatternsDialog,
    openInfoDialog: toggleInfoDialog,
    terminateSequence,
    toggleTerminateSequence,
  };

  const addPatternsDialogProps: AddPatternsDialogProps = {
    patternsDialogOpen: patternsDialogOpen,
    openPatternsDialog: togglePatternsDialog,
    numRows: numRows,
    numCols: numCols,
    patternSelected: patternSelected,
    selectedPattern: selectedPattern,
    patternSelectedActions,
  };

  return (
    <div onClick={patternUnselected} className="home-wrapper">
      <Controls {...controlProps} />
      {nextIteration.length === numRows &&
      nextIteration[0]?.length === numCols ? (
        <Grid {...props} />
      ) : (
        <div></div>
      )}
      <AddPatternsDialog {...addPatternsDialogProps}></AddPatternsDialog>
      <InfoDialog
        open={infoDialogOpen}
        triggerOpen={() => toggleInfoDialog()}
      ></InfoDialog>
    </div>
  );
}
