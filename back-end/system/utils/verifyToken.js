import jwt from 'jsonwebtoken';
import appError from "./appError.js";
// current
const verifyToken = (req, res, next) =>{
    const authorHeader = req.headers.Authorization || req.headers.authorization;
    const token = authorHeader.split(" ")[1];
    try {
        req.currentUser = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch (e) {
        const error = appError.create("error","invalid token",401);
        return next(error);
    }
}

export default verifyToken