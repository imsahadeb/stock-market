// import React from 'react'
// import './Navbar.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChartSimple, faSearch, faSun, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'

// const Navbar = () => {
//     return (
//         <div className="navbar">
//             <div className="left__navbar">
//                 <div className="logobar">
//                     <FontAwesomeIcon icon={faChartSimple} className='logo' />
//                     <span>Trading Ninjas</span>
//                 </div>
//                 <div className="search__bar">
//                     <input type="text" placeholder='Search...' />
//                     <FontAwesomeIcon icon={faSearch} className='search__icon' />
//                 </div>

//             </div>
//             <div className="right__navbar">
//                 <div className="login__button">
//                     <span>Login</span>
//                     <FontAwesomeIcon icon={faUser} className='login__icon' />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Navbar

import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faSearch, faSun, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      const response = await axios.get(`/api/stocks/search?q=${query}`);

      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="navbar">
      <div className="left__navbar">
        <div className="logobar">
          <FontAwesomeIcon icon={faChartSimple} className="logo" />
          <span>Trading Ninjas</span>
        </div>
        <div className="search__bar">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
          <FontAwesomeIcon icon={faSearch} className="search__icon" />
        </div>
        {showPopup && (
          <div className="popup__window">
            <ul>
              {searchResults.map((result) => (
                <li key={result._id}>
                  <span>{result.SYMBOL}</span> - <span>{result['NAME OF COMPANY']}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="right__navbar">
        <div className="login__button">
          <span onClick={togglePopup}>Login</span>
          <FontAwesomeIcon icon={faUser} className="login__icon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
