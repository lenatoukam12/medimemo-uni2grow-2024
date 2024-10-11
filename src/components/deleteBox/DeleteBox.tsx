import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IMoreDelete } from '../../models/DeleteBox';
import { Typography } from '@mui/material';
import "./DeleteBox.css";

 export function DeleteBoxView(props:IMoreDelete): JSX.Element {
  
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 
    return (
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={props.open}
          onClose={props.onDisagree}
          aria-labelledby=""
        >
          
          <DialogTitle id="responsive-dialog-title">
            <div className="title">
              {props.icon && props.icon}
              <Typography >{props.title1}</Typography>
              <Typography>{props.title2}</Typography> 
            </div> 
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onDisagree} sx={{color: "black"}} autoFocus>
              {props.disagreeIcon} {props.disagreeMessage}
            </Button>
            <Button autoFocus onClick={props.onAgree} sx={{color: "red"}}>
              <div className="agreeIcon" >
                {props.agreeIcon} {props.agreeMessage}
              </div>
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}