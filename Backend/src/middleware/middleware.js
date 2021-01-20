const captureDateMiddleware = (req, res, next) => {
  console.log(
    `URL:  ${req.url}, Method:  ${req.method}, Timestamp: ${new Date()}`
  );
  next();
};

module.exports = captureDateMiddleware;
