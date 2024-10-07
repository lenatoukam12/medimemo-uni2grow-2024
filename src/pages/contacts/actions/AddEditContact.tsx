import { TextField, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputAdornment from "@mui/material/InputAdornment";
import Stethoscope from "../../../assets/images/contact/addeditcontact/stethoscope (1).svg";
import Specialty from "../../../assets/images/contact/addeditcontact/clinical_notes.svg";
import Call from "../../../assets/images/contact/addeditcontact/call (1).svg";
import Mail from "../../../assets/images/contact/addeditcontact/mail (1).svg";
import Location from "../../../assets/images/contact/addeditcontact/location_on.svg";
import Note from "../../../assets/images/contact/addeditcontact/sticky_note_2.svg";
import Save from "../../../assets/images/contact/addeditcontact/save.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEditContact.css";
import {} from "react";
import {
  formValues,
  formError,
  validateContactForm,
  validationContactField,
} from "../../../utils/ValidationContact";

import { IContact } from "../../../models/Contact";

export default function AddEditContact() {
  const [contact, setContact] = useState<formValues>({
    name: "",
    profession: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const [errors, setErrors] = useState<formError>({
    name: "",
    profession: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const [labelNable, setLabelNable] = useState({
    name: false,
    profession: false,
    phone: false,
    email: false,
    address: false,
    notes: false,
  });

  const handleLabelNable = (field: keyof IContact) => {
    setLabelNable({
      ...labelNable,
      [field]: true,
    });
  };

  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (id) {
  //       fetchContactData();
  //     }
  //   }, [id]);

  //   const fetchContactData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/contacts/${id}");
  //       const data: formValues = await response.json();
  //       setContact(data);
  //     } catch (error) {
  //       console.error("Error fetching contact data:", error);
  //     }
  //   };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const error = validationContactField(fieldName, value);

    setContact({
      ...contact,
      [fieldName]: value,
    });

    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: error || "",
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Validate the entire form before proceeding
    const validationErrors = validateContactForm(contact);

    // If there are validation errors, update the errors state and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the validation errors to the state
      return; // Stop submission if validation fails
    }

    try {
      const newContact: IContact = {
        name: contact.name,
        notes: contact.notes,
        qualification: "Dr",
        profession: contact.profession,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
      };

      // If validation passes, make the API call to submit the data
      const response = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        setContact({
          name: "",
          notes: "",
          profession: "",
          phone: "",
          email: "",
          address: "",
        });
        //alert("Contact added successfully!");
        const savedContact = await response.json(); // Get the saved contact with the ID
        navigate("/contacts", { state: { newContact: savedContact } });
      } else {
        alert("Error adding contact.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="headerContainer">
          <IconButton
            type="button"
            sx={{ paddingLeft: "0px" }}
            aria-label="arrowBack"
            onClick= {() => {navigate("/contacts")}}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography className="textTypography" paddingLeft={0}>
            New doctor
          </Typography>
        </div>
        <div className="infoContact">
          <form onSubmit={handleSubmit}>
            <div className="infoContent">
            <div className="listInfo">
              <TextField
                id="outlined-basic"
                onFocus={() => handleLabelNable("name")}
                label={labelNable.name ? "Name" : ""}
                name="name"
                value={contact.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Stethoscope} alt="stethoscope" />
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,

                            fontStyle: "normal",
                            color: "#444",
                          }}
                          paddingLeft={2}
                        >
                          Dr.
                        </Typography>
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                onFocus={() => handleLabelNable("profession")}
                label={labelNable.profession ? "Specialty" : ""}
                name="profession"
                value={contact.profession}
                onChange={handleChange}
                error={!!errors.profession}
                helperText={errors.profession}
                placeholder="Specialty"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Specialty} alt="specialty" />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                onFocus={() => handleLabelNable("phone")}
                label={labelNable.phone ? "Phone number" : ""}
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                placeholder="Phone number"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Call} alt="call" />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                onFocus={() => handleLabelNable("email")}
                label={labelNable.email ? "E-mail" : ""}
                name="email"
                type="email"
                value={contact.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                placeholder="E-mail"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Mail} alt="mail" />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                onFocus={() => handleLabelNable("address")}
                label={labelNable.address ? "Address" : ""}
                name="address"
                value={contact.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                placeholder="Address"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Location} alt="location" />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                onFocus={() => handleLabelNable("notes")}
                label={labelNable.notes ? "Notes" : ""}
                name="notes"
                value={contact.notes}
                onChange={handleChange}
                error={!!errors.notes}
                helperText={errors.notes}
                placeholder="Notes"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Note} alt="note" />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
              />
            </div>
            </div>
           

            <div className="saveContainer">
              <Button
                className="saveButton"
                type="submit"
                sx={{ backgroundColor: "#F00", borderRadius: 4, padding: 1 }}
              >
                <img src={Save} alt="save" />
                <Typography className="saveText">Save</Typography>
              </Button>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
}
