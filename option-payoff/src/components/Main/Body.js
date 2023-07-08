import React from 'react'
import './Body.css'
import Sidebar from './Sidebar'
import { Route, Routes } from "react-router-dom";
import Positions from './Body/Positions'
import Home from './Body/Home'
import News from './Body/News'
import Blog from './Body/Blog'
import Portfolio from './Body/Portfolio'
import StrategyBuilder from './Body/StrategyBuilder'
import OptionChain from './Body/OptionChain'
import OpenInterest from './Utility/OpenInterest';

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
                    <Route path='/oi' element={<OpenInterest/>}/>
                    
                </Routes>
              
          
            </div>
        </div>
    )
}