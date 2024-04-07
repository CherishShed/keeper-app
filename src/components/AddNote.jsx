import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { TextField } from "@mui/material";
import axios from "axios";
const addButtonStyle = {
  backgroundColor: "#83764F",
  width: "50px",
  fontSize: "12px",
  borderRadius: "50%",
  position: "absolute",
  bottom: "-10px",
  right: "20px",
  textAlign: "center",
  fontWeight: "bold",
  color: "white",
  outlineColor: "#967E76",
};
import PropTypes from "prop-types";
AddNote.propTypes = {
  getUserData: PropTypes.func.isRequired,
};
function AddNote(props) {
  const [noteText, setNoteText] = useState({ title: "", content: "" });
  const [typing, setTyping] = useState(false);
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
            props.getUserData();
            // dispatchSnack({ type: "OPEN_SUCCESS_SNACK" });
          }
        })
        .catch((err) => {
          if (err.response.data === "Unauthorized") {
            window.location.pathname = "/login";
          }
        });
    }
  }
  return (
    <form
      className="addNoteContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "30px auto",
        position: "relative",
        top: "50px",
        marginBottom: "20px",
      }}
      onSubmit={(event) => {
        addItem(noteText);
        setNoteText({ title: "", content: "" });
        event.preventDefault();
      }}
      onMouseLeave={() => {
        if (noteText.title === "") {
          setTyping(false);
        }
      }}
    >
      {typing && (
        <Zoom in={typing} timeout={500}>
          <TextField
            type="text"
            onChange={(e) =>
              setNoteText({ ...noteText, title: e.target.value })
            }
            name="title"
            placeholder="Title..."
            value={noteText.title}
            color="warning"
            className="textfield"
          />
        </Zoom>
      )}

      <TextField
        className="textfield"
        color="warning"
        multiline
        type="text"
        onChange={(e) => {
          setTyping(e.target.value !== "" ? true : false);
          setNoteText({ ...noteText, content: e.target.value });
        }}
        // color="#967E76"
        placeholder="Enter New note..."
        name="noteText"
        style={{ width: "100%" }}
        value={noteText.content}
      />

      {typing && (
        <Fab className="btn" style={addButtonStyle} type="submit">
          <AddIcon />
        </Fab>
      )}
    </form>
  );
}

export default AddNote;
