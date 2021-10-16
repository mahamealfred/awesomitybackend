import {Router} from "express";
import authController from "../controllers/authController"
import CheckUser from "../middleware/CheckUser"
import SignupValidation from "../middleware/SignupValidation";


const route=Router();

/**
 * @swagger
 *
 * /auth/signup:
 *   post:
 *     security: []
 *     summary: auth/signup
 *     description: auth/signup
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               NationalId:
 *                 type: string
 *               PhoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               DoB:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *     responses:
 *       201:
 *         description: created
 */

route.post('/signup',SignupValidation, CheckUser,authController.signup);

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     security: []
 *     summary: auth/login
 *     description: auth/login
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *     responses:
 *       201:
 *         description: created
 */
route.post('/login',CheckUser,authController.login);

/**
 * @swagger
 *
 * /auth/email-activate/{token}:
 *   post:
 *     security: []
 *     summary: auth/activate
 *     description: auth/activate
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: token
 *         description: Access token.
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *     responses:
 *       201:
 *         description: created
 */
route.post('/email-activate/:token',authController.activateAccount)


export default route;