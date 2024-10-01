import {
  Paper,
  Typography,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
//import React from 'react';
import Search from "../../assets/images/therapies/Icon.svg";
import Superieur from "../../assets/images/therapies/arrow_forward_ios.svg";
import AddCircle from "../../assets/images/therapies/add_circle.svg";
import Stethoscope from "../../assets/images/therapiescontact/stethoscope.svg";
import "./TherapiesContact.css";
import { useEffect, useState } from "react";

interface IContacts {
  id: number;
  name: string;
  qualification: string;
  phone: string;
  email: string;
  address: string;
  profession: string;
  notes: string;
}

export default function TherapiesContact() {
  const [contacts, setContacts] = useState<IContacts[]>([]);

  const getContacts = async (): Promise<void> => {
    const result = await fetch("http://localhost:3000/contacts");
    const datas: IContacts[] = await result.json();
    setContacts(datas);
  };

  useEffect(() => {
    getContacts();
  }, []);

  function empthyContacts(contacts: IContacts[]): boolean {
    return contacts.length === 0;
  }

  return (
    <div className="container">
      <Typography className="typography"> Contacts </Typography>
      <div className="searchContainer">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "90%",
            borderRadius: 20,
            backgroundColor: "#FFEFEF",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search doctor"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <img src={Search} alt="search" />
          </IconButton>
        </Paper>

        <div className="listTextfield">
          {empthyContacts(contacts) ? (
            <Typography>There is not have contacts</Typography>
          ) : (
            contacts.map((contact) => (
              <Paper
                key={contact.id}
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  width: "90%",
                  backgroundColor: "#F4F4F4",
                  justifyContent: "space-between",
                  paddingTop: 2,
                  paddingBottom: 2,
                }}
              >
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="stethoscope"
                >
                  <img src={Stethoscope} alt="stethoscope" />
                </IconButton>
                <div className="contactName">
                  <Typography className="typography1" sx= {{color: "black", fontWeight: 700,  fontSize:17}}>
                    {contact.qualification}. {contact.name}
                  </Typography>
                  <Typography className="typography2" sx={{ fontSize: 10, fontWeight: 400 }}>
                    {contact.profession}
                  </Typography>
                </div>
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <img src={Superieur} alt="superieur" />
                </IconButton>
              </Paper>
            ))
          )}
        </div>
      </div>
      <div className="addContainer">
        <img alt="addcircle" src={AddCircle} />
      </div>
    </div>
  );
}
