import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
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
    const [noteText, setNoteText] = useState({ title: "", body: "" });
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
            onSubmit={(event) => {
                props.handleSubmit(noteText)
                setNoteText({ title: "", body: "" })
                event.preventDefault();
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
                onChange={(e) => setNoteText({ ...noteText, body: e.target.value })}
                placeholder="Enter New note..."
                name="noteText"
                style={{ width: "100%" }}
                value={noteText.body}
                required
            />


            <Fab className="btn" style={addButtonStyle} type="submit">
                <AddIcon />
            </Fab>


        </form>
    );
}

export default AddNote;
