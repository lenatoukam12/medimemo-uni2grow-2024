import { IconButton, Typography } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ViewContact() {
  return (
    <div className="container">
        <div className="hearder">
            <IconButton type="button" sx={{ paddingLeft: "0px" }} aria-label="arrowBack">
                <ArrowBackIcon />
            </IconButton>
            <Typography className="textTypography" paddingLeft={0}>
                New doctor
            </Typography>
        </div>

        <div className="formContenair">
            <div className="headerForm">

            </div>
            <div className="bodyForm">

            </div>
        </div>
    </div>
  )
}
