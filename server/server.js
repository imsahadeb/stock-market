import express from 'express';
import router from './routes/router.js';
import { generateFutureSymbol, getFuturePrice, getNSEOptionChain, getOptionChain } from './Utilis/utils.js';

const app = express();
app.use('/api', router);
const port = 8000;

let socketClients = [];

  app.get('/', (req, res) => {
    res.send('Server is running');
  });
    
  // getOptionChain('banknifty','2023-07-06',100);
getNSEOptionChain('BANKNIFTY','13-Jul-2023');

app.listen(port, (err)=>{
if(err){
    console.log(`Error in running server at port  ${port}: ${err.message}`);
}
console.log(`Server is running in port ${port}`);
})