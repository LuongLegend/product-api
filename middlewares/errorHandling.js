import logger from "../utils/logger.js";

const messageRes = {
  401: "Unauthorized",
  400: "Bad request",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
  500: "Internal Server error",
};

const errorHandlingMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const messRes = messageRes[statusCode] || "Internal server error";
  
  logger.error({
    message: err.message || "unexpected error",
    statusCode,
    path: req.path,
    method: req.method,
    data: req.body,
    userId: req.userInfo ? req.userInfo.userId : 'null'
  });
  if (err) {
    return res.status(statusCode).send(messRes);
  }
  return next();
};

export default errorHandlingMiddleware;
