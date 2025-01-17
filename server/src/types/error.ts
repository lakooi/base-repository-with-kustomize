// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import { HttpCode } from '../types/httpCode';

/**
 * ApiError class represents a custom API related error, extends the native Error class. Includes
 * error message that is either string or an array of strings describing multiple errors. Status
 * code represents HTTP status code associated with the error. Useful for providing more context
 * about an API-related error that occurred during the execution of an operation.
 * @extends {Error}
*/
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly multipleErrors: Array<string> | undefined;

  /**
   * Creates an instance of ApiError.
   * @param {string | Array<string>} message - The error message(s).
   * @param {HttpCode} statusCode - The HTTP status code associated with the error.
  */
  constructor(message: string | Array<string>, statusCode: HttpCode) {
    if (Array.isArray(message)) {
      super('');
      this.multipleErrors = message;
    } else {
      super(message);
    }
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }

  get errors(): Array<string> {
    return this.multipleErrors ?? [this.message];
  }
}
