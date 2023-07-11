import express from 'express';
import { getDateByOffset, getCharts, generateFutureSymbol, getFuturePrice, getStrike, getOptionChain, getNSEOptionChain, getExpiryDates } from '../Utilis/utils.js';
import fyers from '../config/fyers.js';
const router = express.Router();


console.log('Router loaded');




/**
 * Example Url http://localhost:8000/api/profiles
 */
router.get('/profile', async (req, res) => {
  try {
    const data = await fyers.get_profile(); // Call fetchData and wait for the response
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
})




/**
 * Example Url http://localhost:8000/api/funds
 */
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




/**
 * Example Url http://localhost:8000/api/positions
 */
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



// Exanple Url http://localhost:8000/api/quotes?symbol=sbin
router.get('/quotes', async (req, res) => {
  console.log('calling');
  try {
    const q = (req.query.symbol).toUpperCase();
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


// Example Url http://localhost:8000/api/future?symbol=banknifty
router.get('/future', async (req, res) => {
  console.log('calling');
  try {
    const q = req.query.symbol.toUpperCase();
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



// Example Url http://localhost:8000/api/charts?symbol=sbin&day=2
router.get('/charts', async (req, res) => {
  console.log('calling');
  try {
    const offset = req.query.day;
    const symbol = req.query.symbol;
    const data = await getCharts(offset, symbol);
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
});





/**
 * Example Url http://localhost:8000/option-chain?symbol=nifty&expiry=13-Jul-2023 for normal
 *  http://localhost:8000/option-chain?symbol=nifty&expiry=13-Jul-2023&source=nse for option chain from nse
 */

router.get('/option-chain/', async (req, res) => {
  //symbol.toUpperCase();
  try {
    console.log('calling nse.... option chain');
    const symbol = req.query.symbol;
    const expiry = req.query.expiry;
    const source = req.query.source;
    let data = '';
    if (source == 'nse') {
      data = await getNSEOptionChain(symbol.toUpperCase(), expiry);
    }
    else {
      data = await getOptionChain(symbol, expiry, 100);
    }




    console.log("****************************************************");
    console.log("call:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


router.get('/nse-option-chain/', async (req, res) => {
  //symbol.toUpperCase();
  try {
    console.log('calling nse.... option chain');
    const symbol = req.query.symbol;
    const expiry = req.query.expiry;
    const data = await getNSEOptionChain(symbol.toUpperCase(), expiry);
    console.log("****************************************************");
    console.log("call:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})




/**
 * Example Url http://localhost:8000/getexpiry?symbol=nifty
 */
router.get('/getexpiry', async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const data = await getExpiryDates(symbol.toUpperCase());
    console.log("****************************************************");
    console.log("call expiry dates:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})



export default router;