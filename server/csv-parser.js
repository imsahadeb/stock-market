import { connectToDatabase } from './config/db-connection.js';
import fs from 'fs'
import csvParser from 'csv-parser';
import { StockModel } from './models/stocksSchema.js';
connectToDatabase();
const results = [];

fs.createReadStream('./nse.csv')
  .pipe(csvParser())
  .on('data', (data) => {
    results.push(data);
  })
  .on('end', () => {
    StockModel.insertMany(results)
      .then(() => {
        console.log('Data uploaded to MongoDB');
      })
      .catch((error) => {
        console.error('Error uploading data to MongoDB:', error);
      });
    console.log(results);
  })
  .on('error', (error) => {
    console.error('Error reading CSV file:', error.message);
  });
