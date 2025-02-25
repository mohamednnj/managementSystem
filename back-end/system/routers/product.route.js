import express from 'express';
import controller from '../controllers/product.controller.js';
import verifyToken from "../utils/verifyToken.js";
import {body} from "express-validator";
import ValidatorId from "../utils/validetor.id.js";
import userRole from "../utils/userRole.js";

const handler = () => [
    body('name').notEmpty().isLength({min: 2}),
    body('age').isInt({gt: 0})]

const productRoute = express.Router();

productRoute.route('/')
    .get(verifyToken, controller.getAllProduct)
    .post(verifyToken,userRole('admin') ,controller.addProduct);

productRoute.route('/product/:id')
    .get(ValidatorId,controller.getProductById)
    .patch(ValidatorId,controller.updateProduct)
    .delete(ValidatorId,controller.deleteProduct);

export default productRoute;