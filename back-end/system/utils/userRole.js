import jwt from 'jsonwebtoken';
import appError from "./appError.js";

const checkUserRole = (...role) => {

    return (req, res, next) => {
        try {
            const user = req.currentUser;
            if (![...role].includes(user.role)) {
                const error = appError.create("error", "you are not authorized to access this resource", 403);
                return next(error);
            }
            next();
        } catch (e) {
            const error = appError.create("error", "error in permissions", 401);
            return next(error);
        }
    }
}
export default checkUserRole