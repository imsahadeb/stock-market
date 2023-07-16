
import express from 'express'
import { WebSocketServer } from 'ws';
import fyers from './config/fyers.js';
const app = express();

const data =
         
     {
      "s":"ok",
      "d":
      {
      "7202":[],
      "7208":[
              { 
                "s":"ok",
                "v":
                    {
                      "high_price":"102.25",
                      "prev_close_price":103.8,
                      "ch":-5.75,"tt":1618221225,
                      "description":"NSE:ONGC-EQ",
                      "short_name":"ONGC-EQ",
                      "exchange":"NSE",
                      "low_price":97.45,
                  "cmd":
                    {
                      "c":98.05,
                      "h":98.05,
                      "l":98,
                      "o":98.05,
                      "t":1618221180,
                      "v":113435,
                      "tf":""
                    },
                    "original_name":
                    "NSE:ONGC-EQ",
                    "chp":-5.54,
                    "open_price":100.85,
                    "lp":98.05,
                    "symbol":"NSE:ONGC-EQ",
                    "LTQ":50,
                    "L2_LTT":1618221225,
                    "ATP":99.24,
                    "volume":26073200,
                    "tot_buy":1136068,
                    "tot_sell":1658516,
                    "bid":98,
                    "ask":98.05,
                    "spread":0.04999999999999716,
                    "marketStat":2
                  }
                  ,"n":"NSE:ONGC-EQ",
                  "fy":10100000002475,
                  "fycode":7208
        
        }],"31038":[]
        }
     }
    


const getProfile = async ()=>{
    const data = await fyers.get_profile();
    console.log(data);
}

getProfile();

// const server = app.listen(3001, () => {
//   console.log('Server listening on port 3001');
// });


//const wss =  WebSocket.Server({ server });
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  const reqBody = {
    symbol: ['NSE:ONGC-EQ', 'NSE:IOC-EQ'],
    dataType: 'symbolUpdate'
  };

  fyers.fyers_connect(reqBody, function(data) {
    console.log(data);
    ws.send(data);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});