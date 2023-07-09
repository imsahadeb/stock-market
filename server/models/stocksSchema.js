import mongoose from "mongoose";

// Define the schema for your data
const stocksSchema = new mongoose.Schema({
  SEM_EXM_EXCH_ID: String,
  SEM_SEGMENT: String,
  SEM_SMST_SECURITY_ID: String,
  SEM_INSTRUMENT_NAME: String,
  SEM_EXPIRY_CODE: String,
  SEM_TRADING_SYMBOL: String,
  SEM_LOT_UNITS: String,
  SEM_CUSTOM_SYMBOL: String,
  SEM_EXPIRY_DATE: String,
  SEM_STRIKE_PRICE: String,
  SEM_OPTION_TYPE: String,
  SEM_TICK_SIZE: String,
  SEM_EXPIRY_FLAG: String
});

// Create a model based on the schema
export const stocksData = mongoose.model('stocksData', stocksSchema);



const stockSchema = new mongoose.Schema({
    SYMBOL: String,
    'NAME OF COMPANY': String,
    ' SERIES': String,
    ' DATE OF LISTING': String,
    ' PAID UP VALUE': String,
    ' MARKET LOT': String,
    ' ISIN NUMBER': String,
    ' FACE VALUE': String
  });
  
  export const StockModel = mongoose.model('Stock', stockSchema);