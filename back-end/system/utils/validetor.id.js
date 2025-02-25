import mongoose from 'mongoose';
import AppError from "./appError.js";

const ValidatorId = (req, res, next) => {
    const id = req.params.id;
    let test = mongoose.Types.ObjectId.isValid(id);
    if (!test) {
        const error = AppError.create('error', 'invalid id', 400)
        return next(error);
    }
    next();
}

export default ValidatorId
