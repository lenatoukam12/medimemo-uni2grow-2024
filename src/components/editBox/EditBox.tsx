import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import {ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";
import {IEditBox} from "../../models/editBox";
import { useNavigate } from "react-router-dom";
import {DeleteBoxView} from "../deleteBox/DeleteBox";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ClearIcon from '@mui/icons-material/Clear';


export default function EditBox(props:IEditBox): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openModal,setOpenModal] = React.useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const navigate = useNavigate();

    const handleEdit = () =>{
        if(props.edit){
            navigate(props.edit);
        }
        handleClose();
    };

    // const [open, setOpen] = React.useState(false);
  
    const handleExit = () => {
      setOpenModal(false);
    } 
    const handleOpenDelete = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      setOpenModal(true);
    };

    const handleDelete = async () => {
      if(props.delete){
        try {
          const response = await fetch(props.delete, {
              method: 'DELETE',
          });
  
          if (response.ok) {
             navigate("/contacts");
          }
        } catch (error) {
          console.error('Erreur:', error);
        }
      }
    } 

  return (
    <React.Fragment>
        <Tooltip title="">
          <div onClick={handleClick}>
            <MoreVertIcon/>
          </div>
        </Tooltip>
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <MenuItem onClick= {handleEdit}>
          <ListItemIcon>
            <EditIcon  />
          </ListItemIcon >
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDelete} >
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          Delete 

        </MenuItem>
    </Menu>
     {openModal &&  
     <DeleteBoxView 
      open={openModal} 
      onDisagree={handleExit} 
      title="Deletion Confirmation" 
      icon={<ReportGmailerrorredIcon />} 
      body="Do you really want to delete this contact? Allentered data wil be lost and cannot be recovered." 
      onAgree={handleDelete} 
      agreeIcon={<ClearIcon sx={{height:15, width:15}}/>} 
      disagreeIcon={<ArrowBackIosNewIcon sx={{height:15, width:15}} />} 
      agreeMessage="Delete " 
      disagreeMessage="Back"/>}
    </React.Fragment>
    )
}
