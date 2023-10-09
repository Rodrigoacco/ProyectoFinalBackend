import * as userServices from '../services/users.services.js';
import {generarToken, validarToken} from '../utils/validations.utils.js';
import { sendRecoverPassword } from '../utils/mail.utils.js';
import log from '../config/logger.js';

const getAllUsers = async (req, res) => {
    try{
        const result = await userServices.getAll();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getUserById = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).send("¡Id es obligatorio!");
    }
    try{
        const result = await userServices.getUserById(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const insertUser = async (req, res) => {
    try {
        const result = await userServices.create(req.body);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateUser = async (req, res) => {
    const {id} = req.query;
    if(!id) {
        return res.status(400).send("¡Id es obligatorio!");
    }
    try {
        const result = await userServices.updateUserById(id, req.body);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await userServices.deleteUser(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const passwordRecover = async (req, res) => {
    const { correo } = req.body;
    if (!correo) {
        return res.status(404).send("Correo no enviado");
    }
    try {
        const user = await userServices.getUserByEmail(correo);
        if(!user) {
            return res.status(404).send("Usuario no existente!");
        }
        const token = generarToken(correo);
        sendRecoverPassword(correo, token);
        res.status(200).send("reset de contraseña enviada!");
    } catch (e) {
        log.error("Error: ", e);
        res.status(500).send("Error interno");
    }
}

const recoverPassword = (req, res) => {
    const {token} = req.query;
    const {correo} = req.body;
    try {
        const checkToken = validarToken(token);
        if(!checkToken) {
            log.info("Invalid token");
            return res.status(401).send("Accesodenegado!");
        }
        const newToken = generarToken(correo);
        res.status(500).send("Enviar a la pagina y token por body, token: ${newToken}");
    } catch (e) {
        log.error("Error: ", e);
        res.status(500).send("Error interno");
    }
}

const resetPassword = async (req, res) => {
    const {correo, password} = req.body;
    try {
        const hashedPassword = await createHash(password);
        await userServices.updatePasswordByEmail(correo, hashedPassword);
        res.status(200).send("Contraseña modificada correctamente");
    } catch (e) {
        log.error("Error: ", e);
        res.status(500).send("Error interno");
    }
}

export {
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
    recoverPassword,
    passwordRecover,
    resetPassword
}