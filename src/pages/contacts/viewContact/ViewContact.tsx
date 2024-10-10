import { Button, Typography } from "@mui/material";
import CallPhone from "../../../assets/images/viewContact/white_call (1).svg";
import Email from "../../../assets/images/viewContact/white_mail (1).svg";
import View from "../../../assets/images/viewContact/white_location_on (1).svg";
import Call from "../../../assets/images/contact/addeditcontact/call (1).svg";
import Mail from "../../../assets/images/contact/addeditcontact/mail (1).svg";
import Location from "../../../assets/images/contact/addeditcontact/location_on.svg";
import Note from "../../../assets/images/viewContact/demography (1).svg";
import { IContact } from "../../../models/Contact";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./ViewContact.css";
import Header from "../../../components/header/Header";
import EditBox from "../../../components/editBox/EditBox";

export default function ViewContact() {
  const { id } = useParams<{ id?: string }>();
  const [contact, setContact] = useState<IContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/contacts/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: IContact = await response.json();
        setContact(data);
      } catch (err) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;


  const EditBoxView: string = `/addeditcontact/${id}`;

  return (
    <>
      <div>
        <Header
          title={`${contact?.qualification}. ${contact?.name}`}
          showBackButton={true}
          onBackButtonClick={() => {
            navigate("/contacts");
          }}
          showRightButton={true}
          RightButton= {<EditBox edit={EditBoxView}/>}
        />
      </div>

      <div className="divProf">
        <Typography
          variant="button"
          height={22}
          sx={{
            fontSize: 14,
            fontWeight: 400,
            textAlign: "center",
            paddingBottom: 2,
            color: "#444",
          }}
        >
          {contact?.profession}
        </Typography>
      </div>
      <div className="formContenair">
        <div className="headerForm">
         <div className="boxDiv">
        
            <div className="boxInfos">
              <img color="white" src={CallPhone} alt="call" />
              <Typography sx={{ color: "white", textTransform: "capitalize" }}>
                Ring
              </Typography>
            </div>
        

         
            <div className="boxInfos">
              <img color="white" src={Email} alt="email" />
              <Typography sx={{ color: "white", textTransform: "capitalize" }}>
                E-mail
              </Typography>
            </div>
         

          
            <div className="boxInfos">
              <img color="white" src={View} alt="location" />
              <Typography sx={{ color: "white", textTransform: "capitalize" }}>
                View
              </Typography>
            </div>
         
          </div>
        
        <div className="bodyForm">
          <div className="doctorProps">
            <img src={Call} alt="call" />
            <Typography
              sx={{
                paddingTop: 0.1,
                // fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2,
              }}
            >
              {contact?.phone}
            </Typography>
          </div>

          <div className="doctorProps">
            <img src={Mail} alt="mail" />
            <Typography
              sx={{
                paddingTop: 0.1,
                color: "#444444",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2,
              }}
            >
              {contact?.email}
            </Typography>
          </div>

          <div className="doctorProps">
            <img src={Location} alt="location" />
            <Typography
              sx={{
                paddingTop: 0.1,
                color: "#444444",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2,
              }}
            >
              {contact?.address}
            </Typography>
          </div>
          <div className="doctorProps">
            <img src={Note} alt="note" />
            <Typography
              sx={{
                paddingTop: 0.1,
                color: "#444444",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2,
              }}
              width={240}
              height="auto"
            >
              {contact?.notes}
            </Typography>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
