import React from 'react'

import './OptionChain.css'
import OpenInterest from './OpenInterest'
const OptionChain = () => {
  return (
    <div className="universal__body">
     <OpenInterest symbol={'banknifty'} expiry={'2023-07-13'} width='100%' height='600'/>
    </div>
  )
}

export default OptionChain