import express from 'express';
import { fyersData } from '../config/fyersData.js';
import fyers from '../config/fyers.js';
import fs from 'fs';
import path from 'path';


export const tokenRouter = express.Router();
const __filename = path.resolve(import.meta.url.slice(7));
const __dirname = path.dirname(__filename);

tokenRouter.get('/generate', async (req, res) => {
  const authCodeUrl = `https://api.fyers.in/api/v2/generate-authcode?client_id=${fyersData.appId}&redirect_uri=${fyersData.redirectUrl}&response_type=code&state=sample_state/`;
  console.log(authCodeUrl);
  res.redirect(authCodeUrl);
});

tokenRouter.get('/token', (req, res) => {
  const auth_code = req.query.auth_code;
  let token = '';

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
      const filePath = path.join(__dirname, '../config/fyersData.js');
      fs.writeFileSync(filePath, fyersDataContent);

      console.log('Access token saved successfully!', token);
      res.send(`New Access Token Generated successfully......${token}`);
     
    });
  } else {
    token = fyersData.fyers_acess_token;
    console.log('Access token:', token);
    res.send(`You already have access token......${token}`);
  }
});

