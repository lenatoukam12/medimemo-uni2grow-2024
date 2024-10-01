import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Home from '../../assets/images/therapies/home_health.svg';
import Prescription from '../../assets/images/therapies/prescriptions.svg';
import Contacts from '../../assets/images/therapies/contacts.svg';
import { colors } from '@mui/material';


export function Foot(){
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 398 }}>
      <BottomNavigation
        showLabels
        value={value}
        sx = {{backgroundColor: "black"}}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<img src={Home} alt="home" />} />
        <BottomNavigationAction label="Prescription" icon={<img alt="Prescription" src={Prescription}  />} sx = {{color: "white"}} />
        <BottomNavigationAction label="Contacts" icon={<img alt="contacts" src={Contacts}/>} sx = {{color: "white"}}/>
      </BottomNavigation>
    </Box>
  );
}