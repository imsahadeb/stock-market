import React from 'react'
import './DashBoard.css'
import { Body } from '../Body/Body'
import Navbar from '../NavBar/Navbar'
const DashBoard = () => {
  return (
    <div className="main">
        <div className="top__navbar">
        <Navbar/>
        </div>
        <div className="top__space">

        </div>
        <Body/>
        
    </div>
  )
}

export default DashBoard