import React from 'react'
import './Body.css'
import Sidebar from './Sidebar'
import { Route, Routes } from "react-router-dom";
import Positions from './BodyComponents/Positions'
import Home from './BodyComponents/Home'
import News from './BodyComponents/News'
import Blog from './BodyComponents/Blog'
import Portfolio from './BodyComponents/Portfolio'
import StrategyBuilder from './BodyComponents/StrategyBuilder'
import OptionChain from './BodyComponents/OptionChain'

export const Body = () => {

    return (
        <div className="body">
            <Sidebar />
            <div className="main__body">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/portfolio' element={<Portfolio />} />
                    <Route path='/positions' element={<Positions />} />
                    <Route path='/builder' element={<StrategyBuilder/>}/>
                    <Route path='/optionchain' element={<OptionChain/>}/>
                    
                </Routes>
              
                {/* <Home />
                <News />
                <Blog />
                <Portfolio />
                <Positions />
                <StrategyBuilder />
                <OptionChain /> */}
            </div>
        </div>
    )
}