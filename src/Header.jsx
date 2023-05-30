import './App.css';
import React from 'react';

const headerStyle = {
    backgroundColor: "orange",
    color: "white",
    padding: "10px",
}
function Header() {
    return (

        <h1 className="navbar-brand" style={headerStyle}>ShediKeep</h1>

    )
}

export default Header;