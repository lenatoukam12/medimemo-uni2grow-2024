import { TextField, Typography, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Stethoscope from "../../../assets/images/contact/addeditcontact/stethoscope (1).svg";
import Specialty from "../../../assets/images/contact/addeditcontact/clinical_notes.svg";
import Call from "../../../assets/images/contact/addeditcontact/call (1).svg";
import Mail from "../../../assets/images/contact/addeditcontact/mail (1).svg";
import Location from "../../../assets/images/contact/addeditcontact/location_on.svg";
import Note from "../../../assets/images/contact/addeditcontact/sticky_note_2.svg";
import Save from "../../../assets/images/contact/addeditcontact/save.svg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEditContact.css";
import {} from "react";
import {
  formValues,
  formError,
  validateContactForm,
  validationContactField,
} from "../../../utils/ValidationContact";
import { IContact } from "../../../models/Contact";
import Header from "../../../components/header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  profession: Yup.string().required("Specialty is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  email: Yup.string().email("Invalid email format"),
  address: Yup.string(),
  notes: Yup.string(),
});

export default function AddEditContact() {
  const [error, setError] = useState(null);
  const { id } = useParams<{ id?: string }>();
  const isEditing = !!id;

  const [labelNable, setLabelNable] = useState({
    name: false,
    profession: false,
    phone: false,
    email: false,
    address: false,
    notes: false,
  });
  const navigate = useNavigate();

  const handleLabelNable = (field: keyof IContact) => {
    setLabelNable({
      ...labelNable,
      [field]: true,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      profession: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const titre = "Dr";
        const newContact = {
          name: values.name,
          notes: values.notes,
          qualification: titre,
          profession: values.profession,
          phone: values.phone,
          email: values.email,
          address: values.address,
        };
        let response;
        if (isEditing) {
          response = await fetch(`http://localhost:3000/contacts/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newContact),
          });
        } else {
          // If validation passes, make the API call to submit the data
          response = await fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newContact),
          });
        }

        if (response.ok) {
          formik.resetForm();
          const savedContact = await response.json();
          navigate("/contacts", { state: { newContact: savedContact } });
        } else {
          navigate("/contacts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  useEffect(() => {
    if (isEditing) {
      const fetchContact = async () => {
        try {
          const response = await fetch(`http://localhost:3000/contacts/${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data: formValues = await response.json();
          formik.setValues({
            name: data.name || "",
            notes: data.notes || "",
            profession: data.profession || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
          });
        } catch (err) {
          setError(error);
        }
      };

      fetchContact();
    }
  }, [id, isEditing]);

  if (error) return <div>Error</div>;

  return (
    <>
      <div>
        <Header
          title="New doctor"
          showBackButton={true}
          onBackButtonClick={() => {
            navigate("/contacts");
          }}
        />
      </div>

      <div className="infoContact">
        <form onSubmit={formik.handleSubmit}>
          <div className="infoContent">
            <div className="listInfo">
              <TextField
                id="outlined-basic"
                onFocus={() => handleLabelNable("name")}
                label={labelNable.name ? "Name" : ""}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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
                value={formik.values.profession}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.profession && Boolean(formik.errors.profession)
                }
                helperText={
                  formik.touched.profession && formik.errors.profession
                }
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
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
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
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
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
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.notes && Boolean(formik.errors.notes)}
                helperText={formik.touched.notes && formik.errors.notes}
                placeholder="Notes"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                multiline
                maxRows={4}
                slotProps={{
                  input: {
                    sx: { display: "flex", alignItems: "start" },
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
    </>
  );
}
