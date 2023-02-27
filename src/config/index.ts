require("dotenv").config();

module.exports = {
  AES_REQ_RES_KEY: process.env.AES_REQ_RES_KEY,
  AES_REQ_RES_IV: process.env.AES_REQ_RES_IV,
  RESPONSE_ENCRYPTION_ALGORITHM: process.env.RESPONSE_ENCRYPTION_ALGORITHM,
  USE_MTOKEN: process.env.USE_MTOKEN,
  }; 
