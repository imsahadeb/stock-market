import React, { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const MyComponent = () => {
    const [wsData, setWsData] = useState([]);
  useEffect(() => {
    const ws = new ReconnectingWebSocket('ws://localhost:8080');

    ws.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
  //  const data = event.data;
      console.log(data);
      setWsData(data);
      // Process the received data
    });

    ws.addEventListener('close', () => {
      console.log('WebSocket connection closed');
      // Handle the WebSocket connection closure
    });

    // Cleanup function
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
    <h1>web WebSocket</h1>
     <h1>{wsData.s}</h1>
    </div>
  );
};

export default MyComponent;
