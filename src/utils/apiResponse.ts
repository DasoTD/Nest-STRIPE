const { NODE_ENV } = require("../config");
const {  logger } = require("../utils");
// import encryptResponse from "./encryption";
import { encryptPayload } from "./encryption";
const { responseLogger, adminResponseLogger } = require("./logger");

export const HttpStatusCode = {
  StatusOk: 200,
  StatusCreated: 201,
  StatusBadRequest: 400,
  StatusUnauthorized: 401,
  StatusNotFound: 404,
  StatusUnprocessableEntity: 422,
  StatusInternalServerError: 500,
  StatusForbidden: 403,
};

export const ResponseStatus = {
  Success: "success",
  Failure: "fail",
  Error: "error",
};

export const ResponseMessage = {
  HealthCheckMessage: "Welcome to the Nest Stripe Server!",
  NotFoundMessage: "Not Found!",
};

/**
 * Builds, logs, and sends the response.
 *
 * @param {Response} res
 * @param {Number} httpStatusCode the status code
 * @param {String} responseStatus indicates if request was successful or not
 * @param {Object} data the data to be sent over
 */
export const createResponse = async (res, httpStatusCode, responseStatus, data) => {
  let responseObject;

  if (
    responseStatus === ResponseStatus.Error ||
    responseStatus === ResponseStatus.Failure
  ) {
    responseObject = {
      status: responseStatus,
      message: data,
    };

    logger(module).error(JSON.stringify(responseObject));
  } else {
    responseObject = {
      status: responseStatus,
      data,
    };

    // logger(module).info(JSON.stringify(responseObject));
  }
  if (NODE_ENV === "dev") console.log(JSON.stringify(responseObject));
  const response = await encryptPayload(JSON.stringify(responseObject));
  return res.status(httpStatusCode).json({ response });
};

const createAdminResponse = async (
  res,
  httpStatusCode,
  responseStatus,
  data
) => {
  let responseObject;

  if (
    responseStatus === ResponseStatus.Error ||
    responseStatus === ResponseStatus.Failure
  ) {
    responseObject = {
      status: responseStatus,
      message: data,
    };

    adminResponseLogger(module).error(JSON.stringify(responseObject));
  } else {
    responseObject = {
      status: responseStatus,
      data,
    };

    // logger(module).info(JSON.stringify(responseObject));
  }
  if (NODE_ENV === "dev") console.log(JSON.stringify(responseObject));
  const response = await encryptPayload(JSON.stringify(responseObject));
  return res.status(httpStatusCode).json({ response });
};

module.exports = {
  HttpStatusCode,
  ResponseStatus,
  ResponseMessage,
  createResponse,
  createAdminResponse,
};
