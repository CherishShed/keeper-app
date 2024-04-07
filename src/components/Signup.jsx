import { useEffect, useState } from "react";
import styles from "../signup.module.css";
import {
  
  Button,
  FormControl,
  InputAdornment,
  TextField,
  
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import { IconButton } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [toastText, settoastText] = useState("");
  const [textColor, settextColor] = useState("red");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (toastText === "Error Occured") {
      toast.error(toastText, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        pauseOnHover: false,
        autoClose: 1000,
        theme: "light",
      });
    } else if (toastText === "Registration successful, Proceed to Login Page") {
      toast.success(toastText, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        pauseOnHover: false,
        autoClose: 1000,
        theme: "light",
      });
    } else {
      return;
    }
  }, [toastText]);
  function handleButton(ev) {
    const passLength = formData.password.length;
    const usernameLength = formData.username.length;
    const offset = ev.target.offsetLeft;
    console.log(passLength, offset);
    let displace = "0px";
    if (passLength < 8 || usernameLength < 8) {
      if (offset <= 98) {
        displace = "100px";
      } else if (offset > 96) {
        displace = "-100px";
      }
      ev.target.setAttribute("disabled", true);
    } else {
      ev.target.removeAttribute("disabled");
    }
    ev.target.style.left = displace;
  }

  function handleCheck() {
    const passLength = formData.password.length;
    const usernameLength = formData.username.length;
    if (passLength < 8 || usernameLength < 8) {
      document.getElementsByClassName(
        styles.loginButton
      )[0].style.backgroundColor = "rgb(112, 41, 29)";
      settextColor("red");
    } else {
      document.getElementsByClassName(
        styles.loginButton
      )[0].style.backgroundColor = " rgb(24, 100, 65)";
      settextColor("green");
    }
  }

  function handleSubmit(event) {
    console.log("here");
    event.preventDefault();
    axios.post("http://localhost:8081/register", formData).then((result) => {
      console.log(result);
      settoastText(result.data.message);
      setTimeout(() => {
        if (result.data.success) {
          window.location.pathname = "/userDetails";
        }
      }, 1000);
    });
  }
  return (
    <div>
      <ToastContainer />
      <div className={styles.loginForm}>
        <div className={styles.login}>
          <img
            src="pexels-pixabay-531844.jpg"
            className={styles["signup-backImg"]}
            alt="back img"
          />
          <FormControl
            component="form"
            className={styles["formInput"]}
            gap={2}
            onSubmit={handleSubmit}
          >
            <div>
              <img
                alt="logo"
                src="Screenshot_2023-06-15_113137-removebg-preview.png"
                className={styles.logo}
              />
              <p style={{ fontFamily: "Indie Flower", fontSize: "20px" }}>
                Welcome To Your Note Assistant
              </p>
              <p
                style={{
                  fontFamily: "Indie Flower",
                  fontSize: "12px",
                  color: textColor,
                }}
              >
                *Password must be 8+ characters
              </p>
            </div>
            <TextField
              fullWidth
              style={{ fontFamily: "Indie Flower", fontWeight: "bold" }}
              
              variant="standard"
              label="Email"
              type="email"
              color="warning"
              name="username"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              className={styles["form-input-field"]}
              onChange={(e) => {
                handleCheck();
                const elements = document.getElementsByClassName(
                  styles.loginButton
                );
                elements[0].style.left = "0px";
                elements[0].removeAttribute("disabled");
                console.log(elements);
                setFormData({ ...formData, username: e.target.value });
              }}
              value={formData.username}
              key={1}
            />
            <TextField
              key={2}
              name="password"
              
              onChange={(e) => {
                handleCheck();
                const elements = document.getElementsByClassName(
                  styles.loginButton
                );
                elements[0].style.left = "0px";
                elements[0].removeAttribute("disabled");
                console.log(elements);
                setFormData({ ...formData, username: e.target.value });
                setFormData({ ...formData, password: e.target.value });
              }}
              value={formData.password}
              variant="standard"
              label="Password"
              type={showPassword ? "text" : "password"}
              color="warning"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EnhancedEncryptionIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className={styles["form-input-field password"]}
            />
            <p className={styles["signup-text"]}>
              Already have an account?{" "}
              <a className={styles["signup-link"]} href="/login">
                Login
              </a>
            </p>
            <Button
              className={styles["loginButton"]}
              style={{ backgroundColor: "rgb(112, 41, 29)" }}
              type="submit"
              variant="contained"
              size="large"
              onMouseEnter={(e) => handleButton(e)}
            >
              Sign Up
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default Login;
