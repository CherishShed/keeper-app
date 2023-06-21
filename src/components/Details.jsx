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
    const [userData, setUserData] = useState({ firstName: "", lastName: "", username: "" })


    function picChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function () {
                console.log(reader.result);
                document.getElementsByClassName(styles["profile-image"])[0].setAttribute("src", reader.result);
            }

            reader.readAsDataURL(file);
        }
    }
    useEffect(() => {
        axios.get("http://localhost:8081/", { headers: { Authorization: localStorage.getItem("token") } })
            .then((result) => {
                console.log(result);
                if (result.data.success) {
                    setUserData({ ...userData, username: result.data.user.username });
                }
            })
            .catch((error) => {
                window.location.pathname = "/login"
            })
    }, [])
    return (
        <div className={styles["details-container"]}>
            <FormControl method="POST" encType="multipart/form-data" className={styles["details-form"]}>
                <img alt="logo" src="Screenshot_2023-06-15_113137-removebg-preview.png" className='logo' />
                <div className={styles["pic-container"]}>
                    <div className={styles["profile-image-container"]}>
                        <img src="avatar.png" alt="" className={styles["profile-image"]} />
                    </div>
                    <label>
                        <Input type="file" style={{ display: "none" }} id="picfileInput" name="profilePic" accept="image/*" onChange={(e) => picChange(e)} />
                    </label>
                    <Button className={styles["pic-icon"]}
                        variant="contained" onClick={(e) => document.getElementById('picfileInput').click()}>Change Picture <CloudUpload /></Button>
                </div>
                <div>
                    <TextField name="fname" label="" placeholder='fname' id="fname" required variant='outlined' color='warning' style={{ width: "50%" }} value={userData.firstName} />
                    <TextField name="lname" label="Last Name" id="lname" required variant='outlined' color='warning' style={{ width: "50%" }} value={userData.lastName} /></div>
                <TextField type="email" name="email" id="emailaddress" label="Email" variant='filled' fullWidth value={userData.username} InputProps={{ startAdornment: <InputAdornment position='start'><AccountCircleIcon /></InputAdornment> }} />
                <Button type="submit" size="large" variant="contained" color='success' className={styles["submit-button"]}>Submit</Button>

            </FormControl>
        </div>)
}

export default DetailsForm
