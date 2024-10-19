export class GridFunctions {
  public static initialiseZeroArray(numRows: any, numCols: any) {
    return this.createIterationArray(numRows, numCols);
  }

  public static createIterationArray(numRows: number, numCols: number): boolean[][] {
    let iteration: boolean[][] = [];

    for (let i = 0; i < numRows; i++) {
      iteration[i] = Array(numCols).fill(false);
    }

    return iteration;
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

        // console.log(
        //   "i: " + i + " j: " + j + " liveneighbours: " + numLiveNeighbours + " was: " + ci[i][j] + " now: " + nextIteration[i][j]
        // );
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

  public static randomiseIteration(numRows: number, numCols: number): boolean[][] {
    let iteration: boolean[][] = [];

    for (let i = 0; i < numRows; i++) {
      iteration[i] = [];
      for (let j = 0; j < numCols; j++) {
        iteration[i][j] = Math.random() < 0.5;
      }
    }

    return iteration;
  }
}