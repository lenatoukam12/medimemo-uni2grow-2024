import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IMoreDelete } from "../../models/DeleteBox";
import { Typography } from "@mui/material";
import "./DeleteBox.css";

export function DeleteBoxView(props: IMoreDelete): JSX.Element {

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onDisagree}
        aria-labelledby=""
        PaperProps={{
          sx: {
            borderRadius: "25px",
            bgcolor:"#F8F4F4"
          }
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          <div className="title">
            {props.icon && props.icon}
            <Typography textAlign={"center"} fontSize={30} fontWeight={700}>{props.title}</Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.onDisagree}
            sx={{
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
            }}
            autoFocus
          >
            {props.disagreeIcon} {props.disagreeMessage}
          </Button>
          <Button
            autoFocus
            onClick={props.onAgree}
            sx={{
              color: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
            }}
          >
            {props.agreeIcon} {props.agreeMessage}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
