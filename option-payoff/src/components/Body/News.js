import React, { useEffect, useState } from 'react'
import axios from '../../api/axios.js'
import request from '../../api/requests.js'

import './News.css'

const News = () => {
  const [article, setArticale] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(request.getTopBusniessNews);
      console.log(data.data);
      setArticale(data.data.articles);
    }
    fetchData();

  }, [])
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="universal__body">
      <div className="news__box">
        {article.map((options) => {
          // const limitedDescription = options.description.slice(0, 100) + (options.description.length > 100 ? '...' : '');
          return (
            <div className="news__item">
              <div className="thubnail">
                <div className="img">
                  <img src={options.urlToImage} alt="" />
                </div>
              </div>
              <div className="description">
                <a href={options.url} target='blank'>
                  <span>{truncate(options.description, 140)}</span>
                </a>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

}

export default News