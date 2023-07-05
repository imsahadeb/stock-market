import React from 'react';
import { Line } from 'react-chartjs-2';
import './OptionPayoffGraph.css';

import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement,Tooltip } from 'chart.js';

ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement,Tooltip );

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

  for (let i = 0; i < underlyingPrices.length; i++) {
    const underlyingPrice = underlyingPrices[i];
    console.log(underlyingPrice);


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
        borderColor: 'blue',
        fill: true,
        backgroundColor:'blue'
       
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Option Payoff Graph',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Underlying Price',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Payoff',
        },
        grid: {
          display: false,
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
