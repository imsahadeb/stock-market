import fyers from '../config/fyers.js';
import axios from 'axios'


export function getDateByOffset(offset) {
  const today = new Date();
  today.setDate(today.getDate() - offset);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


export const getCharts = async (offset, id) => {
  try {
    const q = id.toUpperCase();
    const symbol = `NSE:${q}-EQ`;
    const quotes = new fyers.history();
    const data = await quotes
      .setSymbol(symbol)
      .setResolution(5)
      .setDateFormat(1)
      .setRangeFrom(getDateByOffset(offset))
      .setRangeTo(getDateByOffset(0))
      .getHistory();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const generateFutureSymbol = (underlyingSymbol) => {
  const exchange = 'NSE';
  const underlying = underlyingSymbol.toUpperCase();

  const currentDate = new Date();
  const year = String(currentDate.getFullYear()).slice(-2);
  const monthAbbreviation = currentDate.toLocaleString('default', { month: 'short' }).toUpperCase();

  const symbol = `${exchange}:${underlying}${year}${monthAbbreviation}FUT`;
  return symbol;
}

/**
 * 
 * @param {'banknifty'} underlyingSymbol 
 * @returns 
 */
export const getFuturePrice = async (underlyingSymbol) => {
  const symbol = generateFutureSymbol(underlyingSymbol);
  const quotes = new fyers.quotes();
  const data = await quotes.setSymbol(symbol).getQuotes();
  return data.d[0].v.lp;
}
export const getStrike = (currentPrice) => {
  let getStrike = Math.floor(currentPrice / 100) * 100;

  if (currentPrice % 100 >= 50) {
    getStrike += 100;
  }

  return getStrike;
}


/**
 * Option Chain
 * @param {'banknifty'} symbol 
 * @param {'2023-07-06'} expiryDate 
 * @param {100} strikeGap 
 */
export const getOptionChain = async (symbol, expiry, strikeGap) => {

  try {
    const expiryDate = new Date(expiry);

    const currentfuturePrice = await getFuturePrice(symbol);
    const strikePrice = getStrike(currentfuturePrice);
    const startStrikePrice = strikePrice - 1000; // Starting strike price
    const endStrikePrice = strikePrice + 1000; // Ending strike price
    const strikePriceGap = strikeGap; // Gap between strike prices

    const symbols = generateOptionSymbols(symbol, expiryDate, startStrikePrice, endStrikePrice, strikePriceGap);

    const quotes = new fyers.quotes();
    const data = await quotes.setSymbol(symbols.join(',')).getQuotes();

    const optionChain = {};
    let sliceLenght = symbol.length + 5;
    data.d.map(item => {
      const symbol = item.n;
      console.log('sliceLength: ', sliceLenght);
      const strike = symbol.split(':')[1].slice(sliceLenght, -2);
      const askPrice = item.v.ask;
      const bidPrice = item.v.bid;
      const change = item.v.ch;
      const lastPrice = item.v.lp;
      const volume = item.v.cmd.v;

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
    return optionChain;

    // console.log(optionChain);
  } catch (error) {
    console.log('error geting chain', error);
  }


}


/**
 * 
 * @param {'banknifty'} underlyingSymbol 
 * @param {'2023-07-06'} expiryDate 
 * @param {40000} startStrikePrice 
 * @param {45000} endStrikePrice 
 * @param {100} strikePriceGap 
 * @returns 
 */
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

/**
 * 
 * @param {'BANKNIFTY'} symbol 
 * @param {'13-Jul-2023'} date 
 */

export const getNSEOptionChain = async (symbol, date) => {

  const url = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`
  console.log('url:', url);

  const data = await axios.get(url);
  const finalData = data.data.records.data;
  console.log(finalData);

  const desiredExpiryDate = date;
  const filteredData = finalData.filter(option => option.expiryDate === desiredExpiryDate);
  console.log(filteredData);
  return filteredData;


}

export const getCurrentExpiryNSEOptionChain = async (symbol) => {

  const url = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`
  console.log('url:', url);

  const data = await axios.get(url);
  const finalData = data.data.filtered.data;
  console.log(finalData);

  const filteredData = finalData;
 
  return filteredData;


}

export const getExpiryDates = async (symbol) => {

  const url = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`
  const data = await axios.get(url);

  const finalData = data.data.records.expiryDates;
  console.log(finalData);
  return finalData;
}

