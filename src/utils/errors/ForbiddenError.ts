import { BaseError } from './BaseError.js';

export class ForbiddenError extends BaseError {
  constructor(message = 'Access denied') {
    super(message, 403);
  }
}
