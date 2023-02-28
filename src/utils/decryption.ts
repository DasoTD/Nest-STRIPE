/* eslint-disable max-len */
import { createDecipheriv } from 'crypto';
import { RESPONSE_ENCRYPTION_ALGORITHM, AES_REQ_RES_IV,AES_REQ_RES_KEY } from 'src/config';

const binaryToString = require("./binaryToString");

const decryptRequest = async (encrypted: Buffer) => {
  try {
    const iv = Buffer.alloc(16, AES_REQ_RES_IV);
     const key = AES_REQ_RES_KEY;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
const decryptedText = Buffer.concat([
  decipher.update(encrypted),
  decipher.final(),
])
return decryptedText
    // const iv = Buffer.alloc(16, AES_REQ_RES_IV);
    // const key = AES_REQ_RES_KEY;

    // let decipher = createDecipheriv(
    //   RESPONSE_ENCRYPTION_ALGORITHM,
    //   key,
    //   iv
    // );
    // let dec = decipher.update(encrypted, "hex", "utf8");
    // dec += decipher.final("utf8");
    // return dec;
  } catch (error) {
    throw error;
  }
};


export default decryptRequest;