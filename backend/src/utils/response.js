const success = (res, code, message, data = null) => {
  res.status(code).json({
    meta: {
      code: code,
      status: 'success',
      message: message,
    },
    data: data,
  });
};

const error = (res, code, message) => {
  res.status(code).json({
    meta: {
      code: code,
      status: 'error',
      message: message,
    },
    data: null,
  });
};

module.exports = { success, error };