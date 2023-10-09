import { validarToken } from "../utils/validations.utils.js";

const isUserOrTokenValid = (req, res, next) => {
    if(req.user) {
        return next();
    }
    const authToken = req.headers.authorization;
    const checkToken = validarToken(authToken);
    if(checkToken) {
        return next();
    }
    return res.status(401).send("No autorizado");
}

const checkRol = (req, res, next) => {
    const roles = ['user', 'premium', 'admin'];
    const rolUser = req.body.rol?.toLowerCase();
    const isRolValid = roles.includes(rolUser);
    if(isRolValid){
        next();
    } else {
        req.body.rol = 'user';
        next();
    }
}

const isAdmin = (req, res, next) =>{
    const isAdmin = req.user.rol;
    if(!isAdmin) {
        return res.status(401).send("No autorizado");
    }
    next();
}

export {
    isUserOrTokenValid,
    checkRol,
    isAdmin,
}