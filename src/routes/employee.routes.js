import {Router} from "express";
import employeeController from "../controllers/employeeController"
import addEmployeeValidation from "../middleware/addEmployeeValidation";
import CheckUser from "../middleware/CheckUser"
import isManager from "../middleware/isManager";



const route=Router();

/**
 * @swagger
 *
 * /employee/add:
 *   post:
 *     security: []
 *     summary: Add Employee
 *     description: Add Employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: my-token
 *         description: Access token.
 *         in: header
 *         required: true
 *         type: string
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
 *               Position:
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

route.post('/add',isManager, addEmployeeValidation, CheckUser,employeeController.addEmployee);

/**
 * @swagger
 *
 * /employee/{id}:
 *   put:
 *     security: []
 *     summary: put Employee
 *     description: put Employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: my-token
 *         description: Access token.
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: employee id.
 *         in: path
 *         required: true
 *         type: string
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
 *               Position:
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
route.put('/:id',isManager,CheckUser,addEmployeeValidation,employeeController.updatedEmployee);


/**
 * @swagger
 *
 * /employee/suspend/{id}:
 *   put:
 *     security: []
 *     summary: suspend Employee
 *     description: suspend Employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: my-token
 *         description: Access token.
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: employee id.
 *         in: path
 *         required: true
 *         type: string
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
 *     responses:
 *       201:
 *         description: created
 */
route.put('/suspend/:id',isManager,employeeController.suspend);


/**
 * @swagger
 *
 * /employee/activate/{id}:
 *   put:
 *     security: []
 *     summary: suspend Employee
 *     description: suspend Employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: my-token
 *         description: Access token.
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: employee id.
 *         in: path
 *         required: true
 *         type: string
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
 *     responses:
 *       201:
 *         description: created
 */
route.put('/activate/:id',isManager,employeeController.activate);


/**
 * @swagger
 *
 * /employee/{id}:
 *   delete:
 *     security: []
 *     summary: delete Employee
 *     description: delete Employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: my-token
 *         description: Access token.
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: employee id.
 *         in: path
 *         required: true
 *         type: string
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
 *     responses:
 *       201:
 *         description: created
 */
route.delete('/:id',isManager,employeeController.deleteEmployee)


/**
 * @swagger
 *
 * /employee/search?searchKey={searchKey}:
 *   get:
 *     security: []
 *     summary: search Employee
 *     description: search Employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: my-token
 *         description: Access token.
 *         in: header
 *         required: true
 *         type: string
 *       - name: searchKey
 *         description: employee id.
 *         in: path
 *         required: true
 *         type: string
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
 *     responses:
 *       201:
 *         description: created
 */
route.get('/search',isManager,employeeController.search);

/**
 * @swagger
 *
 * /employee:
 *   get:
 *     security: []
 *     summary: get all Employee
 *     description: get all Employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: my-token
 *         description: Access token.
 *         in: header
 *         required: true
 *         type: string
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
 *     responses:
 *       201:
 *         description: created
 */
route.get('/',isManager,employeeController.getAllUser);



export default route;