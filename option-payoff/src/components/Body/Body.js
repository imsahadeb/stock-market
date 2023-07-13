import React from 'react'
import './Body.css'
import Sidebar from '../SideBar/Sidebar'
import { Route, Routes } from "react-router-dom";
import Positions from './Positions'
import Home from './Home'
import News from './News'
import Blog from './Blog'
import Portfolio from './Portfolio'
import StrategyBuilder from './StrategyBuilder'
import OptionChain from './OptionChain'

import Oi from './Oi';

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
                    <Route path='/oi' element={<Oi/>}/>
                    
                </Routes>
              
          
            </div>
        </div>
    )
}