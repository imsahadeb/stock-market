import React, { useEffect, useState } from 'react';
import './StrategyBuilder.css';
import axios from '../../api/axios.js';
import requests from '../../api/requests.js';
import {orderType} from '../../constant/constantOrderType'
import OptionPayoffGraph from '../Utility/OptionPayoffGraph';



const StrategyBuilder = () => {
  const [optionChain, setOptionChain] = useState([]);

  const [orders, setOrders] = useState([
    {
      "orderType": orderType.CE_SOLD,
      "orderStrike": 44700,
      "orderPrice": 264
    },
    {
      "orderType": orderType.PE_SOLD,
      "orderStrike": 44700,
      "orderPrice": 216
    }
  ]);
  // const [dataChanged, setDataChanged] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requests.getOptionChain('banknifty', '2023-07-20'));
        console.log(response.data);
        setOptionChain(response.data);
      } catch (error) {
        console.error('Error fetching option chain:', error);
      }
    };

    fetchData();
  }, []);

  const handleReset = ()=>{
  const  newOrder = [{

    }];
    setOrders(newOrder);

  }
   const handleClick = (orderType, orderStrike, orderPrice) => {
    const newOrder = [
      ...orders,
      {
        "orderType": orderType,
        "orderStrike": orderStrike,
        "orderPrice": orderPrice
      }
    ];
    setOrders(newOrder);
    // setDataChanged(true);
    console.log(newOrder);
  };
  

  return (
    <div className="universal__body">
      <div className="builder__body">
        <div className="builder__body__left">
          <div className="options__chain">
            <div className="option__top__menu">
              <span>CE Price</span>
              <span>Strike</span>
              <span>PE Price</span>
            </div>

            <div className="option__chain__body">
              {Object.entries(optionChain).map(([strike, options]) => (

                <div className='option__chain__row' key={strike}>
                  <div className='chain__data__ce' ><span>{options[0]?.lastPrice}</span>
                    <div className="ce">
                      <button className="buy__btn" onClick={() => handleClick(orderType.CE_BUY, strike, options[0]?.lastPrice)}>B</button>
                      <button className="sell__btn" onClick={() => handleClick(orderType.CE_SOLD, strike, options[0]?.lastPrice)}>S</button>
                    </div>
                  </div>

                  <div className='chain__data__strike'>{strike}</div>

                  <div className='chain__data__pe'>
                    <div className="pe">
                      <button className="buy__btn" onClick={() => handleClick(orderType.PE_BUY, strike, options[1]?.lastPrice)}>B</button>
                      <button className="sell__btn" onClick={() => handleClick(orderType.PE_SOLD, strike, options[1]?.lastPrice)}>S</button>
                    </div>
                    <span>{options[1]?.lastPrice}</span>

                  </div>

                </div>

              ))}






            </div>
          </div>
        </div>
        <div className="builder__body__right">
          <div className="top__builder">
            <button className="reset__btn" onClick={()=>handleReset()}>Reset</button>
          </div>
          <div className="body__builder">
            {/* {<ApexCharts data={data} index={index} width={'100%'} height={'400px'} />} */}
            {/* <OptionPayoffGraph orders={orders} width={'100%'} height={'4000px'} /> */}
           {/* <OptionPayoffGraph orders={orders}  /> */}
           <OptionPayoffGraph orders={orders}/>

          </div>

        </div>
      </div>
    </div>
  );
};

export default StrategyBuilder;
