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

    // Calculate combined payoffj
    const payoff = prices.map((price) => {
      // const cePayoff = payOffPrice(price, orderType.CE_SOLD , 44700, 264);
      // const pePayoff = payOffPrice(price, orderType.PE_SOLD, 44700, 216);
      // const buyPayoff = payOffPrice(price, orderType.PE_BUY, 44500, 150);
      // const combinedPayoffValue = (cePayoff + pePayoff + buyPayoff) * lot * lotSize;
      // return combinedPayoffValue;
      let combinedPayoffValue = 0;
      data.map((orders) => {
        combinedPayoffValue = combinedPayoffValue + payOffPrice(price, orders.orderType, orders.orderStrike, orders.orderPrice) * lot * lotSize;
        return combinedPayoffValue;
      })
      return combinedPayoffValue;
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
