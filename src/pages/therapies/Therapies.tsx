import { Paper, Typography, IconButton, InputBase, Button } from '@mui/material';
//import React from 'react';
import Search from '../../assets/images/therapies/Icon.svg';
import Superieur from '../../assets/images/therapies/arrow_forward_ios.svg';
import AddCircle from '../../assets/images/therapies/add_circle.svg';
import "./therapies.css";
import { Foot } from '../../components/foot/Foot';


export default function Therapies() {

  return (
    <div className= "container">
        <Typography  className= "typography" > My therapies</Typography>
        <div className="searchContainer">   
              <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "90%", borderRadius: 20, backgroundColor: "#FFEFEF" }}
                  >
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search theraphy" inputProps={{ 'aria-label': 'search google maps' }}/>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <img src={Search} alt="search"/>
                </IconButton>
              </Paper>
            
            <div className="listTextfield">
              <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "90%", backgroundColor: "#F4F4F4", justifyContent : "space-between" }}
                  >
                <Button disabled  variant="text" > Conjunctivitis</Button>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <img src={Superieur} alt="superieur"  /> 
                </IconButton>
              </Paper>

              <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "90%", backgroundColor: "#F4F4F4", justifyContent : "space-between" }}
                  >
                  <Button disabled  variant="text" > Muscle pain</Button>
 
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <img src={Superieur} alt="superieur"/>
                </IconButton>
              </Paper>
            </div>
        </div>  
        <div className="addContainer"  >
              <img alt="addcircle" src={AddCircle} />
        </div>
        <div className="component-properties">
          <Foot/>
        </div>
    </div>
  )
}
