// Server configuration constants
export const SERVER_PORT = process.env.SERVER_PORT || 3001;

// Database configuration constants
export const DATABASE_CONFIG = {
  dbName: process.env.DB_NAME,
  uri: process.env.MONGODB_URI
};

// JWT configuration constants
export const JWT_CONFIG = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
};

// Logger configuration constants
export const LOGGER_CONFIG = {
  level: process.env.LOG_LEVEL || 'info'
};
