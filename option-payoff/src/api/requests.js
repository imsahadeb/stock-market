/**
 * http://localhost:8000/api/profiles
 * http://localhost:8000/api/funds
 *  http://localhost:8000/api/positions
 * http://localhost:8000/api/quotes?symbol=sbin
 *  http://localhost:8000/api/future?symbol=banknifty
 *  http://localhost:8000/api/charts?symbol=sbin&day=2
 *  http://localhost:8000/api/option-chain?symbol=nifty&expiry=13-Jul-2023 for normal
 *  http://localhost:8000/api/option-chain?symbol=nifty&expiry=13-Jul-2023&source=nse for option chain fro
 *  http://localhost:8000/api/getexpiry?symbol=nifty
 * http://localhost:8000/api/stocks?search=nifty
 */
const requests = {

	getFund: '/funds',
	getPositin: '/positions',
	getQuotes: (symbol) => `/quotes/?symbol=${symbol}`,
	getFutureQuotes: (symbol) => `/future/?symbol=${symbol}`,
	getCharts: (symbol, day) => `/charts?symbol=${symbol}&day=${day}`,
	getOptionChain: (symbol, expiry, source = '') => `/option-chain?symbol=${symbol}&expiry=${expiry}&source=${source}`,
	getExpiryDates: (symbol) => `/getexpiry?symbol=${symbol}`,
	findStocks: (symbol) => `/stocks?search=${symbol}`,

	getPositinOfDhan: '/dhan/positions',
	getTradesfDhan: '/dhan/trades',
	getFundsOfDhan: '/dhan/funds',

	getTopBusniessNews:`/news/top-bn`,

};

export default requests;

