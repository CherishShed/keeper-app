import React, { useState, useContext, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { SnackText } from "../contexts/HomeContext";


export default function SnackFeed() {
    const { snack, dispatchSnack } = useContext(SnackText);
    console.log(snack)
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatchSnack({ type: "CLOSE_SNACK" });
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
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

    return (
        <Snackbar
            open={snack.open}
            autoHideDuration={6000}
            onClose={handleClose}
            action={action}
        >
            <Alert
                onClose={handleClose}
                severity={"success"}
                sx={{ width: "100%" }}
            >
                {snack.snackText}
            </Alert>
        </Snackbar>
    )
}