import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from "../details.module.css"
import { Box, Button, FormControl, Input, InputAdornment, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { IconButton } from '@mui/material';
import { CloudUpload, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function DetailsForm() {

    return (
        <div className={styles["details-container"]}>
            <FormControl action="/profiledetails" method="POST" enctype="multipart/form-data" className={styles["details-form"]}>
                <div className={styles["pic-container"]}>
                    <div className={styles["profile-image-container"]}>
                        <img src="/Images/avatar.png" alt="" className={styles["profile-image"]} />
                    </div>
                    <label>
                        <Input type="file" style={{ display: "none" }} id="picfileInput" name="profilePic" accept="image/*" />
                    </label>
                    <Button className={styles["pic-icon"]}
                        variant="contained" color='secondary' onClick={(e) => document.getElementById('picfileInput').click()}>Change Picture<CloudUpload /></Button>
                </div>
                <div>
                    <TextField name="fname" label="First Name" id="fname" required variant='outlined' color='warning' style={{ width: "50%" }} />
                    <TextField name="lname" label="Last Name" id="lname" required variant='outlined' color='warning' style={{ width: "50%" }} /></div>
                <TextField type="email" name="email" id="emailaddress" label="Email" variant='filled' disabled fullWidth />
                <Button type="submit" variant="contained" color='success' className={styles["submit-button"]}>Submit</Button>

            </FormControl>
        </div>)
}

export default DetailsForm
{/* 
            var data = await userController.getMyProfile();
            function fillPresentDetails(data) {

    if (data.firstName != "" && data.firstName != null) {
                $("#fname").prop("disabled", true)
        $("#fname").val(data.firstName)
    }
            if (data.lastName != "" && data.lastName != null) {
                $("#lname").prop("disabled", true)
        $("#lname").val(data.lastName)
    }
            if (data.username != null && data.username != "") {
                $("#emailaddress").prop("disabled", true)
        $("#emailaddress").val(data.username)
    }

            if ((data.profilePic) != "") {
                $(".profile-image").attr("src", "data:image/png;base64," + data.profilePic)
        $("#picfileInput").val(data.profilePic);

    } else if (data.googleProfilePic != "") {
                $(".profile-image").attr("src", data.googleProfilePic)
        $("#picfileinput").val(data.googleProfilePicture);

    } else {
                $(".profile-image").attr("src", "/Images/avatar.png")
        $("#picfileinput").val("");

    }


}

            $("#picfileInput").change(function (event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function () {
                $(".profile-image").attr("src", reader.result);
        }

            reader.readAsDataURL(file);
    }
})
            fillPresentDetails(data); */}