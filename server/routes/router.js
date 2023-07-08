import express from 'express';
import { getDateByOffset, getCharts, generateFutureSymbol, getFuturePrice, getStrike, getOptionChain, getNSEOptionChain, getExpiryDates } from '../Utilis/utils.js';
import fyers from '../config/fyers.js';
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




router.get('/future/:id', async (req, res) => {
  console.log('calling');
  try {
    const q = req.params.id.toUpperCase();
    const symbol = generateFutureSymbol(q);
    console.log(symbol);
    const quotes = new fyers.quotes();
    const data = await quotes.setSymbol(symbol).getQuotes();
    console.log(data);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
});




router.get('/charts/:id', async (req, res) => {
  console.log('calling');
  try {
    const offset = 0;
    const data = await getCharts(offset, req.params.id);
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
    const data = await quotes.setSymbol('NSE:BANKNIFTY2370645000CE,NSE:NIFTY2370619000PE').getQuotes();

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



router.get('/option-chain/:symbol/:expiry', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const expiry = req.params.expiry;

    const data = await getOptionChain(symbol, expiry, 100);
    console.log("****************************************************");
    console.log("call:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/nse-optionschain/:symbol/:expiry', async (req, res) => {
  //symbol.toUpperCase();
  try {
    const symbol = req.params.symbol;
    const expiry = req.params.expiry;

    const data = await getNSEOptionChain(symbol.toUpperCase(), expiry);
    console.log("****************************************************");
    console.log("call:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


router.get('/getexpiry/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await getExpiryDates(symbol.toUpperCase());
    console.log("****************************************************");
    console.log("call expiry dates:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


export default router;