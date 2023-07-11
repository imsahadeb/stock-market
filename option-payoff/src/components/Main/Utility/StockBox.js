
import React, { useEffect, useState } from 'react';
import './StockBox.css';
import axios from '../../../api/axios.js'
import requests from '../../../api/requests.js';
const StockBox = ({ stockName, onClick }) => {
  const [stockDetails, setStockDetails] = useState(null);

  useEffect(() => {
    let interval;

    if (stockName) {
      const fetchStockDetails = async () => {
        try {
          const response = await axios.get(requests.getQuotes(stockName));
          const data = response.data;
          console.log(data);
          if (data && data.code === 200 && data.d && data.d.length > 0) {
            const stockData = data.d[0];
            setStockDetails(stockData);
          }
        } catch (error) {
          console.log('Error fetching stock details:', error);
        }
      };

      // Fetch stock details initially
      fetchStockDetails();

      // Fetch stock details every second
      const isWeekday = new Date().getDay() >= 1 && new Date().getDay() <= 5;
      const isTradingHours = isWeekday && new Date().getHours() >= 9 && new Date().getHours() < 15;
      const intervalTime = isTradingHours ? 1000 : 60000000;
      interval = setInterval(fetchStockDetails, intervalTime);
    }

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [stockName]);

  if (!stockDetails) {
    return <div className='loading'>Loading...</div>;
  }

  const { v: stockValues } = stockDetails;
  const { short_name, lp, chp } = stockValues;
  const isNegativeChange = chp < 0;

  return (
    <div className="stock__item" onClick={() => onClick(stockName)}>
      <div className="stockbox__top">{short_name}</div>
      <div className="stockbox__bottom">
        <div className="left">
          <span>{lp}</span>
          <span className={isNegativeChange ? 'rate__change negative' : 'rate__change'}>
            {chp}%
          </span>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default StockBox;

