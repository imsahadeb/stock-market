import { fyersData } from "./fyersData.js";
import fyers from 'fyers-api-v2';
fyers.setAppId(fyersData.appId);
fyers.setRedirectUrl(fyersData.redirectUrl);
fyers.setAccessToken(fyersData.fyers_acess_token);

export default fyers;