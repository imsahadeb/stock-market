import { React, useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';


import { payOffPrice } from '../../utils/utils.js';


const OptionPayoffGraph = ({orders}) => {
 
  const [combinedPayoff, setCombinedPayoff] = useState([]);


  useEffect(() => {
    const spotPrice = 44700;
    const lotSize = 25;
    const lot = 1;
    const strikes = [];
    for (let i = spotPrice - 1000; i <= spotPrice + 1000; i += 100) {
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
  }, [orders]);

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
          <stop offset={off} stopColor="red" stopOpacity={.7} />
          <stop offset={off} stopColor="green" stopOpacity={.7} />
        </linearGradient>
      </defs>
      <Area type="stright" dataKey="profit" stroke="#000" fill="url(#splitColor)" />
    </AreaChart>
  )
}

export default OptionPayoffGraph
