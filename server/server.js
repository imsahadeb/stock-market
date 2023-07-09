import express from 'express';
import router from './routes/router.js';
import mongodbRouter from './routes/stocks.js';
import { generateFutureSymbol, getFuturePrice, getNSEOptionChain, getOptionChain } from './Utilis/utils.js';
import cors from 'cors';


const app = express();
app.use(cors());
app.use('/api', router);
app.use('/api', mongodbRouter);
const port = 8000;



app.get('/', (req, res) => {
  res.send('Server is running');
});


app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running server at port  ${port}: ${err.message}`);
  }
  console.log(`Server is running in port ${port}`);
})