import mongoose from 'mongoose';
import config from './config.js';
import log from './logger.js';

const conection = async () => {
    try {
        const con = await mongoose.connect(config.db.cs);
        log.info("Conexión establecida correctamente");
    } catch (e) {
        log.error("Error: ", e);
    }
}

export {
    conection
}