import jwt from 'jsonwebtoken';
import { env } from '../../utils/config/env';

export const generateToken = (payload: object) => {    
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' }); // Use a secret and set expiration
};
