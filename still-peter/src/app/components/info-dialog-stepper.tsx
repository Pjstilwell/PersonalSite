import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import Grid from "./grid";

export default function InfoDialogStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = ["About", "Rules", "How to Play"];
  const stepsContent = [
    <p key="aboutp">
      <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
        <u>Game Of Life</u>
      </a>
      , is an automated cellular zero-player game, meaning that its evolution is
      determined by its initial state. It was devised by Mathematician John
      Conway in 1970.
      <br></br>
      You play the game by inputting an initial state and by seeing how that
      state evolves over time. Cells in every state are either alive or dead,
      and become alive or dead based on a specific set of rules about each cells
      eight neighbors...
    </p>,
    <div key="rulesp">
      <p style={{ marginBottom: "0.5rem" }}>
        Rules of the game: Each cell is either alive or dead. Each cell then
        becomes alive or dead based on its current state and the state of its
        eight neighbors. At each step in time, a cell becomes alive or dead
        based on the following rules:
      </p>
      <div className="instruction-grid">
        <p>
          Any live cell with less then two live neighbours dies, as if by
          underpopulation.
        </p>
        <div className="flexy-info">
          <Grid
            iteration={[
              [false, true, false],
              [false, true, false],
              [false, false, false],
            ]}
            numRows={3}
            numCols={3}
            infoDialog={true}
          ></Grid>
        </div>
        <p>
          Any live cell with exactly two, or three, live neighbours, lives on to
          the next generation.
        </p>
        <div className="flexy-info">
          <Grid
            iteration={[
              [false, false, true],
              [false, true, false],
              [false, true, true],
            ]}
            numRows={3}
            numCols={3}
            infoDialog={true}
          ></Grid>
        </div>
        <p>
          Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </p>
        <div className="flexy-info">
          <Grid
            iteration={[
              [false, true, true],
              [true, true, false],
              [true, false, false],
            ]}
            numRows={3}
            numCols={3}
            infoDialog={true}
          ></Grid>
        </div>
        <p>
          Any dead cell with exactly three live neighbours becomes alive, as if
          by reproduction.
        </p>
        <div className="flexy-info">
          <Grid
            iteration={[
              [false, true, true],
              [false, false, false],
              [true, false, false],
            ]}
            numRows={3}
            numCols={3}
            infoDialog={true}
          ></Grid>
        </div>
      </div>
    </div>,
    <div key="howtoplayp">
      <p style={{ marginBottom: "0.5rem" }}>How to play: </p>
      <div className="instruction-grid">
        <p>
          You can manually turn each cell in the grid on and off by clicking
          them. Experiment creating your own patterns to see how they behave
          according to the simulation rules.
        </p>
        <div className="flexy-info">
          <button className="" disabled={true}>
            Alive
          </button>
          <button className="dead" disabled={true}>
            Dead
          </button>
        </div>
        <p>
          {
            "Use the 'Back', 'Play', and 'Next' steps to control the game, stepping forward and back in time to see how the population grows."
          }
        </p>
        <div className="scrub-wrapper-info flexy-info">
          <button disabled={true}>
            <span className="material-symbols-outlined">first_page</span>
          </button>
          <button disabled={true}>
            <span className="material-symbols-outlined">play_pause</span>
          </button>
          <button disabled={true}>
            <span className="material-symbols-outlined">last_page</span>
          </button>
        </div>
        <p>
          The randomise button will randomly turn all cells in the grid either
          on or off, great if you just enjoy watching the simulation.
        </p>
        <div className="flexy-info">
          <button disabled={true}>
            <span className="material-symbols-outlined casino-logo-spacing">
              casino
            </span>
            <p>Randomise</p>
          </button>
        </div>

        <p>Use the clear button to empty the grid and start again.</p>
        <div className="flexy-info">
          <button disabled={true}>
            <span className="material-symbols-outlined casino-logo-spacing">
              check_box_outline_blank
            </span>
            <p>Clear</p>
          </button>
        </div>

        <p>You can set the number of rows and columns with the controls.</p>
        <div className="row-col-controls-wrapper-info">
          <div className="flexy">
            <p id="row-para">Rows (1-100):</p>
          </div>
          <input
            className="info-input"
            id="row-input"
            type="number"
            disabled={true}
            value={30}
          ></input>
          <div className="flexy">
            <p id="col-para">Columns (1-100):</p>
          </div>
          <input
            className="info-input"
            id="col-input"
            type="number"
            disabled={true}
            value={30}
          ></input>
        </div>
        <p>
          {
            "User the 'Add Patterns' button to add some presets to the grid. Simply select the pattern you wish to add, then click the grid where you would like to add the pattern. The presets all behave in fun ways; 'Oscillators' loop through phases, whilst 'Spaceships' move slowly across the screen."
          }
        </p>
        <div className="flexy">
          <button disabled={true}>
            <span className="material-symbols-outlined casino-logo-spacing">
              rocket_launch
            </span>
            Add Patterns
          </button>
        </div>
      </div>
    </div>,
  ];

  function getStepsContent() {
    return stepsContent[activeStep];
  }

  return (
    <div>
      <div className="stepper-wrapper">
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>

      <div className="content-grid">
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          className="back-button"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </Button>
        <div className="content-col">{getStepsContent()}</div>
        <Button
          onClick={handleNext}
          className="forward-button"
          disabled={activeStep === 2}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </Button>
        {/* 
      <Box sx={{ flex: "1 1 auto" }} /><Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
        Skip
      </Button> */}
      </div>
    </div>
  );
}
