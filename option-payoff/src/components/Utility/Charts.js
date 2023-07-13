import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';

const Charts = () => {
    const [chartData, setChartData] = useState([]);
    const [isChartRendered, setIsChartRendered] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/charts/sbin');
                const data = response.data;
                // Update chartData with the API response
                setChartData(data.candles);
            } catch (error) {
                console.log('Error fetching chart data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Render the chart when chartData changes
        const renderChart = () => {
            const sortedChartData = chartData.sort((a, b) => a[0] - b[0]); // Sort data based on timestamp

            const tradingHoursStart = new Date();
            tradingHoursStart.setHours(9, 15, 0, 0); // Set trading hours start time to 9:15 AM
            const tradingHoursEnd = new Date();
            tradingHoursEnd.setHours(15, 30, 0, 0); // Set trading hours end time to 3:30 PM

            const filteredChartData = sortedChartData.filter((candle) => {
                const timestamp = new Date(candle[0] * 1000);
                return timestamp >= tradingHoursStart && timestamp <= tradingHoursEnd;
            });

            const options = {
                chart: {
                    type: 'candlestick',
                    height: '400px', // Adjust the height here (e.g., '400px' or '80%')
                },
                grid: {
                    show: false
                },
                series: [
                    {
                        data: filteredChartData.map((candle) => ({
                            x: new Date(candle[0] * 1000),
                            y: [candle[1], candle[2], candle[3], candle[4]],
                        })),
                    },
                ],
                tooltip: {

                    fillSeriesColor: 'blue', // Change the tooltip background color here (e.g., '#ffffff' for white)
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function (value) {
                            const options = { hour: 'numeric', minute: 'numeric' };
                            return new Intl.DateTimeFormat('en-US', options).format(new Date(value));
                        },
                        style: {
                            colors: 'white', // Change the label color here (e.g., '#ff0000' for red)
                        },
                    },
                    min: tradingHoursStart.getTime(),
                    max: tradingHoursEnd.getTime(),
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: 'white', // Change the label color here (e.g., '#ff0000' for red)
                        },
                    },
                    tooltip: {
                        enabled: true,
                        colors: 'red'

                    }

                },
            };

            const chart = new ApexCharts(document.getElementById('chart'), options);
            chart.render();
        };

        if (chartData.length > 0 && !isChartRendered) {
            renderChart();
            setIsChartRendered(true);
        }
    }, [chartData, isChartRendered]);

    return <div id="chart" />;
};

export default Charts;
