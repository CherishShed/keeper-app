import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import AddNote from "./AddNote";
// import data from "./data";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TemporaryDrawer from "./Nav";
import { LabelModalContextProvider } from "../contexts/HomeContext";

function Home() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [alertType, setAlertType] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function getUserData() {
    axios
      .get("http://localhost:8081/", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        if (
          response.data.user.firstName === "" ||
          response.data.user.lastName === ""
        ) {
          window.location.pathname = "/userDetails";
        } else {
          setUser({ ...response.data.user });
          setNotes([...response.data.user.notes]);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          window.location.pathname = "/login";
        }
      });
  }

  useEffect(() => {
    console.log("first");
    setTimeout(() => {
      getUserData();
    }, 1000);
    console.log(user);
  }, []);

  function showAlert(status) {
    setSnackText(status);
    setAlertType(status);
    setOpen(true);
  }

  function addItem(noteText) {
    console.log("creatig");
    console.log(noteText);
    if (noteText) {
      console.log("posting");
      axios
        .post("http://localhost:8081/api", noteText, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((response) => {
          console.log(response);
          console.log("in here");
          if (response.data.status === "success") {
            console.log("second");
            getUserData();
          }
          showAlert(response.data.status);
        })
        .catch((err) => {
          if (err.response.data === "Unauthorized") {
            window.location.pathname = "/login";
          }
        });
    }
  }
  const getLabel = (e) => {
    setLoading(true);
    axios
      .get(`http://localhost:8081/api/label/${e.target.textContent}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((result) => {
        console.log(result.data.data.value);
        setNotes(result.data.data.value);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div style={{ backgroundColor: "#EEE3CB", minHeight: "100vh" }}>
      {loading && (
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_n7QLgwDWpF.json"
          mode="bounce"
          background="transparent"
          speed="1"
          style={{
            width: "60%",
            height: "70%",
            margin: "0 auto",
            minHeight: "400px",
            minWidth: "300px",
          }}
          loop
          autoplay
        ></lottie-player>
      )}
      {!loading && (
        <div>
          <AddNote handleSubmit={addItem} />
          <LabelModalContextProvider>
            <TemporaryDrawer
              notes={notes}
              showAlert={showAlert}
              user={user}
              getLabel={getLabel}
            />
          </LabelModalContextProvider>
          <div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              action={action}
            >
              <Alert
                onClose={handleClose}
                severity={alertType}
                sx={{ width: "100%" }}
              >
                {snackText}
              </Alert>
            </Snackbar>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
