import { BaseError } from './BaseError.js';

export class InvalidCredentialsError extends BaseError {
  constructor(message = 'Invalid credentials') {
    super(message, 401);
  }
}
