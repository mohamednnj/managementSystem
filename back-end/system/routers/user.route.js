import express from 'express';
import controller from '../controllers/user.controller.js';
import multer from 'multer'
import verifyToken from '../utils/verifyToken.js'
import userRole from '../utils/userRole.js'
import {body} from "express-validator";
import appError from "../utils/appError.js";

const handler = () => [
    body('name').notEmpty().isLength({min: 2}),
    body('age').isInt({gt: 0})]

const userRoute = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // const exe = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const fileFilter = (req, file, cb)=>{
    const exe = file.mimetype.split('/')[1];
    if (exe === 'jpg' || exe === 'png' || exe === 'jpeg') {
        cb(null, true);
    } else {
        cb(appError.create('error','can not upload this file should [.png, .jpg, .jpeg]',400), false);
    }
}

const upload = multer({storage: storage,fileFilter:fileFilter})

userRoute.route('/')
    .get(controller.getAllUsers);
userRoute.route('/register/')
    .post(upload.single('avatar'), controller.register);
userRoute.route('/login/')
    .post(controller.login);

userRoute.route('/user/:id')
    .delete(controller.deleteUser);

// .get( ss.getUserById)
//     .patch(ss.updateUser)

export default userRoute;