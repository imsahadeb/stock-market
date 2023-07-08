import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faGear, faHome, faNewspaper, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    const currentPath = location.pathname;
    return currentPath === path ? 'side__item selected' : 'side__item';
  };

  return (
    <div className="sidebar">
      <Link to="/" className={isActive('/')}>
        <FontAwesomeIcon icon={faHome} />
        <span>Home</span>
      </Link>
      <Link to="/news" className={isActive('/news')}>
        <FontAwesomeIcon icon={faNewspaper} />
        <span>News</span>
      </Link>
      <Link to="/blog" className={isActive('/blog')}>
        <FontAwesomeIcon icon={faNewspaper} />
        <span>Blogs</span>
      </Link>
      <Link to="/portfolio" className={isActive('/portfolio')}>
        <FontAwesomeIcon icon={faWallet} />
        <span>Portfolio</span>
      </Link>
      <Link to="/positions" className={isActive('/positions')}>
        <FontAwesomeIcon icon={faChartSimple} />
        <span>Intraday Position</span>
      </Link>
      <Link to="/builder" className={isActive('/builder')}>
        <FontAwesomeIcon icon={faGear} />
        <span>Strategy Builder</span>
      </Link>
      <Link to="/optionchain" className={isActive('/optionchain')}>
        <FontAwesomeIcon icon={faChartSimple} />
        <span>Options Chain</span>
      </Link>
      <Link to="/oi" className={isActive('/oi')}>
        <FontAwesomeIcon icon={faChartSimple} />
        <span>Open Interest</span>
      </Link>
     
    </div>
  );
};

export default Sidebar;
