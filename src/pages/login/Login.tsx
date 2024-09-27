import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Button, TextField, Typography, Link, IconButton, Divider, Stack, Alert  } from "@mui/material";
import "./Login.css";
import logo from "../../assets/images/Group.png";
import appName from "../../assets/images/MEDIMEMO.png";
import apple from "../../assets/images/Apple.png";
import facebook from "../../assets/images/Facebook.png";
import google from "../../assets/images/Google.png";
import { validationField, validationForm } from "../../utils/validation";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [logged, setlogged] = useState("");
  const [login,setLogin] = useState("");

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const error = validationField(fieldName, value);
    if (!error) {
      //setErrors((prevState) => ({ ...prevState, [fieldName]: "" }));
      setErrors((prevState) => {
        const newState = { ...prevState };
        delete newState[fieldName];
        return newState;
      });
    } else {
      setErrors((prevState) => ({ ...prevState, [fieldName]: error }));
    }

    setCredentials((prevState) => {
        setLogin("");
      return { ...prevState, [fieldName]: value };
    });

  };



  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const errors = validationForm(credentials);
      if (Object.keys(errors).length === 0) {
        // console.log(credentials);
        const result = await fetch(
          "http://localhost:3000/users"
        );
        const data = await result.json();
        console.log(data);

        const exists = data.some(
          (item) => item.username === credentials.username && item.password === credentials.password
        );
        if (exists) {
            setlogged("it's ok!!!");
          navigate("/dashboard");
        } else {
           // setlogged("it's not ok!!!")
          //console.error("erreur");
          setLogin ("This is a filled error Alert.")
        }
      } else {
        setErrors(errors);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img className="logo" src={logo} />
        <img className="appName" src={appName} />
      </div>
      <div className="panel">
        <Typography fontWeight={700} fontSize={20} textAlign="center">
          Let&apos;s Sign You in!
        </Typography>

        {login ? (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="error">
                    Username and password error !!
                    </Alert>
                </Stack> 
        ) : (
            ("")
        )}

        <form
          className="form-login"
          onSubmit={handleLogin}
          //{(e) => {
          //  e.preventDefault(), console.log(credentials);
          //}}
        >
          <TextField
            value={credentials.name}
            name="username"
            type="username"
            label="Email or Username"
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            value={credentials.password}
            name="password"
            label="Password"
            type="error"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
              
          <Typography textAlign="right">
            <Link>Forget password</Link>
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#F00" }}
          >
            Login
          </Button>
            <Typography>
                {logged}

            </Typography>

        </form>
        <Typography textAlign="center">
          Don&apos;t have an count?<Link>Sign up!</Link>
        </Typography>
        <Divider size="small">or</Divider>
        <div className="icon">
            <IconButton component={Link} to="link_url">
              <img src={apple} alt="" />
            </IconButton>

            <IconButton component={Link} to="link_url">
              <img src={google} alt="" />
            </IconButton>

            <IconButton component={Link} to="link_url">
              <img src={facebook} alt="" />
            </IconButton>
        </div>
      </div>
    </div>
  );
}

//export default App;
