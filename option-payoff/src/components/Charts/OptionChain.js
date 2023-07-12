import React, { useEffect, useState } from 'react';
import './OptionChain.css';

const OptionChain = () => {
  const [optionChain, setOptionChain] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/option-chain');
            const data = await response.json();
            setOptionChain(data);
        } catch (error) {
            console.error('Error fetching option chain:', error);
        }
    };

    fetchData();
        // Fetch data every second
        // const interval = setInterval(fetchData, 1000);

        // // Cleanup interval on component unmount
        // return () => clearInterval(interval);
}, []);

    return (
        <div className="container">
            <div className="option__chain">
                <div className="table__head">
                    <div className="table__col">LTP</div>
                    <div className="table__col">Strike</div>
                    <div className="table__col">LTP</div>
                </div>
                <div className="chain__container">
                {Object.entries(optionChain).map(([strike, options]) => (
                        <div className='chain__row' key={strike}>
                            
                            <div className="chain__item">{options[0]?.lastPrice}</div>
                            <div className="chain__item">{strike}</div>
                            <div className="chain__item">{options[1]?.lastPrice}</div>
                        </div>
                    ))}

                </div>

            </div>

            <div className="payoff__graph">

            </div>


            {/* <table className="option-table">
        <thead>
          <tr>
            <th>Strike</th>
            <th>CE Last Price</th>
            <th>PE Last Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(optionChain).map(([strike, options]) => (
            <tr key={strike}>
              <td>{strike}</td>
              <td>{options[0]?.lastPrice}</td>
              <td>{options[1]?.lastPrice}</td>
            </tr>
          ))}
        </tbody>
      </table> */}




        </div>
    );
};

export default OptionChain;
