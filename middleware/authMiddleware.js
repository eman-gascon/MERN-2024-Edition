import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) throw new UnauthenticatedError('Authentication Invalid');
    
    try {
        const user = verifyJWT(token);
        console.log(user);
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
};