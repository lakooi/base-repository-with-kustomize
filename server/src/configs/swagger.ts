// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import { OAS3Definition } from 'swagger-jsdoc';

/*
 * This file is used as a base definition for the Swagger compilation in
 * routes/index.ts.
 */

export const definition: OAS3Definition = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'API Documentation',
    description: 'Documentation of Aalto Grades Backend API',
    termsOfService: '',
    license: {
      name: 'Expat (MIT)',
      url: 'https://github.com/aalto-grades/base-repository/blob/main/LICENSE'
    }
  }
};
