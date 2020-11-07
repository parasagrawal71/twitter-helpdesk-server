const successResponse = (res, message, data) => {
  return res.status(200).send({
    success: true,
    message,
    data,
  });
};

const failureResponse = (res, message, err) => {
  return res.status(err && err.status ? err.status : 400).send({
    success: false,
    message,
    error: err,
    stack: err && err.stack,
  });
};

module.exports = { successResponse, failureResponse };
