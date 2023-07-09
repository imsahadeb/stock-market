import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from '../../../api/axios.js'
import requests from '../../../api/requests.js';
import './OpenInterest.css'
const OpenInterest = ({symbol,expiry, height='100%', width='100%'}) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(requests.getOptionChain(symbol,expiry));
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [symbol,expiry]);

    const series = [
        {
            name: 'CE Volume',
            data: Object.values(data).map((option) => option[0].volume),
            color:'#E96767'
        },
        {
            name: 'PE Volume',
            data: Object.values(data).map((option) => option[1].volume),
            color:'#63D168'
        },
    ];

    const options = {
        chart: {
            type: 'bar',
          
        },
        grid:{
            show:false
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
                
                
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: Object.keys(data).map((strike) => parseInt(strike)),
            title: {
                text: 'Strike',
            },
        },
        yaxis: {
            title: {
                text: 'Volume',
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                },
            },
        },
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} height={height} width={width} type="bar"/>
        </div>
    );
};

export default OpenInterest;
