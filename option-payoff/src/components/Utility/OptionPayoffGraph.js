import React, { useEffect, useState } from 'react';
import {payOffPrice} from '../../utils/utils'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,

  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Legend
);

const OptionPayoffGraph = ({ orders }) => {
  const [underlyingPrices, setUnderlyingPrices] = useState([]);
  const [combinedPayoff, setCombinedPayoff] = useState([]);


  useEffect(() => {
    const spotPrice = 44700;
    const lotSize = 25;
    const lot = 1;
    const prices = [];

    // Generate underlying price range
    for (let i = spotPrice - 1000; i <= spotPrice + 1000; i += 100) {
      prices.push(i);
    }

    setUnderlyingPrices(prices);

    // Calculate combined payoff
    const payoff = prices.map((price) => {

      let combinedPayoffValue = 0;
      orders.forEach((order) => {
        combinedPayoffValue += payOffPrice(price, order.orderType, order.orderStrike, order.orderPrice) * lot * lotSize;
      });
      return parseFloat(combinedPayoffValue.toFixed(2));
    });

    setCombinedPayoff(payoff);
  }, [orders]);

  console.log("combined payoff", combinedPayoff);

  const labels = underlyingPrices;
  console.log('labels', underlyingPrices);

  console.log(combinedPayoff);
  const data = {
    labels,
    datasets: [
      {
        fill: {
          target: 'origin',
          above: '#007ACC',   // Area will be red above the origin
          below: 'blue'    // And blue below the origin
        },
        data: combinedPayoff,
        borderColor: '#007ACC'


      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },

    },
    maintainAspectRatio: false, // Added to allow setting custom height and width

  };



  return (

    <Line options={options} data={data} />

  )
}

export default OptionPayoffGraph