

import React, { useEffect, useState } from 'react';
import './Positions.css';
import axios from '../../api/axios.js';
import requests from '../../api/requests.js';

const Positions = () => {
  const [closedPositions, setClosedPositions] = useState([]);
  const [totalPL, setTotalPL] = useState(0);
  const [tradedValue, setTradedValue] = useState(0);
  const [openPositionsCount, setOpenPositionsCount] = useState(0);
  const [closedPositionsCount, setClosedPositionsCount] = useState(0);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(requests.getPositinOfDhan);

        const closedPosition = data.data.filter(item => item.positionType === "CLOSED");
        setClosedPositions(closedPosition);

        // Calculate total P/L and traded value
        let totalPL = 0;
        let tradedValue = 0;

        closedPositions.forEach(position => {
          totalPL += position.daySellValue-position.dayBuyValue;
          tradedValue += position.dayBuyValue + position.daySellValue;
        });

        setTotalPL(totalPL);
        setTradedValue(tradedValue);
        setOpenPositionsCount(data.data.length - closedPositions.length);
        setClosedPositionsCount(closedPositions.length);
      } catch (error) {
        // If fetching positions fails, set values to 0 instead of throwing an error
        setTotalPL(0);
        setTradedValue(0);
        setOpenPositionsCount(0);
        setClosedPositionsCount(0);
        setFetchError(true);
      }
    };

    fetchData();
  }, [closedPositions]);

  if (fetchError) {
    // Render the component with values set to 0 if fetching fails
    return (
      <div className="universal__body">
        <div className="today__positions">
          <div className="top">
            <p>Today's Positions</p>
          </div>
          <div className="bottom">
            <div className="item">
              <span>P&amp;L</span>
              <span>0</span>
            </div>
            <div className="item">
              <span>Trade Value</span>
              <span>0</span>
            </div>
            <div className="item">
              <span>Open</span>
              <span>0</span>
            </div>
            <div className="item">
              <span>Closed</span>
              <span>0</span>
            </div>
            <div className="item">
              <span>Today's High</span>
              <span>1000</span>
            </div>
            <div className="item">
              <span>Today's Low</span>
              <span>1000</span>
            </div>
          </div>
        </div>
        <p>Open Positions</p>
        <div className="open__positions"></div>
        <p>Closed Positions</p>
        <div className="closed__positions">
          <div className="closed__top__menu">
            <div className="left__closed__topmenu">
              <div className="col">Name</div>
              <div className="col">Order</div>
            </div>
            <div className="right__closed__topmenu"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render the component normally if no error occurred
  return (
    <div className="universal__body">
      <div className="today__positions">
        <div className="top">
          <p>Today's Positions</p>
        </div>
        <div className="bottom">
          <div className="item">
            <span>P&amp;L</span>
            <span>{totalPL}</span>
          </div>
          <div className="item">
            <span>Trade Value</span>
            <span>{tradedValue}</span>
          </div>
          <div className="item">
            <span>Open</span>
            <span>{openPositionsCount}</span>
          </div>
          <div className="item">
            <span>Closed</span>
            <span>{closedPositionsCount}</span>
          </div>
          <div className="item">
            <span>Today's High</span>
            <span>1000</span>
          </div>
          <div className="item">
            <span>Today's Low</span>
            <span>1000</span>
          </div>
        </div>
      </div>
      <p>Open Positions</p>
      <div className="open__positions"></div>
      <p>Closed Positions</p>
      <div className="closed__positions">
        <div className="closed__top__menu">
          <div className="left__closed__topmenu">
            <div className="col">Name</div>
            <div className="col">Order</div>
          </div>
          <div className="right__closed__topmenu"></div>
        </div>
      </div>
    </div>
  );
};

export default Positions;

