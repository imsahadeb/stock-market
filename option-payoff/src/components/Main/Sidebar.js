import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faGear, faHome, faNewspaper, faWallet } from '@fortawesome/free-solid-svg-icons'


const Sidebar = () => {
    return (
        <div className="sidebar">
            <button className="side__item selected">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
            </button>

            <button className="side__item">
                <FontAwesomeIcon icon={faNewspaper} />
                <span> News</span>
            </button>
            <button className="side__item">
                <FontAwesomeIcon icon={faNewspaper} />
                <span> Blog</span>
            </button>
            <button className="side__item">
                <FontAwesomeIcon icon={faWallet} />
                <span> Portfolio</span>
            </button>

            <button className="side__item">
                <FontAwesomeIcon icon={faWallet} />
                <span> Intraday Position</span>
            </button>
           
            <button className="side__item">
                <FontAwesomeIcon icon={faGear} />
                <span> Strategy Builder</span>
            </button>

        </div>
    )
}

export default Sidebar