import express from 'express';
import { deleteUser, 
        getAllUsers, 
        getUserById, 
        insertUser, 
        updateUser, 
        passwordRecover, 
        resetPassword, 
        recoverPassword } from '../controllers/userControllers.js';
import { isUserOrTokenValid, checkRol, isAdmin } from '../middlewares/user.middlewares.js';
const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);
userRouter.get('/passwordRecover', passwordRecover);

userRouter.get('/recoverPassword', recoverPassword);


userRouter.post('/', checkRol, insertUser);

userRouter.post('/resetPassword', isUserOrTokenValid, resetPassword);

userRouter.put('/', isAdmin, checkRol, updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;