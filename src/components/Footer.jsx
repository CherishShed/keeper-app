import React from 'react';

function Footer() {
    return (
        <>
            <footer className="footer">&copy; ShediKeep {new Date(Date.now()).getFullYear()}</footer>
        </>
    )
}

export default Footer;