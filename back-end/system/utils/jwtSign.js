import jwt from "jsonwebtoken";

function jwtSign(payload, options) {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {...options}
    )
}

export default jwtSign