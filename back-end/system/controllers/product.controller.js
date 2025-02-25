import {validationResult} from 'express-validator';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import Product from '../models/productSchame.js'; // Ensure this path is correct
import asyncWrapper from "../middelwares/asyncWrapper.js"
import AppError from '../utils/appError.js'
import ValidatorId from "../utils/validetor.id.js";


dotenv.config()
const url = process.env.MONGO_URL;


mongoose.connect(url)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });


const getAllProduct = asyncWrapper(
    async (req, res, next) => {
        let lim = parseInt(req.query.limit) || 2;
        let sk = parseInt(req.query.skip) || 1;

        const product = await Product.find({}, {'__v': false}, {}) // Hides __v field
            .limit(lim)
            .skip(lim * (sk - 1));

        res.status(200).json({status: "success", data: product, code: 200});
    }
);


const getProductById = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.id;
        const user = await Product.findById(id);
        if (!user) {
            const error = AppError.create('failure', 'product not found', 404)
            return next(error);
        }
        return res.status(200).json({status: "success", data: user, code: 200});

    }
)


const addProduct = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = AppError.create('error', errors.array(), 400)
            return next(error);
        }
        const product = req.body;
        const newProduct = new Product(product);
        await newProduct.save()
        res.status(201).json({status: "success", data: newProduct, code: 201});
    });


const updateProduct = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.id;
        let product = await Product.findByIdAndUpdate(id, {...req.body}, {new: true});

        if (!product) {
            const error = AppError.create('failure','product not found', 404 )
            return next(error);
        }
        // product = await Product.findById(id);

        res.status(201).json({status: "success", data: product, code: 201});
    });


const deleteProduct = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            const error = AppError.create('failure','product not found', 404, )
            return next(error);
        }
        res.status(204).send({status: "success", data: "null", code: 204});
    });

// Export the functions
export default {
    getAllProduct,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};

