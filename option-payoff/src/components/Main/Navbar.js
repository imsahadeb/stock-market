import axios from '../../api/axios.js'
import requests from '../../api/requests.js';

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faSearch, faSun, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [dhanPositions, setDhanPositions] = useState([]);
  const [totalPnl, setTotalPnl] = useState(0);

  const calculatePNL = (position) => {
    const buyAvg = position.buyAvg;
    const sellAvg = position.sellAvg;
    const quantity = position.buyQty;

    const pnl = (sellAvg - buyAvg) * quantity;
    return pnl;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(requests.getPositinOfDhan);
      const positions = response.data;
      setDhanPositions(positions);

      // Calculate total PNL
      const pnlArray = positions.map((position) => calculatePNL(position));
      const totalPnl = pnlArray.reduce((accumulator, pnl) => accumulator + pnl, 0);
      setTotalPnl(totalPnl);
    }

    fetchData();
  }, []);
  const pnlColor = totalPnl < 0 ? 'red' : 'green';

  return (
    <div className="navbar">
      <div className="left__navbar">
        <div className="logobar">
          <FontAwesomeIcon icon={faChartSimple} className="logo" />
          <span>Trading Ninjas</span>
        </div>
        <div className="search__bar">
          <input type="text" placeholder="Search..." />
          <FontAwesomeIcon icon={faSearch} className="search__icon" />
        </div>
      </div>
      <div className="right__navbar">
        <div className="current__positions">
        Today's Positions: <span style={{ color: pnlColor }}>{totalPnl}</span>
        </div>
        <div className="login__button">
          <span>Login</span>
          <FontAwesomeIcon icon={faUser} className="login__icon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
