export type Pattern = {
  patternName: string;
  size: number[];
  pattern: boolean[][];
};

export type PatternGroup = {
  groupName: string;
  patterns: Pattern[];
};

export const patternGroups: PatternGroup[] = [
  {
    groupName: "Still-life",
    patterns: [
      {
        patternName: "Block",
        size: [2, 2],
        pattern: [
          [true, true],
          [true, true],
        ],
      },
      {
        patternName: "Beehive",
        size: [4, 3],
        pattern: [
          [false, true, true, false],
          [true, false, false, true],
          [false, true, true, false],
        ],
      },
      {
        patternName: "Loaf",
        size: [4, 4],
        pattern: [
          [false, true, true, false],
          [true, false, false, true],
          [false, true, false, true],
          [false, false, true, false],
        ],
      },
      {
        patternName: "Boat",
        size: [3, 3],
        pattern: [
          [true, true, false],
          [true, false, true],
          [false, true, false],
        ],
      },
      {
        patternName: "Tub",
        size: [3, 3],
        pattern: [
          [false, true, false],
          [true, false, true],
          [false, true, false],
        ],
      },
    ],
  },
  {
    groupName: "Oscillator",
    patterns: [
      { patternName: "Blinker", size: [3, 1], pattern: [[true, true, true]] },
      {
        patternName: "Toad",
        size: [4, 2],
        pattern: [
          [false, true, true, true],
          [true, true, true, false],
        ],
      },
      {
        patternName: "Beacon",
        size: [4, 4],
        pattern: [
          [true, true, false, false],
          [true, false, false, false],
          [false, false, false, true],
          [false, false, true, true],
        ],
      },
      {
        patternName: "Pulsar",
        size: [15, 15],
        pattern: [
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          [
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
          ],
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          [
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
          ],
          [
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
          ],
          [
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
          ],
          [
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
          ],
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          [
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
          ],
          [
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
          ],
          [
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
          ],
          [
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
            true,
            false,
            false,
            false,
            false,
            true,
            false,
          ],
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          [
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
          ],
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
        ],
      },
      {
        patternName: "Penta-decathlon",
        size: [9, 16],
        pattern: [
          [false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false],
          [false, false, false, true, true, true, false, false, false],
          [false, false, false, true, false, true, false, false, false],
          [false, false, false, true, true, true, false, false, false],
          [false, false, false, true, true, true, false, false, false],
          [false, false, false, true, true, true, false, false, false],
          [false, false, false, true, true, true, false, false, false],
          [false, false, false, true, false, true, false, false, false],
          [false, false, false, true, true, true, false, false, false],
          [false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false],
        ],
      },
    ],
  },
  {
    groupName: "Spaceship",
    patterns: [
      {
        patternName: "Glider",
        size: [3, 3],
        pattern: [
          [true, false, true],
          [false, true, true],
          [false, true, false],
        ],
      },
      {
        patternName: "Light-weight Spaceship",
        size: [5, 4],
        pattern: [
          [false, true, true, true, true],
          [true, false, false, false, true],
          [false, false, false, false, true],
          [true, false, false, true, false],
        ],
      },
      {
        patternName: "Middle-weight Spaceship",
        size: [6, 5],
        pattern: [
          [false, false, true, false, false, false],
          [true, false, false, false, true, false],
          [false, false, false, false, false, true],
          [true, false, false, false, false, true],
          [false, true, true, true, true, true],
        ],
      },
      {
        patternName: "Heavy-weight Spaceship",
        size: [7, 5],
        pattern: [
          [false, false, true, true, false, false, false],
          [true, false, false, false, false, true, false],
          [false, false, false, false, false, false, true],
          [true, false, false, false, false, false, true],
          [false, true, true, true, true, true, true],
        ],
      },
    ],
  },
];
