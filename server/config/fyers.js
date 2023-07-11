import fyers from 'fyers-api-v2';
export const fyersData = {
    "appId": "UGY069G3IZ-100",
    "secretId": "7DNKQGSG6K",
    "redirectUrl": "https://api.ghontu.in/token",
    "fyers_acess_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE2ODkwNjUzMDAsImV4cCI6MTY4OTEyMTgyMCwibmJmIjoxNjg5MDY1MzAwLCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIiwieDoxIiwieDowIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCa3JSZFVsRkh5ejhrdVB1VFQyalRuWlBkay0wZUxzejQ0VEluRDdsQU5FVHpUZS1sWjNSYVlXa2xwc3VES3h2a2V3Zm9WY0RBdzJfZkNnZmd0ZTgzbHV0bEJDNGdCSDdfVF9xcncwQmU1WkUxTlhvMD0iLCJkaXNwbGF5X25hbWUiOiJTQUhBREVCIEJBUk1BTiIsIm9tcyI6IksxIiwiZnlfaWQiOiJEUzAyMjgzIiwiYXBwVHlwZSI6MTAwLCJwb2FfZmxhZyI6Ik4ifQ.TtxLvgVEWDFTo2cj3pAnUlNYjDr-vgftLQo9J1_bKoQ"
  };
  fyers.setAppId(fyersData.appId);
  fyers.setRedirectUrl(fyersData.redirectUrl);
  fyers.setAccessToken(fyersData.fyers_acess_token);

  export default fyers;