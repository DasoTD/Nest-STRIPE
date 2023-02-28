/* eslint-disable max-len */
import { createDecipheriv, scrypt } from 'crypto';
import { RESPONSE_ENCRYPTION_ALGORITHM, AES_REQ_RES_IV,AES_REQ_RES_KEY } from 'src/config';
import { promisify } from 'util';

const binaryToString = require("./binaryToString");

const decryptRequest = async (encrypted) => {
  try {
    const iv = Buffer.alloc(16, AES_REQ_RES_IV);
    const password = AES_REQ_RES_KEY
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    let dec = decipher.update(encrypted, "hex", "utf8")
    dec += decipher.final("utf8")
    return dec
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