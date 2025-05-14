import dotenv from 'dotenv';

dotenv.config();

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  SERVER_ERROR: 'Something went wrong!',
  NOT_FOUND: 'Resource not found',
};

export const SUPER_ADMIN = {
  NAME: 'initial developer',
  ROLE: 'superAdmin',
  EMAIL: process.env.ADMIN_EMAIL || 'admin@yourapp.com',
  PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
};
