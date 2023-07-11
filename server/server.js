import express from 'express';
import router from './routes/router.js';
import mongodbRouter from './routes/stocks.js';
import { dhanApiRouter } from './routes/dhanRoutes.js';
import { newsRouter } from './routes/newsRoutes.js';
import tokenRouter from './routes/tokenroutes.js';
import { generateFutureSymbol, getFuturePrice, getNSEOptionChain, getOptionChain } from './Utilis/utils.js';
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));
app.use('/news',newsRouter);
app.use('/', router);
app.use('/', mongodbRouter);
app.use('/', tokenRouter);
app.use('/dhan', dhanApiRouter);
import { fileURLToPath } from 'url';
import path from 'path';
const port = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, 'index.html');

app.get('/', (req, res) => {
  res.sendFile(htmlPath);
});



app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running server at port  ${port}: ${err.message}`);
  }
  console.log(`Server is running in port ${port}`);
})