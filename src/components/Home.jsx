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
    const [snackText, setSnackText] = useState("")
    const [alertType, setAlertType] = useState("")
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

    function getAllData() {
        const data = axios.get("http://localhost:8081/api");
        data.then(response => {
            if (response.data.status === "noAuth") {
                window.location.pathname = response.data.redirect;
            } else {
                console.log(response);
                setNotes([...response.data.data])
            }
        })
    }
    useEffect(() => {
        console.log("first")
        getAllData()
    }, []);

    function showAlert(status) {
        setSnackText(status)
        setAlertType(status);
        setOpen(true);
    }

    function addItem(noteText) {
        console.log("creating")
        console.log(noteText)
        if (noteText) {
            console.log("posting")
            const posting = axios.post("http://localhost:8081/api", noteText);
            posting.then((response) => {
                console.log(response);
                console.log("in here")
                if (response.data.status === "success") {
                    console.log("second")
                    getAllData();
                }
                showAlert(response.data.status)

            })
        }
    }

    return (
        <div style={{ backgroundColor: "#EEE3CB", minHeight: "100vh" }}>

            <AddNote handleSubmit={addItem} />
            <TemporaryDrawer notes={notes} showAlert={showAlert} />
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}

                ><Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                        {snackText}
                    </Alert></Snackbar>
            </div>
            <Footer />
        </div>
    );
}


export default Home;
