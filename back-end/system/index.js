import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';

import productRouter from './routers/product.route.js';
import userRouter from './routers/user.route.js';

dotenv.config()
const app = express();
const homePage = fs.readFileSync('./views/home.html', 'utf-8');

app.use(express.json());
app.use(cors())
app.use('/api/products/', productRouter)
app.use('/api/users/', userRouter)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/uploads/', express.static(path.join(__dirname, 'uploads')));
app.all('*', (req, res, next) => {
    res.status(404).json({status: "error", data: null, msg: "NOT FOUND ROUT"});
})


app.use((error, req, res, next) => {
    res.status(error.statusCode || 400).json({status: error.statusMessage || 'error', message: error.errorMessage||"no",data:[null], code: error.statusCode});
    // next(error);
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});