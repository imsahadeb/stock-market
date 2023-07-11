import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './ApexCharts.css';

const ApexCharts = () => {
  const [underlyingPrices, setUnderlyingPrices] = useState([]);
  const [combinedPayoff, setCombinedPayoff] = useState([]);

  useEffect(() => {
    const spotPrice = 44700;
    const callSold = 44700;
    const putSold = 44700;
    const putBuy = 44500;
    const buyPremium = 150;
    const callPremium = 264;
    const putPremium = 216;
    const lotSize = 25;
    const lot = 1;
    const prices = [];

    // Generate underlying price range
    for (let i = spotPrice - 500; i <= spotPrice + 500; i += 100) {
      prices.push(i);
    }

    setUnderlyingPrices(prices);

    // Calculate combined payoff
    const payoff = prices.map((price) => {
      const cePayoff = price <= callSold ? callPremium : callSold - price + callPremium;
      const pePayoff = price >= putSold ? putPremium : price - putSold + putPremium;
      const buyPayoff = price >= putBuy ? -buyPremium : putBuy - price - buyPremium;
      const combinedPayoffValue = (cePayoff + pePayoff +buyPayoff) * lot * lotSize;
      return combinedPayoffValue;
    });

    setCombinedPayoff(payoff);
  }, []);

  const series = [
    {
      name: 'Combined Payoff',
      data: combinedPayoff,
    },
  ];

  const options = {
    chart: {
      type: 'area',
      height: 600,
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
    <div id="chart">
       {combinedPayoff.length > 0 && (
        <ReactApexChart options={options} series={series} type="area" height={600} width={900} />
      )}
    </div>
  );
};

export default ApexCharts;
