import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

export default function InfoDialogStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const steps = ["About", "Rules", "How to Play"];
  const stepsContent = [
    <p>
      <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
        <u>Game Of Life</u>
      </a>
      , devised by Mathematician John Conway in 1970, is an automated cellular
      game. It is also zero-player, meaning that its evolution is determined by
      its initial state.
    </p>,
    <p>
      Rules of the game: Each cell is either alive or dead. Each cell then
      becomes alive or dead based on its current state and the state of its
      eight neighbors. At each step in time, a cell becomes alive or dead based
      on the following rules:
      <ol>
        <li>
          - Any live cell with less then two live neighbours dies, as if by
          underpopulation.
        </li>
        <li>
          - Any live cell with exactly two, or three, live neighbours, lives on
          to the next generation.
        </li>
        <li>
          - Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </li>
        <li>
          - Any dead cell with exactly three live neighbours becomes alive, as
          if by reproduction.
        </li>
      </ol>
    </p>,

    <p>How to play: </p>,
  ];

  function getStepsContent() {
    return stepsContent[activeStep];
  }
  return (
    <div>
      <div className="stepper-wrapper">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
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
