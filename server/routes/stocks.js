import express from 'express';
import { connectToDatabase } from '../config/db-connection.js';
import { StockModel } from '../models/stocksSchema.js';


const mongodbRouter = express.Router();
connectToDatabase();


console.log('Mongo db Router loaded');


mongodbRouter.get('/stocks', async (req, res) => {
    console.log('calling /stocks.search');
    try {
        const query = req.query.search; // Get the search query from request query parameters
        const stocks = await StockModel.find({
            $or: [
                { SYMBOL: { $regex: query, $options: 'i' } }, // Case-insensitive search on SYMBOL field
                { 'NAME OF COMPANY': { $regex: query, $options: 'i' } }, // Case-insensitive search on NAME OF COMPANY field
            ]
        });
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: 'Error searching stocks' });
    }
});
export default mongodbRouter;