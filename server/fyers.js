const fs = require('fs');
const crypto = require('crypto');
const fetch = require('node-fetch');

const username = "DS02283";
const totp_key = "B26E3HKL7NGO7BXWT4Y2VAON5FJAVSCB";
const pin = 8670;
const client_id = "UGY069G3IZ-100";
const secret_key = "7DNKQGSG6K";
const redirect_uri = "https://google.com";

function totp(key, time_step = 30, digits = 6, digest = "sha1") {
  const keyBuffer = Buffer.from(key.toUpperCase().padEnd(8, "="), 'base64');
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(Math.floor(Date.now() / (time_step * 1000))));
  const hmac = crypto.createHmac(digest, keyBuffer);
  hmac.update(counterBuffer);
  const mac = hmac.digest();
  const offset = mac[19] & 0x0F;
  const binary = mac.readUInt32BE(offset) & 0x7FFFFFFF;
  return binary.toString().slice(-digits).padStart(digits, '0');
}

function write_file(token) {
  const file_path = "fyers_access_token.js";
  const data = `export const data = { "token": "${token}" };`;
  fs.writeFileSync(file_path, data);
}

function read_file() {
  const file_path = "fyers_access_token.js";
  const data = fs.readFileSync(file_path, 'utf-8');
  const token = data.match(/"token": "(.*?)"/)[1];
  return token;
}

async function get_token() {
  const headers = {
    "Accept": "application/json",
    "Accept-Language": "en-US,en;q=0.9",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
  };

  const s = fetch.default;
  s.headers = headers;

  const data1 = `{"fy_id": "${Buffer.from(username).toString('base64')}", "app_id": "2"}`;
  const r1 = await s.post("https://api-t2.fyers.in/vagator/v2/send_login_otp_v2", { body: data1 });
  assert(r1.status === 200, `Error in r1:\n ${await r1.json()}`);

  const request_key = (await r1.json()).request_key;
  const data2 = `{"request_key": "${request_key}", "otp": ${totp(totp_key)}}`;
  const r2 = await s.post("https://api-t2.fyers.in/vagator/v2/verify_otp", { body: data2 });
  assert(r2.status === 200, `Error in r2:\n ${await r2.text()}`);

  const request_key = (await r2.json()).request_key;
  const data3 = `{"request_key": "${request_key}", "identity_type": "pin", "identifier": "${Buffer.from(pin.toString()).toString('base64')}"}`;
  const r3 = await s.post("https://api-t2.fyers.in/vagator/v2/verify_pin_v2", { body: data3 });
  assert(r3.status === 200, `Error in r3:\n ${await r3.json()}`);

  const headers = { "authorization": `Bearer ${r3.json().data.access_token}`, "content-type": "application/json; charset=UTF-8" };
  const data4 = `{"fyers_id": "${username}", "app_id": "${client_id.slice(0, -4)}", "redirect_uri": "${redirect_uri}", "appType": "100", "code_challenge": "", "state": "abcdefg", "scope": "", "nonce": "", "response_type": "code", "create_cookie": true}`;
  const r4 = await s.post("https://api.fyers.in/api/v2/token", { headers, body: data4 });
  assert(r4.status === 308, `Error in r4:\n ${await r4.json()}`);

  const parsed = new URL(r4.json().Url);
  const auth_code = new URLSearchParams(parsed.search).get('auth_code');

  const session = new accessToken.SessionModel(client_id, secret_key, redirect_uri, "code", "authorization_code");
  session.set_token(auth_code);
  const response = await session.generate_token();
  return response.access_token;
}

async function get_profile(token) {
  const fyers = new fyersModel.FyersModel(client_id, token, process.cwd());
  return await fyers.get_profile();
}

async function check() {
  let token;
  try {
    token = read_file();
  } catch (err) {
    token = await get_token();
  }

  const response = await get_profile(token);

  if (response.s.error || response.message.error || response.message.includes("expired")) {
    console.log("Getting a new fyers access token!");
    token = await get_token();
    write_file(token);
    console.log(await get_profile(token));
  } else {
    console.log("Got the fyers access token!");
    write_file(token);
    console.log(response);
  }
}

check();
