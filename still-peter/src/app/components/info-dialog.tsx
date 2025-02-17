import Dialog from "@mui/material/Dialog";
import React, { useContext } from "react";
import "../info-dialog.scss";
import InfoDialogStepper from "./info-dialog-stepper";

export type InfoDialogProps = {
  open: boolean;
  triggerOpen: () => void;
};

export default function InfoDialog(props: InfoDialogProps) {
  return (
    <Dialog open={props.open}>
      <div className="dialog-wrapper">
        <div className="dialog-title-wrapper">
          <h1 className="dialog-title">About GAME OF LIFE</h1>
          <button onClick={() => props.triggerOpen()}>
            <span className="material-symbols-outlined">close</span>
            Close
          </button>
        </div>
        <div className="i-dialog-content">
          <InfoDialogStepper></InfoDialogStepper>
        </div>
      </div>
    </Dialog>
  );
}
