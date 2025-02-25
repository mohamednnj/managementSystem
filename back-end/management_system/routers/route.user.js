import express from "express";
import controller from '../controllers/controller.user.js';
// import verifyToken from '../utils/verifyToken.js'
// import userRole from '../utils/userRole.js'
import {body} from "express-validator";
import {appError} from "../utilities/appError.js";

const handler = () => [
    body('name').notEmpty().isLength({min: 2}),
    body('age').isInt({gt: 0})]

const userRoute = express.Router();

userRoute.route('/')
    .get(controller.getAllUsers);
userRoute.route('/login/')
    .post(controller.login);

userRoute.route('/register/')
    .post( controller.register);

export default userRoute