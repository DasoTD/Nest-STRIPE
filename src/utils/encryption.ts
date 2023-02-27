import { createCipheriv,  scrypt } from 'crypto';

import { promisify } from 'util';
const {
  AES_REQ_RES_IV,
  AES_REQ_RES_KEY,
  RESPONSE_ENCRYPTION_ALGORITHM,
} = require("../config");
import binaryToString from './binaryToString';

const encryptResponse = async (plain: string) => {
    try {
      const iv = Buffer.alloc(16, AES_REQ_RES_IV);
      const key = (await promisify(scrypt)(AES_REQ_RES_KEY, 'salt', 32)) as Buffer;
  
      let cipher = createCipheriv(RESPONSE_ENCRYPTION_ALGORITHM, key, iv);
      let encrypted = cipher.update(plain);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return encrypted.toString("hex");
    } catch (error) {
      throw error;
    }
  };


export default encryptResponse;