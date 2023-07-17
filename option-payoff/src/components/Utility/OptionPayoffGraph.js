import { React, useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import axios from '../../api/axios';
import request from '../../api/requests'
import { roundToNearest } from '../../utils/utils.js';
import { payOffPrice } from '../../utils/utils.js';


const OptionPayoffGraph = ({ orders }) => {

  const [combinedPayoff, setCombinedPayoff] = useState([]);
  const [indexPrice, setIndexPrice] = useState();



  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(request.getFutureQuotes('banknifty'));
 
     
      if (data.data && data.data.code === 200 ) {
        const price = data.data.d[0].v.lp;
        console.log("price",price);
        setIndexPrice(price)
        
      }
     
      
    }
    fetchData();
  //  console.log(indexPrice);
    const spotPrice = roundToNearest(indexPrice);
    const lotSize = 25;
    const lot = 1;
    const strikes = [];
    for (let i = spotPrice - 1500; i <= spotPrice + 1500; i += 100) {
      strikes.push(i);
    }



    const payoff = strikes.map((strike) => {
      let combinedPayoffValue = 0;
      orders.forEach((order) => {
        combinedPayoffValue += payOffPrice(strike, order.orderType, order.orderStrike, order.orderPrice) * lot * lotSize;
      });
      return {
        strike: strike,
        profit: parseFloat(combinedPayoffValue.toFixed(2))
      };
    });

    setCombinedPayoff(payoff);
  }, [orders, indexPrice]);

  const gradientOffset = () => {
    const dataMax = Math.max(...combinedPayoff.map((i) => i.profit));
    const dataMin = Math.min(...combinedPayoff.map((i) => i.profit));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();


  return (
    <AreaChart
      width={900}
      height={400}
      data={combinedPayoff}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="strike" />
      <YAxis />
      <Tooltip />
      <defs>
        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset={off} stopColor="#76FF80" stopOpacity={.95} />
          <stop offset={off} stopColor="#EF5350" stopOpacity={1} />

        </linearGradient>
      </defs>
      <Area type="stright" dataKey="profit" stroke="#000" fill="url(#splitColor)" />
    </AreaChart>
  )
}

export default OptionPayoffGraph
