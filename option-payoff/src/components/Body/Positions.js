import React from 'react'
import './Positions.css'
const Positions = () => {
  const havePosition = false;
  const haveClosedPositions = false;
  return (
    <div className="universal__body">
      <div className="today__positions">
        <div className="top"><p>Today's Positions</p></div>
        <div className="bottom">
          <div className="item">
            <span>P&L</span>
            <span>1000</span>
          </div>
          <div className="item">
            <span>Trade Value</span>
            <span>1000</span>
          </div>
          <div className="item">
            <span>Open</span>
            <span>1000</span>
          </div>
          <div className="item">
            <span>Closed</span>
            <span>1000</span>
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

      <div className="open__positions">

      </div>
      <p>Closed Positions</p>
      <div className="closed__positions">
        <div className="closed__top__menu">
          <div className="left__closed__topmenu">
          <div className="col">Name</div>
          <div className="col">Order</div>

          </div>
          <div className="right__closed__topmenu">
            
          </div>
        </div>


      </div>

    </div>
  )
}

export default Positions