/* eslint-disable max-len */
import { createDecipheriv } from 'crypto';

const {
  AES_REQ_RES_IV,
  AES_REQ_RES_KEY,
  RESPONSE_ENCRYPTION_ALGORITHM,
} = require("../config");
const binaryToString = require("./binaryToString");

const decryptRequest = async (encrypted: string) => {
  try {
    const iv = Buffer.alloc(16, AES_REQ_RES_IV);
    const key = AES_REQ_RES_KEY;

    let decipher = createDecipheriv(
      RESPONSE_ENCRYPTION_ALGORITHM,
      key,
      iv
    );
    let dec = decipher.update(encrypted, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  } catch (error) {
    throw error;
  }
};


export default decryptRequest;