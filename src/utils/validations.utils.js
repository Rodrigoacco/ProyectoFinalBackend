import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config.js';

const generarToken = (user) => jwt.sign ( {user}, config.jwt.token, {expiresIn: '1h'});

const validarToken = (token) => jwt.verify(token, config.jwt.token, (err) => err ? falzse : true);

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export {
    generarToken,
    validarToken,
    createHash
}