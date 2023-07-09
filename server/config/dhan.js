import axios from 'axios';
const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkaGFuIiwicGFydG5lcklkIjoiIiwiZXhwIjoxNjkwODEyOTIxLCJ0b2tlbkNvbnN1bWVyVHlwZSI6IlNFTEYiLCJ3ZWJob29rVXJsIjoiIiwiZGhhbkNsaWVudElkIjoiMTAwMDI0ODAyNCJ9.pHQLz3UFtH-0jUcodLgsY_ZeI8iPIXEPa7LktaHkis0ZuOLkE-JurEooJFwt1uRGkbKBC2mx7ty_jM-3bCBxyQ';

export const dhan = axios.create({
	baseURL: 'https://api.dhan.co/',
	headers: {
		'access-token': access_token,
		Accept: 'application/json'
	}
});

