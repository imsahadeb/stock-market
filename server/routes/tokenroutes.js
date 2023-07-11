
import express from 'express';
import {fyersData} from '../config/fyers.js';

const tokenRouter = express.Router();
tokenRouter.get('/generate', async (req, res) => {
    const authCodeUrl = await fyers.generateAuthCode();
    res.redirect(authCodeUrl);
  });

tokenRouter.get('/token', (req, res) => {
    const auth_code = req.query.auth_code;
    let token = ''
    if (auth_code) {
      const reqBody = {
        auth_code: auth_code,
        secret_key: fyersData.secretId
      };
  
      fyers.generate_access_token(reqBody).then((response) => {
        console.log(response);
        const access_token = response.access_token;
        token = access_token;
  
        // Update the access token in the fyersData object
        fyersData.fyers_acess_token = access_token;
  
        // Save the updated fyersData object to fyers.js file
        const fyersDataContent = `export const fyersData = ${JSON.stringify(fyersData, null, 2)};`;
        fs.writeFileSync('../config/fyers.js', fyersDataContent);
  
        console.log('Access token saved successfully!',token);
   
        res.send(`New Access Token Generated successfully......${token}`);
      });
    } else {
      token = fyersData.fyers_acess_token;
      console.log('Access token:',token);
      res.send(`You allready have accesss_token......${token}`);
    }
  
  
  });

  export default tokenRouter;