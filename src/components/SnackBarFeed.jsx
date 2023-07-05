import React, { useState, useContext, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { SnackText } from "../contexts/HomeContext";


export default function SnackFeed() {
    const { open, snackText, alertType } = useContext(SnackText);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    return (
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
    )
}