import { Router } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../helpers/api-specifications';
import authRoutes from  "./auth.routes";
import employeeRoutes from "./employee.routes";


const route=Router();
const swaggerDoc = swaggerJsdoc(swaggerOptions);

route.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

route.use('/auth',authRoutes);
route.use('/employee',employeeRoutes);



export default route;