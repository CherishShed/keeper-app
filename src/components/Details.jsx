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
    const [toastText, settoastText] = useState("")

    function picChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            // setUserData({ ...userData, profilePic: file });
            const reader = new FileReader();
            reader.onload = function () {
                // console.log(reader.result);
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
    useEffect(() => {
        if (toastText === "Error Occured") {
            toast.error(toastText, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'foo-bar',
                pauseOnHover: false,
                autoClose: 1000,
                theme: "light"
            });
        } else if (toastText === "Successful") {
            toast.success(toastText, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'foo-bar',
                pauseOnHover: false,
                autoClose: 1000,
                theme: "light"
            });
        }
        else {
            return;
        }
    }, [toastText])
    function handleSubmit(event) {
        console.log("here");
        event.preventDefault();
        axios.post("http://localhost:8081/userDetails", event.target, { headers: { Authorization: localStorage.getItem("token") } })
            .then((result) => {
                console.log(result);
                settoastText(result.data.message)
                setTimeout(() => {
                    if (result.data.success) {
                        window.location.pathname = "/"
                    }
                }, 1000)
            })
    }
    return (
        <div className={styles["details-container"]}>
            <ToastContainer />
            <FormControl component="form" className={styles["details-form"]} onSubmit={(e) => handleSubmit(e)}>
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
                    <TextField name="firstName" label="First Name" id="fname" required variant='outlined' color='warning' style={{ width: "50%" }} value={userData.firstName}
                        onChange={(e) => {
                            setUserData({ ...userData, firstName: e.target.value })
                        }}

                    />
                    <TextField name="lastName" label="Last Name" id="lname" required variant='outlined' color='warning' style={{ width: "50%" }} value={userData.lastName}
                        onChange={(e) => {
                            setUserData({ ...userData, lastName: e.target.value })
                        }}
                    />
                </div>
                <TextField type="email" name="username" id="emailaddress" label="Email" variant='filled' fullWidth value={userData.username} InputProps={{ startAdornment: <InputAdornment position='start'><AccountCircleIcon /></InputAdornment> }}
                    disabled />
                <Button type="submit" size="large" variant="contained" color='success' className={styles["submit-button"]}>Submit</Button>

            </FormControl>
        </div>)
}

export default DetailsForm
