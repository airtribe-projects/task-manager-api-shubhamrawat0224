const loggerMiddleware = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} request to ${url}`);

  // Call the next middleware or route handler
  next();
};

module.exports = loggerMiddleware;
