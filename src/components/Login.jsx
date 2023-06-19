import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "../auth.css"
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { IconButton } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [helpText, setHelpText] = useState("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function handleButton(ev) {
        const passLength = formData.password.length;
        const usernameLength = formData.username.length;
        const offset = ev.target.offsetLeft;
        console.log(passLength, offset)
        let displace = "0px";
        if (passLength < 8 || usernameLength < 8) {
            if (offset <= 98) {
                displace = "100px";
            } else if (offset > 96) {
                displace = "-100px";
            }
            ev.target.setAttribute("disabled", true)
        } else {
            ev.target.removeAttribute("disabled")
            ev.target.style.background = "green"
        }
        ev.target.style.left = displace;
    }
    return (

        <div className="loginForm">
            <div className='login'>
                <img src="pexels-mockupbee-12039670.jpg" className='backImg' alt="back img" />
                <img src="Screenshot_2023-06-15_114647-removebg-preview.png" alt="welcome" className='welcome-img' />
                <Box component="form" className="formInput" display="flex" flexDirection="column" gap={2}>
                    <div>
                        <img alt="logo" src="Screenshot_2023-06-15_113137-removebg-preview.png" className='logo' />
                        <p>Welcome To Your Note Assistant</p>
                    </div>
                    <TextField helperText={helpText} variant='standard' label="Email" type='email' color='warning' required InputProps={{ startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment> }} className='form-input-field'
                        onChange={(e) => {
                            document.querySelector(".loginButton").style.left = "0px";
                            document.querySelector(".loginButton").removeAttribute("disabled");
                            setFormData({ ...formData, username: e.target.value })
                        }}
                        value={formData.username}
                        key={1}
                    />
                    <TextField key={2} helperText={helpText} onChange={(e) => {
                        document.querySelector(".loginButton").style.left = "0px";
                        document.querySelector(".loginButton").removeAttribute("disabled");
                        setFormData({ ...formData, password: e.target.value })
                    }} value={formData.password} variant='standard' label="Password" type={showPassword ? 'text' : "password"} color="warning" required InputProps={{
                        startAdornment: <InputAdornment position="start"><EnhancedEncryptionIcon /></InputAdornment>, endAdornment:
                            <InputAdornment position="end" >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                </IconButton>
                            </InputAdornment>
                    }} className='form-input-field password' />
                    <p className='signup-text'>Don't have an account? <a className='signup-link' href="/">Sign Up</a></p>
                    <Button className='loginButton' type="submit" variant='contained' size='large' onMouseEnter={(e) => handleButton(e)}>Login</Button>

                </Box>
            </div>
        </div>

    )
}

export default Login;