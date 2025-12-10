const success = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    meta: {
      code: statusCode,
      status: 'success',
      message: message,
    },
    data: data,
  });
};

const error = (res, statusCode, message, errors = null) => {
  return res.status(statusCode).json({
    meta: {
      code: statusCode,
      status: 'error',
      message: message,
    },
    errors: errors,
  });
};

module.exports = { success, error };