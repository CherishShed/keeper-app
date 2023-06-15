import React from 'react';
import ReactDOM from 'react-dom';
import "../auth.css"
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
function Login() {
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
                    <TextField variant='standard' label="Email" type='email' color='warning' required InputProps={{ startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment> }} />
                    <TextField variant='standard' label="Password" type='password' color="warning" required InputProps={{ startAdornment: <InputAdornment position="start"><EnhancedEncryptionIcon /></InputAdornment> }} />
                    <p className='signup-text'>Don't have an account? <a className='signup-link' href="/">Sign Up</a></p>
                    <Button className='loginButton' type="submit" variant='contained' size='large'>Login</Button>

                </Box>
            </div>
        </div>

    )
}

export default Login;