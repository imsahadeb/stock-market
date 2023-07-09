import fyers from 'fyers-api-v2';
import data from '../fyers_access_token.js'
const fyersData={
    'appId': 'UGY069G3IZ-100',
    'appSecret': '7DNKQGSG6K',
    'accessToken':data.token
}

fyers.setAppId(fyersData.appId);
fyers.setAccessToken(fyersData.accessToken);
export default fyers;