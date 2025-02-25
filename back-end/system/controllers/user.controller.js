import {validationResult} from 'express-validator';
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import User from '../models/userSchame.js'; // Ensure this path is correct
import jwtSign from "../utils/jwtSign.js";
import asyncWrapper from "../middelwares/asyncWrapper.js"
import AppError from '../utils/appError.js'

dotenv.config()

const getAllUsers = asyncWrapper(
    async (req, res, next) => {
        let lim = parseInt(req.query.limit) || 1;
        let sk = parseInt(req.query.skip) || 1;

        const users = await User.find({}, {'__v': 0}) // Hides __v field
            .limit(lim)
            .skip(lim * (sk - 1));

        res.status(200).json({status: "success", data: users, code: 200});
    }
);


const getUserById = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            const error = AppError.create('User not found', 404, 'failure')
            return next(error);
        }
        res.status(200).json({status: "success", data: user, code: 200});
    }
)


const register = asyncWrapper(async (req, res, next) => {

    const errors = validationResult(req);
    console.error(errors.array())
    if (!errors.isEmpty()) {
        console.error(errors)
        const error = AppError.create('Validation Error', {data: [...errors]}, 400);
        return next(error);
    }

    const {password, email, ...rest} = req.body;

    // Check for existing user
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return next(AppError.create("error", "Email already exists", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        ...rest,
        email,
        password: hashedPassword,
    });

    await user.save();
    const token = jwtSign({userId: user._id, email: user.email, role:  user.role}, {expiresIn: '1m'});

    // Remove sensitive data from response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.__v;

    res.status(201).json({
        status: "success", data: userResponse, token, code: 201,
    });
});


const login = asyncWrapper(
    async (req, res, next) => {
        const {email, password} = req.body;
        // console.log(email, password);
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            const error = AppError.create('failure', 'Invalid email or password', 401);
            return next(error);
        }
        const token = jwtSign({userId: user._id, email: user.email, role: user.role}, {expiresIn: '1m'});

        // Remove sensitive data from response
        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.__v;
        res.json({
            status: "success", data: userResponse, token, code: 200,
        });
    })

const deleteUser = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            const error = AppError.create('User not found', 404, 'failure')
            return next(error);
        }
        res.status(204).send({status: "success", data: "null"});
    });


export default {
    getAllUsers,
    register,
    login,
    // addProduct,
    // updateProduct,
    // getAllProduct,
    // getProductById,
    // updateUser,
    deleteUser,
    // getUserById,
};

