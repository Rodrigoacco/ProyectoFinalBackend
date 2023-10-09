import * as sessionServices from '../services/session.services.js';
import { isValidPass, hashPassword } from '../../src/utils/utils.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const { email, password } = req.body;

    if( !email || !password ) {
        return res.status(400).json({err: 'Missing fields'})
    }
    
    const user = await sessionServices.find();

    if (!user){
        return res.status(404).json({err: 'User not found'})
    }

    if(!isValidPass(user, password)) {
        return res.status(401).json({err: 'Invalid password'})
    } 

    const token = jwt.sign({email, first_name: user.first_name, last_name: user.last_name, role: user.role }, 'pageSecret', { expiresIn: '10m' });
    res.status(200).cookie('secretToken', token, {maxAge: 10000, httpOnly: true})
    res.redirect('/v1/api/business')
}

const register = async (req, res) =>{
    const { first_name, last_name, email, age, password } = req.body;

    if( !first_name || !last_name || !age || !email || !password ) {
        return res.status(400).json({err: 'Missing fields'})
    }
    
    const user = await sessionServices.find();

    if (user){
        return res.status(404).json({err: 'Email already exists in the database'})
    }

    const newuser = await userModel.create({first_name, last_name, email, age, password: hashPassword(password)})

    return res.status(201).redirect('/login');
}

const current = async (req, res) => {
    res.send(req.user)
}

const logout = async (req, res) => {
    res.clearCookie('secretToken')
    res.redirect('/login');
}

export {
    login,
    register,
    current,
    logout
}