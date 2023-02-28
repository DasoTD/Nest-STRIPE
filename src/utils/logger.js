// const { createLogger, format, transports } = require("winston");
// const rTracer = require("cls-rtracer");
// const path = require("path");
// const fs = require("fs");
// const axios = require("axios");
// const { CENTRAL_ISSUE_POINT, APP_NAME } = require("../config");
// //const debug = require('node-forge/lib/debug');

// const { combine, timestamp, label, printf } = format;

// const getLogLabel = (callingModule) => {
//   const parts = callingModule.filename.split(path.sep);
//   return path.join(parts[parts.length - 2], parts.pop());
// };

// const formatDate = () => {
//   var d = new Date(),
//     month = "" + (d.getMonth() + 1),
//     day = "" + d.getDate(),
//     year = d.getFullYear();

//   if (month.length < 2) month = "0" + month;
//   if (day.length < 2) day = "0" + day;

//   return `${year}${month}${day}`;
// };

// const getFile = (type) => {
//   const d = formatDate();
//   const filename = `logs/${d}${type}.log`;
//   fs.open(filename, "r", function (err, fd) {
//     if (err) {
//       fs.writeFile(filename, "", function (err) {
//         if (err) {
//           return `logs/${type}.log`;
//         }
//         return filename;
//       });
//     } else {
//       return filename;
//     }
//   });
//   return filename;
// };

// /**
//  * Creates a Winston logger object.
//  * ### Log Format
//  * *| timestamp | request-id | module/filename | log level | log message |*
//  *
//  * @param {Module} callingModule the module from which the logger is called
//  */
// const logger = (callingModule) =>
//   createLogger({
//     format: combine(
//       format.colorize(),
//       label({ label: getLogLabel(callingModule) }),
//       timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//       printf((info) => {
//         const rid = rTracer.id();

//         return rid
//           ? `| ${info.timestamp} | ${rid} | ${info.label} | ${info.message} |`
//           : `| ${info.timestamp} | ${info.label} | ${info.message} |`;
//       })
//     ),
//     transports: [
//       new transports.Console(),
//       // new transports.File({ filename: 'logs/error.log', level: 'error' }),
//       // new transports.File({ filename: 'logs/combined.log' }),
//       new transports.File({
//         filename: getFile("info"),
//         level: "info",
//       }),
//       new transports.File({
//         filename: getFile("error"),
//         level: "error",
//       }),
//     ],
//     exitOnError: false,
//   });

// const responseLogger = (callingModule) =>
//   createLogger({
//     format: combine(
//       format.colorize(),
//       label({ label: getLogLabel(callingModule) }),
//       timestamp(),
//       printf((info) => {
//         const level = info.level.includes("info");
//         // if (!level) {
//         //   axios.post(CENTRAL_ISSUE_POINT, {
//         //     channel_id: 4,
//         //     appname: APP_NAME,
//         //     txn_date_and_time: info.timestamp,
//         //     res_description: info.message,
//         //     the_exception: info.message,
//         //     exception_at: info.label,
//         //   });
//         // }
//         return `| ${info.timestamp} ${info.message} |`;
//       })
//     ),
//     transports: [
//       // new transports.File({ filename: 'logs/error.log', level: 'error' }),
//       // new transports.File({ filename: 'logs/response.log' }),
//       new transports.File({
//         filename: getFile("info"),
//         level: "info",
//       }),
//       new transports.File({
//         filename: getFile("error"),
//         level: "error",
//       }),
//     ],
//     exitOnError: false,
//   });

//   const adminResponseLogger = (callingModule) =>
//   createLogger({
//     format: combine(
//       format.colorize(),
//       label({ label: getLogLabel(callingModule) }),
//       timestamp(),
//       printf((info) => {
//         const level = info.level.includes("info");
//         // if (!level) {
//         //   axios.post(CENTRAL_ISSUE_POINT, {
//         //     channel_id: 4,
//         //     appname: APP_NAME,
//         //     txn_date_and_time: info.timestamp,
//         //     res_description: info.message,
//         //     the_exception: info.message,
//         //     exception_at: info.label,
//         //   });
//         // }
//         return `| ${info.timestamp} ${info.message} |`;
//       })
//     ),
//     transports: [
//       // new transports.File({ filename: 'logs/error.log', level: 'error' }),
//       // new transports.File({ filename: 'logs/response.log' }),
//       new transports.File({
//         filename: getFile("info"),
//         level: "info",
//       }),
//       new transports.File({
//         filename: getFile("error"),
//         level: "error",
//       }),
//     ],
//     exitOnError: false,
//   });

// module.exports = {logger, responseLogger, adminResponseLogger};
// // module.exports = responseLogger;
// // module.exports = adminResponseLogger;
