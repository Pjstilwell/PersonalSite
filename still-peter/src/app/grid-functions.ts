import { Pattern } from "./resources/pattern-squares";

export class GridFunctions {
  public static initialiseZeroArray(numRows: number, numCols: number) {
    return this.createIterationArray(numRows, numCols);
  }

  public static createIterationArray(
    numRows: number,
    numCols: number
  ): boolean[][] {
    const iteration: boolean[][] = [];

    for (let i = 0; i < numRows; i++) {
      iteration[i] = Array(numCols).fill(false);
    }

    return iteration;
  }

  public static initialiseIterationStore(
    numRows: number,
    numCols: number
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
    const nextIteration = this.takeMatrixCopy(currentIteration);

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
    const output: boolean[][] = [];

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
    const iteration: boolean[][] = [];

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
    pattern: Pattern,
    row: number,
    col: number,
    nextIteration: boolean[][]
  ): boolean[][] {
    for (let i = 0; i < pattern.size[1]; i++) {
      for (let j = 0; j < pattern.size[0]; j++) {
        nextIteration[row + i][col + j] = pattern.pattern[i][j];
      }
    }
    return nextIteration;
  }
}
