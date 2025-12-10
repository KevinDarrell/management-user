require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'secret_key_change_me',
  uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
};