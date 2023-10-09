import express from 'express';
import { passportCall } from  '../../src/utils/utils.js';
import { login, register, current, logout } from '../controllers/sessionControllers.js';

const sessionRouter = express.Router();

sessionRouter.post('/login', login);

sessionRouter.post('/register', register);

sessionRouter.get('/current', passportCall('current'), current);

sessionRouter.get('/logout', logout);

export default sessionRouter;