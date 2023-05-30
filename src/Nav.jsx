import './App.css';
import React from 'react';

let navStyle = {
    display: 'flex',
    padding: "20px",
    justifyContent: 'space-between',
    alignItems: 'center'
};

let listStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: "20px"

};
const navItems = [
    { id: 1, brand: 'Ford' },
    { id: 2, brand: 'BMW' },
    { id: 3, brand: 'Audi' }
];
function NavList(props) {
    return <li className='nav-link'>{props.brand}</li>
}
function Nav() {
    return (
        <nav style={navStyle}>
            <div className='navbar-brand'>
                <h3>Testing</h3>
            </div>
            <ul className="navbar" style={listStyle}>
                {navItems.map((item) => <NavList key={item.id} brand={item.brand} />)}
            </ul>
        </nav>
    );
}


export default Nav;
