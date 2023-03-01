import { Request, Response } from "express";
// import dotenv from "dotenv";
import Cypher from "../utils/cypher";
import { logger } from "./logger";

// dotenv.config();

const handleResponse = async (
  req: Request,
  res: Response,
  payload: any,
  statusCode: number
) => {
  const ipAddress =
    req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  let responseDataAsString = JSON.stringify(payload);
  // if (
  //   req.originalUrl.includes("status") ||
  //   req.originalUrl.includes("contacts") ||
  //   req.originalUrl.includes("chat") ||
  //   req.originalUrl.includes("transactions")
  // ) {
  //   logger(module).info(
  //     `${statusCode} - ${req.method} - ${ipAddress}- ${req.originalUrl} - ${
  //       statusCode >= 400 ? responseDataAsString : "success"
  //     }`
  //   );
  // } else {
  //   logger(module).info(
  //     `${statusCode} - ${req.method} - ${ipAddress}- ${req.originalUrl} - ${responseDataAsString}`
  //   );
  // }
  logger(module).log(
    `${statusCode} - ${req.method} - ${ipAddress}- ${req.originalUrl} - ${
      statusCode >= 400 ? responseDataAsString : "success"
    }`
  );

  const encryptedData = await Cypher.encryptPayload(JSON.stringify(payload));

  return res.status(statusCode).send({
    data: encryptedData,
  });
};

export default handleResponse;
