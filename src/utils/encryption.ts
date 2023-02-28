import { createCipheriv,  scrypt } from 'crypto';
import * as CryptoJS from 'crypto-js'

import { RESPONSE_ENCRYPTION_ALGORITHM, AES_REQ_RES_IV,AES_REQ_RES_KEY } from 'src/config';
import { promisify } from 'util';

let RESPONSE_AESKEY="prao7lqjpgymv60eltc6tbdiahe69wf4"
import binaryToString from './binaryToString';

const encryptResponse = async (plain) => {
    try {
      const iv = Buffer.alloc(16, AES_REQ_RES_IV);
const password = AES_REQ_RES_KEY //'Password used to generate key';

// The key length is dependent on the algorithm.
// In this case for aes256, it is 32 bytes.
const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
const cipher = createCipheriv('aes-256-ctr', key, iv);

// const textToEncrypt = 'Nest';
const encryptedText = Buffer.concat([
  cipher.update(plain),
  cipher.final(),
]);

return encryptedText.toString("hex");


      // const iv = Buffer.alloc(16, AES_REQ_RES_IV);
      // const key = AES_REQ_RES_KEY;
  
      // let cipher = createCipheriv(RESPONSE_ENCRYPTION_ALGORITHM, key, iv);
      // let encrypted = cipher.update(plain);
      // encrypted = Buffer.concat([encrypted, cipher.final()]);
      // return encrypted.toString("hex");
    } catch (error) {
      throw error;
    }
  };

export const encryptPayload = (data: string) => {
    return CryptoJS.AES.encrypt(data, RESPONSE_AESKEY || "").toString();
  };
export const decryptRequest = (data: string) => {
    return CryptoJS.AES.decrypt(data, RESPONSE_AESKEY || "").toString(CryptoJS.enc.Utf8 );
  };


export default encryptResponse;