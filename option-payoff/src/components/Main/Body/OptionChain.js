import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios.js'
import requests from '../../../api/requests.js';
import './OptionChain.css'

const OptionChain = () => {
  const [optionChain, setOptionChain] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requests.getOptionChain('banknifty', '2023-07-13'));
       console.log(response.data);
        setOptionChain(response.data);
      } catch (error) {
        console.error('Error fetching option chain:', error);
      }
    };

    fetchData();
    // Fetch data every second
    // const interval = setInterval(fetchData, 1000);

    // // Cleanup interval on component unmount
    // return () => clearInterval(interval);
  }, []);
  return (
    <div className="universal__body">

      <div className="top__nav">
        <div className="top__nav__left">
          <button className="top__navbutton">Summary</button>
          <button className="top__navbutton">13th July</button>
          <button className="top__navbutton">20th July</button>
          <button className="top__navbutton">27th July</button>
        </div>
        <div className="top__nav__right">
          <button className="top__navbutton">Nifty 50</button>
          <button className="top__navbutton">Bank Nifty</button>
        </div>
      </div>
      <div className="chain__navbar">
        <div className="call"><span>Calls</span></div>
        <div className="strike"><span>Strike Price</span></div>
        <div className="put"><span>Puts</span></div>
      </div>
      <div className="chain__body__menu">
        <div className="call__menu">
          <span>Volume</span><span>Ask Price</span><span>Bid Price</span><span>Last price</span>
        </div>
        <div className="strike__menu"></div>
        <div className="put__menu">
          <span>Volume</span><span>Ask Price</span><span>Bid Price</span><span>Last price</span>
        </div>
      </div>
      <div className="chain__body">
    
        {Object.entries(optionChain).map(([strike, options]) => (

          <div className="option__chain__data__row">
            <div className="call__data">
              <span>{options[0]?.volume}</span><span>{options[0]?.askPrice}</span><span>{options[0]?.bidPrice}</span><span>{options[0]?.lastPrice}</span>
            </div>
            <div className="strike__data"><span>{strike}</span></div>
            <div className="put__data">
              <span>{options[1]?.lastPrice}</span><span>{options[1]?.bidPrice}</span><span>{options[1]?.askPrice}</span><span>{options[1]?.volume}</span>
            </div>
          </div>


        ))}


      </div>
    </div>
  )
}

export default OptionChain