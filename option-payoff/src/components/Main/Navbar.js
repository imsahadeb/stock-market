import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faSearch, faSun, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left__navbar">
                <div className="logobar">
                    <FontAwesomeIcon icon={faChartSimple} className='logo' />
                    <span>Trading Ninjas</span>
                </div>
                <div className="search__bar">
                    <input type="text" placeholder='Search...' />
                    <FontAwesomeIcon icon={faSearch} className='search__icon' />
                </div>

            </div>
            <div className="right__navbar">
                <div className="login__button">
                    <span>Login</span>
                    <FontAwesomeIcon icon={faUser} className='login__icon' />
                </div>
            </div>
        </div>
    )
}

export default Navbar