
export const apiEndPoint = {
    getPositions: `/positions`,
    getFunds:`/fundlimit`,
    getOrders:'/orders',
    getTrades:'/trades',
    getHoldings:'/holdings',
    getLedger:'/ledger',
    getLedgerBydate:(fromDate,toDate) => `/ledger?from_date=${fromDate}&to_date=${toDate}`,
    getTradeHistoryByDate:(fromDate,toDate,pageNumber)=>`/tradeHistory/${from_date}/${to_date}/${page_number}`,

}
