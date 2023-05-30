import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Grow from '@mui/material/Grow';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
const addButtonStyle = {
    backgroundColor: "orange",
    width: "50px",
    fontSize: "12px",
    borderRadius: "50%",
    position: "absolute",
    bottom: "-10px",
    right: "20px",
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
};
function AddNote(props) {
    const [noteText, setNoteText] = useState({ title: "", text: "" });
    const [typing, setTyping] = useState(false);
    return (
        <form
            className="addNoteContainer"
            style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                position: "relative",
            }}

        >
            {(typing) &&
                <Zoom in={typing} timeout={1200}>
                    <input
                        type="text"
                        onChange={(e) => setNoteText({ ...noteText, title: e.target.value })}
                        name="title"
                        placeholder="Title..."
                        value={noteText.title}
                        required
                    /></Zoom>}


            <textarea
                type="text"
                onClick={() => { setTyping(true) }}
                onChange={(e) => setNoteText({ ...noteText, text: e.target.value })}
                placeholder="Enter New note..."
                name="noteText"
                style={{ width: "100%" }}
                value={noteText.text}
                required
            />

            <Slide direction="up" in={typing}
                timeout={500} mountOnEnter unmountOnExit>

                <Fab className="btn" style={addButtonStyle} onClick={(event) => {
                    props.handleSubmit(noteText)
                    setNoteText({ title: "", text: "" })
                    event.preventDefault();
                }}>
                    <AddIcon />
                </Fab>
            </Slide>

        </form>
    );
}

export default AddNote;
