import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Note from './Note';
import AddNote from './AddNote';
// import data from "./data";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TemporaryDrawer from './Nav';



function Home() {

    const [notes, setNotes] = useState([]);
    const [open, setOpen] = useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="dark" size="small" onClick={handleClose}>
                UNDO
            </Button>
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
    useEffect(() => {
        setTimeout(() => {
            const data = axios.get("http://localhost:8081/");
            data.then(response => {
                setNotes([...notes, ...(response.data).splice(0, 10)])
            })
        }, 1000)
    }, []);

    function addItem(noteText) {
        console.log(noteText)
        if (noteText) {
            setNotes([...notes, noteText]);
            setOpen(true);
        }
    }

    return (
        <div style={{ backgroundColor: "#EEE3CB", minHeight: "100vh" }}>

            <AddNote handleSubmit={addItem} />
            <TemporaryDrawer notes={notes} />

            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}

                ><Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Note Added
                    </Alert></Snackbar>
            </div>
            <Footer />
        </div>
    );
}


export default Home;
