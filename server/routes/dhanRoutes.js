import { dhan } from "../config/dhan.js";
import express from 'express'
import { apiEndPoint } from "../config/apiEndpoints.js";

export const dhanApiRouter = express.Router();


const dhanRoutes =  (endpoints, apiUrl) => {
    dhanApiRouter.get(endpoints, async (req, res) => {
        console.log('calling dhan ',apiUrl);
        try {
            const data = await dhan.get(apiUrl);
            console.log(data.data);
            res.json(data.data);
        } catch (error) {
            res.status(500).json({ error: 'error.message' });
        }

    });

}


dhanRoutes('/funds',apiEndPoint.getFunds);
dhanRoutes('/positions',apiEndPoint.getPositions);
dhanRoutes('/orders',apiEndPoint.getOrders);
dhanRoutes('/trades',apiEndPoint.getTrades);
//dhanRoutes('/trades-history',apiEndPoint.getTradeHistoryByDate());






