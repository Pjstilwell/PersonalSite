import { patternSquares } from "./resources/pattern-squares";
import { Patterns } from "./resources/Patterns";

export class GridFunctions {
  public static initialiseZeroArray(numRows: any, numCols: any) {
    return this.createIterationArray(numRows, numCols);
  }

  public static createIterationArray(
    numRows: number,
    numCols: number
  ): boolean[][] {
    let iteration: boolean[][] = [];

    for (let i = 0; i < numRows; i++) {
      iteration[i] = Array(numCols).fill(false);
    }

    return iteration;
  }

  public static initialiseIterationStore(
    numRows: any,
    numCols: any
  ): boolean[][][] {
    return [this.createIterationArray(numRows, numCols)];
  }

  public static setStateOfPosition(
    rowIndex: number,
    colIndex: number,
    state: boolean,
    newIteration: boolean[][]
  ) {
    newIteration[rowIndex][colIndex] = state;
    return newIteration;
  }

  public static calculateNextIteration(
    currentIteration: boolean[][],
    numRows: number,
    numCols: number
  ): boolean[][] {
    const ci = this.takeMatrixCopy(currentIteration);
    let nextIteration = this.takeMatrixCopy(currentIteration);

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
          if (numLiveNeighbours == 3)
            nextIteration[i][j] = !nextIteration[i][j];
        }
      }
    }

    return nextIteration;
  }

  public static takeMatrixCopy(input: boolean[][]): boolean[][] {
    let output: boolean[][] = [];

    for (let i = 0; i < input.length; i++) {
      output[i] = [];
      for (let j = 0; j < input[i].length; j++) {
        output[i][j] = input[i][j];
      }
    }

    return output;
  }

  public static randomiseIteration(
    numRows: number,
    numCols: number
  ): boolean[][] {
    let iteration: boolean[][] = [];

    for (let i = 0; i < numRows; i++) {
      iteration[i] = [];
      for (let j = 0; j < numCols; j++) {
        iteration[i][j] = Math.random() < 0.5;
      }
    }

    return iteration;
  }

  /**
   * Check for any active cells. Used to disable other functionality
   * when no cells are active
   */
  public static checkForActiveCells(
    currentIteration: boolean[][],
    numRows: number,
    numCols: number
  ): boolean {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (currentIteration[i][j]) return true;
      }
    }
    return false;
  }

  /**
   * Handles pattern applied to grid
   */
  public static applyPattern(
    pattern: Patterns,
    row: number,
    col: number,
    nextIteration: boolean[][]
  ): boolean[][] {
    for (let i = 0; i < patternSquares[pattern].size[1]; i++) {
      for (let j = 0; j < patternSquares[pattern].size[0]; j++) {
        //iterate over squares and check if the current square is included
        //to be set to true in the grid. In this way all other squares are set to false
        nextIteration[row + i][col + j] = patternSquares[pattern].squares.some(
          (square) => square[0] === i && square[1] === j
        );
      }
    }
    return nextIteration;
  }
}
