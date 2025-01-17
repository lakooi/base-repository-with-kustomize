// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import express, { Router } from 'express';
import passport from 'passport';

import { authLogin, authLogout, authSelfInfo, authSignup } from '../controllers/auth';
import { controllerDispatcher } from '../middleware/errorHandler';

export const router: Router = Router();

/**
 * @swagger
 * definitions:
 *   UserRole:
 *     type: string
 *     description: >
 *       The role of the user in our system (`UserRole`):
 *       `'SYSADMIN' | 'TEACHER' | 'ASSISTANT' | 'STUDENT'`.
 *   Credentials:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         description: Email address, functioning as a username.
 *         required: true
 *       password:
 *         type: string
 *         description: Plaintext password of the user.
 *         required: true
 *   LoginResult:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *         description: Success of the request.
 *       data:
 *         type: object
 *         properties:
 *           role:
 *             $ref: '#/definitions/UserRole'
 *   SignupRequest:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         description: Email address, to be used as a credential.
 *         required: true
 *       password:
 *         type: string
 *         description: Plaintext password.
 *         required: true
 *       studentID:
 *         type: string
 *         description: The student number assigned by the university.
 *         required: false
 *       name:
 *         type: string
 *         description: A personal name of the user (not a credential).
 *         required: true
 *       role:
 *         $ref: '#/definitions/UserRole'
 *         required: true
 *   SignupResult:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *         description: Success of the request.
 *       data:
 *         type: object
 *         properties:
 *           role:
 *             $ref: '#/definitions/UserRole'
 *           id:
 *             type: number
 *             description: >
 *               The database identifier of the user.
 *   AuthSelfInfo:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *         description: Success of the request.
 *       data:
 *         type: object
 *         properties:
 *           role:
 *             $ref: '#/definitions/UserRole'
 *           id:
 *             type: number
 *             description: >
 *               The database identifier of the user.
 */

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     description: Log in as a user.
 *     requestBody:
 *       description: The credentials for the user, currently consisting of the email and password.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Credentials'
 *     responses:
 *       200:
 *         description: The login has succeeded, and an access token is return in a cookie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/LoginResult'
 *         headers:
 *            Set-Cookie:
 *              description: JWT token, storing an access token to allow using the API.
 *              schema:
 *                type: string
 *                example: jwt=wliuerhlwieurh; Secure; HttpOnly; SameSite=None
 *       401:
 *         description: >
 *           The login has failed, due to invalid credentials or an invalid request format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Failure'
 *
 */
router.post('/v1/auth/login', express.json(), controllerDispatcher(authLogin));

/**
 * @swagger
 * /v1/auth/logout:
 *   post:
 *     tags: [Auth]
 *     description: >
 *       Log out of a session, requesting the browser to remove
 *       its session JWT token.
 *
 *       This requires the user to be already logged in, authenticated via a
 *       JWT token in the cookie.
 *
 *       Note that this does not explicitly invalidate any existing JWT tokens
 *       for that user, at the moment.
 *     responses:
 *       200:
 *         description: The user has successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation succeeded.
 *       401:
 *         description: The user is not logged in, or the JWT token is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Failure'
 *     security:
 *       - cookieAuth: []
 */
router.post(
  '/v1/auth/logout',
  passport.authenticate('jwt', { session: false }),
  express.json(),
  controllerDispatcher(authLogout)
);

/**
 * @swagger
 * /v1/auth/signup:
 *   post:
 *     tags: [Auth]
 *     description: >
 *       Attempts to create a new user with the specified information, for
 *       logging in to the system.
 *     requestBody:
 *       description: Basic user information.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/SignupRequest'
 *     responses:
 *       200:
 *         description: The user has been created and logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $req: '#/definitions/SignupResult'
 *         headers:
 *           Set-Cookie:
 *             description: JWT token, storing an access token to allow using the API.
 *             schema:
 *               type: string
 *               example: jwt=wliuerhlwieurh; Secure; HttpOnly; SameSite=None
 *       409:
 *         description: A user with the specified email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Failure'
 */
router.post('/v1/auth/signup', express.json(), controllerDispatcher(authSignup));

/**
 * @swagger
 * /v1/auth/self-info:
 *   get:
 *     tags: [Auth]
 *     description: >
 *       Retrieves information about the user that is currently logged in.
 *     responses:
 *       200:
 *         description: Information about the user who is logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/AuthSelfInfo'
 *       401:
 *         description: The user is not logged in, or the JWT token is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Failure'
 *     security:
 *       - cookieAuth: []
 *
 */
router.get(
  '/v1/auth/self-info',
  passport.authenticate('jwt', { session: false }),
  express.json(),
  authSelfInfo
);
