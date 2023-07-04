import React from 'react';
import { Line } from 'react-chartjs-2';
import './OptionPayoffGraph.css';

import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';

ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement);

function OptionPayoffGraph() {
  const spotPrice = 44700;
  const callSold = 44700;
  const putSold = 44700;
  const putBuy = 44500;
  const buyPremium = 150;
  const callPremium = 264;
  const putPremium = 216;
  const lotSize = 25;
  const lot = 1;
  const underlyingPrices = [];
  const combinedPayoff = [];

  // Generate underlying price range
  for (let i = spotPrice - 500; i <= spotPrice + 500; i += 100) {
    underlyingPrices.push(i);
  }

  // Calculate combined payoff
  const cePayoff = 0;
  const pePayoff = 0;
  const buyPayoff = 0;

  for (let i = 0; i < underlyingPrices.length; i++) {
    const underlyingPrice = underlyingPrices[i];
    console.log(underlyingPrice);


    // const callPayoff = underlyingPrice <= callSold ? callPremium - (callSold - underlyingPrice) : -callPremium;
    //const putPayoff = underlyingPrice >= putSold ? putPremium - (underlyingPrice - putSold) : -putPremium;

    const cePayoff = underlyingPrice <= callSold ? callPremium : (callSold - underlyingPrice + callPremium);
    const pePayoff = underlyingPrice >= putSold ? putPremium : (underlyingPrice - putSold + putPremium);
    const buyPayoff = underlyingPrice >= putBuy ? -buyPremium : (putBuy - underlyingPrice - buyPremium);

    const combinedPayoffValue = (cePayoff + pePayoff + buyPayoff) * lot * lotSize;
    console.log(buyPayoff);
    combinedPayoff.push(combinedPayoffValue);
  }

  // const data = {
  //   labels: underlyingPrices,
  //   datasets: [
  //     {
  //       label: 'Combined Payoff',
  //       data: combinedPayoff,
  //       borderColor: 'rgb(53, 162, 235)',
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //       fill: true,
  //     },
  //   ],
  // };
  const data = {
    labels: underlyingPrices,
    datasets: [
      {
        label: 'Combined Payoff',
        data: combinedPayoff,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: (context) => {
          const index = context.dataIndex;
          const payoff = combinedPayoff[index];
          return index === 0 ? 'rgba(255, 0, 0, 0.5)' : (payoff >= 0 ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0)');
        },
        fill: true,
      },
    ],
  };
  
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Option Payoff Graph',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Underlying Price',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Payoff',
        },
      },
    },
  };
  const maxProfit = combinedPayoff.length > 0 ? Math.max(...combinedPayoff) : 0;
  return (
    <div className="center">

      <h1 className=''>Payoff Graph</h1>
      <div className="line__chart">

        <div className="left">
          <p>Spot: {spotPrice}</p>
          <p>Call Strike Sell: {callSold}  &nbsp; price:{callPremium}</p>
          <p>Put Strike Sell: {putSold}  &nbsp; price:{putPremium}</p>
          <p>Put Strike Buy: {putBuy}  &nbsp; price:{buyPremium}</p>
          <p>Maximum Profit: {maxProfit}</p>
        </div>
        
        <div className="right">
          <Line data={data} options={options} />
        </div>

      </div>
    </div>





  );
}

export default OptionPayoffGraph;
