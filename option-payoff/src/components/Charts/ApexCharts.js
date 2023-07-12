import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { payOffPrice } from '../../utils/utils.js';


import './ApexCharts.css';

const ApexCharts = ({ data, height, width }) => {
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
      data.forEach((order) => {
        combinedPayoffValue += payOffPrice(price, order.orderType, order.orderStrike, order.orderPrice) * lot * lotSize;
      });
      return parseFloat(combinedPayoffValue.toFixed(2)); 
    });

    setCombinedPayoff(payoff);
  }, [data]);

  const series = [
    {
      name: 'Combined Payoff',
      data: combinedPayoff,
    },
  ];

  const options = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 0,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Area with Negative Values',
      align: 'left',
      style: {
        fontSize: '14px',
      },
    },
    xaxis: {
      categories: underlyingPrices.map((value) => value.toFixed(0)),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#8e8da4',
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      floating: false,
      labels: {
        style: {
          colors: '#8e8da4',
        },
        offsetY: -7,
        offsetX: 0,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      colors: combinedPayoff.map((value) => (value >= 0 ? '#0000ff' : '#0000ff')),
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    tooltip: {
      x: {
        format: 'yyyy',
      },
      fixed: {
        enabled: false,
        position: 'topRight',
      },
    },
    grid: {
      yaxis: {
        lines: {
          offsetX: -30,
        },
      },
      padding: {
        left: 20,
      },
    },
  };



  return (
    <div id="chart"> {combinedPayoff.length > 0 && (
      <ReactApexChart options={options} series={series} type="area" height={height} width={width} />
    )}</div>
  );
};

export default ApexCharts;
