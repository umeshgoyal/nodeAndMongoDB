const captureDate = (req, res, next) => {
  res.locals.dateCreated = new Date();
  console.log(
    `URL:  ${req.url}, Method:  ${req.method}, Timestamp: ${new Date()}`
  );
  next();
};

module.exports = captureDate;
