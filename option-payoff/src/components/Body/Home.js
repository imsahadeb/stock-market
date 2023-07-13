import React, { useState } from 'react';
import './Home.css';
import StockBox from '../Utility/StockBox';
import CandleChart from './CandleChart';

const Home = () => {
    const [selectedSymbol, setSelectedSymbol] = useState('reliance');

    const handleStockBoxClick = (symbol) => {
        console.log(symbol);
        setSelectedSymbol(symbol);
    };

    return (
        <div className="universal__body">
            <div className="stock__row">
                <StockBox stockName="sbin" onClick={() => handleStockBoxClick('sbin')} />
                <StockBox stockName="reliance" onClick={() => handleStockBoxClick('reliance')} />
                <StockBox stockName="hdfc" onClick={() => handleStockBoxClick('hdfc')} />
                <StockBox stockName="hdfcbank" onClick={() => handleStockBoxClick('hdfcbank')} />
                <StockBox stockName="wipro" onClick={() => handleStockBoxClick('wipro')} />
                <StockBox stockName="infy" onClick={() => handleStockBoxClick('infy')} />
            </div>
            <div className="stock__charts">
                <div className="stock__chart">
                    <CandleChart symbol={selectedSymbol} day={0} width={'100%'} height={'100%'} />
                </div>
                <div className="info__box"></div>
            </div>
            <div className="stock__charts">
                <div className="stock__chart"></div>
                <div className="info__box"></div>
            </div>
            <div className="stock__charts">
                <div className="stock__chart"></div>
                <div className="info__box"></div>
            </div>
        </div>
    );
};

export default Home;
