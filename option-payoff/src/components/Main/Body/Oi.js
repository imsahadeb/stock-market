import React from 'react'
import './Oi.css'
import OpenInterest from '../Utility/OpenInterest'
const Oi = () => {
  return (
    <div className="universal__body">
        <OpenInterest symbol={'banknifty'} width='100%' height='600'/>
    </div>
  )
}

export default Oi