import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';

function Note(props) {
    const [hover, setHover] = useState(false);
    return (
        <Slide direction="up" in={props.show}
            timeout={200} mountOnEnter unmountOnExit>

            <div index={props.index} className='note' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <h6 className="note-title" style={{ textAlign: "center", fontWeight: "bold", }}>{props.title}</h6>
                <p className="note-text" style={{ height: "50%", maxHeight: "90%", minHeight: "fit-content" }}>{props.content}</p>

                {(hover) &&
                    <Zoom in={hover} timeout={300}>
                        <button style={{ border: "none", color: "#83764F", position: "absolute", right: "10px", top: "0", background: "transparent", fontSize: "12px" }} onClick={(e) => { props.handleDelete(e, props.index) }}>
                            <DeleteIcon />
                        </button>
                    </Zoom>
                }
            </div>
        </Slide>
    )
}

export default Note;


