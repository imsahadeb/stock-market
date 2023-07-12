import React, { useEffect, useState } from 'react';
import ApexCharts from '../../Charts/ApexCharts'
import './/StrategyBuilder.css'
import axios from '../../../api/axios.js'
import requests from '../../../api/requests.js'
import { orderType } from '../../../constant/constantOrderType.js';

const StrategyBuilder = () => {
  const [optionChain, setOptionChain] = useState([]);
  const data = [
    {
      "orderType": orderType.CE_SOLD,
      "orderStrike": 44700,
      "orderPrice": 264
    },
    {
      "orderType": orderType.PE_SOLD,
      "orderStrike": 44700,
      "orderPrice": 216
    },
    {
      "orderType": orderType.PE_BUY,
      "orderStrike": 44500,
      "orderPrice": 150
    }
  ]

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
      <div className="builder__body">
        <div className="builder__body__left">
          <div className="options__chain">
            <div className="option__top__menu">
              <span >CE Price</span>
              <span>Strike</span>
              <span>PE Price</span>
            </div>

            <div className="option__chain__body">
              {Object.entries(optionChain).map(([strike, options]) => (
                <div className='option__chain__row' key={strike}>
{/* *






 */}
                  <span className='chain__data'>{options[0]?.lastPrice}</span>
                  <span className='chain__data'>{strike}</span>
                  <span className='chain__data'>{options[1]?.lastPrice}</span>
                </div>
              ))}


            </div>
          </div>
        </div>
        <div className="builder__body__right">
          <ApexCharts data={data} width={'100%'} height={'600px'} />
        </div>
      </div>

    </div>
  )
}

export default StrategyBuilder