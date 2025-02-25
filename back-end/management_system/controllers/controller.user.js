import {validationResult} from 'express-validator';
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

import asyncWrapper from '../middlewares/asyncWrapper.js'
import User from '../models/model.user.js'
import {appError, appSuccess} from "../utilities/appError.js";

const getAllUsers = asyncWrapper(
    async (req, res, next) => {
        let [limit, skip] = [req.query.limit || 2, req.query.skip || 1]
        let users = await User.find({}, {'__v': false})
            .limit(limit)
            .skip(limit * (skip - 1));
        res.status(200).json({status: "success", data: users, code: 200, appName: 'getAllUsers'});
    }
)


const register = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {                                         //[0].msg
            const error = appError.create(400, errors.array(), 'bad request', 'register');
            return next(error);
        }
        let {firstName, lastName, gender, email, avatar, phone, password} = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({firstName, lastName, gender, email, avatar, phone, password: hashedPassword});
        await user.save();
        res.status(201).json(appSuccess.create(201, 'User created successfully', 'success', 'register'))
    }
)


const login = asyncWrapper(
    async (req, res, next) => {
        let [email, password] = [req.body.email, req.body.password];
        const user = await User.findOne({email});
        console.log(user)
        const compared = await bcrypt.compare(password, user.password);
        if (!user || !compared) {
            const error = appError.create(404, "Email or password is incorrect", "unValid", 'login');
            return next(error);
        }
        res.status(200).json(appSuccess.create(201, 'login success', 'success', 'login'))
    }
)
export default {
    getAllUsers,
    login,
    register,
}