import './App.css';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import Slide from '@mui/material/Slide';

function Note(props) {
    return (
        <Slide direction="up" in={true}
            timeout={500} mountOnEnter unmountOnExit>


            <div index={props.index} className='note' >
                <h6 className="note-title" style={{ textAlign: "center", fontWeight: "bold", }}>{props.title}</h6>
                <p className="note-text" style={{ height: "50%", maxHeight: "90%", minHeight: "fit-content" }}>{props.noteText}</p>

                <button style={{ border: "none", color: "orange", position: "absolute", right: "10px", top: "0", background: "transparent", fontSize: "12px" }} onClick={() => { props.handleDelete(props.index) }}>
                    <DeleteIcon />
                </button>
            </div>
        </Slide>
    )
}

export default Note;