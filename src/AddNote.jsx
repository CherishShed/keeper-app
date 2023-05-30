import React, { useState } from "react";

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
                setNoteText({ title: "", text: "" })
                event.preventDefault();
            }}
        >
            <input
                type="text"
                onChange={(e) => setNoteText({ ...noteText, title: e.target.value })}
                style={{ width: "100%", height: "30%" }}
                name="title"
                placeholder="Title..."
                value={noteText.title}
                required
            />
            <textarea
                type="text"
                onChange={(e) => setNoteText({ ...noteText, text: e.target.value })}
                placeholder="Enter New note..."
                name="noteText"
                style={{ width: "100%", height: "70%" }}
                value={noteText.text}
                required
            />
            <button className="btn" style={addButtonStyle}>
                Add
            </button>
        </form>
    );
}

export default AddNote;
