import React from 'react'

import './OptionChain.css'

const OptionChain = () => {
  return (
    <div className="universal__body">
      {/* <OpenInterest symbol={'banknifty'} expiry={'2023-07-13'} width='100%' height='600'/> */}
      <div className="top__nav">
        <div className="top__nav__left">
          <button className="top__navbutton">Summary</button>
          <button className="top__navbutton">13th July</button>
          <button className="top__navbutton">20th July</button>
          <button className="top__navbutton">27th July</button>
        </div>
        <div className="top__nav__right">
          <button className="top__navbutton">Nifty 50</button>
          <button className="top__navbutton">Bank Nifty</button>
        </div>
      </div>
      <div className="chain__navbar">
        <div className="call"><span>Calls</span></div>
        <div className="strike"><span>Strike Price</span></div>
        <div className="put"><span>Puts</span></div>
      </div>
    </div>
  )
}

export default OptionChain