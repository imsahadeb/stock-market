import express from 'express';
import fyers from 'fyers-api-v2';
import fyersData from '../config/fyersData.js';


fyers.setAppId(fyersData.appId);
fyers.setAccessToken(fyersData.accessToken);

const router = express.Router();

console.log('Router loaded');

router.get('/profile', async (req, res) => {
  try {
    const data = await fyers.get_profile(); // Call fetchData and wait for the response
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
})



router.get('/funds', async (req, res) => {
  console.log('calling');
  try {
    const data = await fyers.get_funds(); // Call fetchData and wait for the response
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
});




router.get('/positions', async (req, res) => {
  console.log('calling');
  try {
    const data = await fyers.get_positions(); // Call fetchData and wait for the response
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
});


router.get('/quotes/:id', async (req, res) => {
  console.log('calling');
  try {
    const q = req.params.id.toUpperCase();
    const symbol = `NSE:${q}-EQ`;
    console.log(symbol);
    const quotes = new fyers.quotes();
    const data = await quotes.setSymbol(symbol).getQuotes();
    console.log(data);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
});


router.get('/quotes/', async (req, res) => {
  console.log('calling');
  try {

    const quotes = new fyers.quotes();
    const data = await quotes.setSymbol('NSE:BANKNIFTY2370645000CE,NSE:BANKNIFTY2370645000PE').getQuotes();
   
    const strikes = data.d.map(item => {
      const symbol = item.n; // "NSE:BANKNIFTY2370645000CE" or "NSE:BANKNIFTY2370645000PE"
      const strike = symbol.split(':')[1].slice(0, -2); // "45000CE" or "45000PE"
      return strike;
    });
    
    console.log(strikes);
    console.log(data);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
});


router.get('/option-chain', async (req, res) => {
  try {
    const underlyingSymbol = 'BANKNIFTY'; // Replace with your underlying symbol
    const expiryDate = new Date('2023-07-06'); // Specify the next expiry date
    const startStrikePrice = 44000; // Starting strike price
    const endStrikePrice = 46000; // Ending strike price
    const strikePriceGap = 100; // Gap between strike prices
    
    const symbols = generateOptionSymbols(underlyingSymbol, expiryDate, startStrikePrice, endStrikePrice, strikePriceGap);
    
    const quotes = new fyers.quotes();
    const data = await quotes.setSymbol(symbols.join(',')).getQuotes();
    
    const optionChain = {};
    
    data.d.map(item => {
      const symbol = item.n;
      const strike = symbol.split(':')[1].slice(14, -2);
      
      const askPrice = item.v.ask;
      const bidPrice = item.v.bid;
      const change = item.v.ch;
      const lastPrice = item.v.lp;
      const volume =formatVolume(item.v.cmd.v);
      
      const option = {
        symbol,
        strike,
        askPrice,
        bidPrice,
        change,
        lastPrice,
        volume
      };
  
      if (!optionChain[strike]) {
        optionChain[strike] = [];
      }
      
      optionChain[strike].push(option);
    });
    
    res.json(optionChain);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function generateOptionSymbols(underlyingSymbol, expiryDate, startStrikePrice, endStrikePrice, strikePriceGap) {
  const options = [];
  
  const ex = 'NSE'; // Exchange code
  const exUnderlying = underlyingSymbol.toUpperCase(); // Underlying symbol code
  const yy = expiryDate.getFullYear().toString().substr(-2); // Last two digits of the year
  const m = getMonthCode(expiryDate.getMonth() + 1); // Month code
  const dd = ('0' + expiryDate.getDate()).slice(-2); // Day
  
  const optTypes = ['CE', 'PE']; // Option types (Call and Put)
  
  for (let strikePrice = startStrikePrice; strikePrice <= endStrikePrice; strikePrice += strikePriceGap) {
    optTypes.forEach(optType => {
      const symbol = `${ex}:${exUnderlying}${yy}${m}${dd}${strikePrice}${optType}`;
      options.push(symbol);
    });
  }
  
  return options;
}

function getMonthCode(month) {
  if (month >= 1 && month <= 9) {
    return month.toString();
  } else {
    switch (month) {
      case 10:
        return 'o';
      case 11:
        return 'n';
      case 12:
        return 'd';
      default:
        throw new Error('Invalid month');
    }
  }
}



function formatVolume(volume) {
  if (volume >= 10000000) {
    return (volume / 10000000).toFixed(2) + 'cr';
  } else if (volume >= 100000) {
    return (volume / 100000).toFixed(2) + 'l';
  } else if (volume >= 1000) {
    return (volume / 1000).toFixed(2) + 'k';
  } else {
    return volume.toString();
  }
}





export default router;