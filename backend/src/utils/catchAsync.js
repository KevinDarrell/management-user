const response = require('./response');

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.error("System Error:", err);
      
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Internal Server Error';
      return response.error(res, statusCode, message);
    });
  };
};