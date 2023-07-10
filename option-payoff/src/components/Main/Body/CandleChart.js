import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from '../../../api/axios.js';
import requests from '../../../api/requests.js';

const CandleChart = ({symbol, day,height, width}) => {
  const [chartsData, setChartsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requests.getCharts(symbol,day));
        setChartsData(response.data.candles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [symbol]);

  let series = [];

  if (chartsData && chartsData.length > 0) {
    const sortedData = chartsData.sort((a, b) => a[0] - b[0]); // Sort by time in ascending order

    series = [
      {
        data: sortedData.map(candle => ({
          x: new Date(candle[0] * 1000),
          y: [candle[1], candle[2], candle[3], candle[4]]
        }))
      }
    ];
  }

  const options = {
    chart: {
      type: 'candlestick',
      height: '450px'
    },
    grid:{
show:false
    },
    title: {
      text: symbol,
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value) {
          return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        style: {
          colors: 'white'// Set the color of x-axis labels
        }
      },
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors:'white' // Set the color of y-axis labels
        }
      }
    }
  };

  return (
    <ReactApexChart options={options} series={series} type="candlestick" height={height} width={width} />
  );
};

export default CandleChart;
