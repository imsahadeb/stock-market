import React from 'react'
import './Body.css'
import Sidebar from './Sidebar'
import HomeBody from './HomeBody'

export const Body = () => {
    return (
        <div className="body">
            <Sidebar />
            <div className="main__body">
                <HomeBody />
            </div>
        </div>
    )
}
