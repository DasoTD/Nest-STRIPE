import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import Cypher from "../utils/cypher";
import { logger } from "./logger";
import handleResponse from "./response";

dotenv.config();

const { RESPONSE_AESKEY, RESPONSE_IVKEY, RESPONSE_ALGORITHM } = process.env;

const handleRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!["POST", "PUT", "PATCH"].includes(req.method)) return next();
    if (!req.body.data)
      return handleResponse(
        req,
        res,
        { error: "Data is missing in the request body" },
        422
      );
    const encryptedPayload = req.body.data;
    const decryptedData = await Cypher.decryptRequest(
      encryptedPayload
    );
    req.body = JSON.parse(decryptedData);
    const requestBody = { ...req.body };
    if (requestBody.pin) delete requestBody.pin;
    if (requestBody.dob) delete requestBody.dob;
    if (requestBody.phoneNumbers) delete requestBody.phoneNumbers;
    
    logger(module).log(
      `${req.method} - ${req.ip}- ${req.originalUrl} - ${JSON.stringify(requestBody)}`
    );
    return next();
  } catch (error: any) {
    return handleResponse(req, res, { error: error.message }, 400);
  }
};

export default handleRequest;
