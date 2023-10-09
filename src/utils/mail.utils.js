import trasporter from '../config/mails.js'
import config from '../config/config.js'
import log from '../config/logger.js';

const sendRecoverPassword = (email, token) => {
    const url = config.url.recoverPasswordUrl + `?token=${token}`;
    const button = `<a href=${url} target="_blanck">
                        <button>Recuperar contraseña</button>
                    </a>`;
    const mailOptions = {
        from: 'noreply@miempresa.com',
        to: email,
        subjet: 'Recuperacion de contraseña',
        html: `
            <h1>Por favor haga click en el siguiente boton para recuperar la contraseña</h1>
            <hr>
            ${button}
        `
    }
    trasporter.sendMail(mailOptions, (err, info) =>{
        if(err) {
            log.error("Error: ", err);
            return;
        }
        log.info("Mail enmviado: ", info);
    });
}

export {
    sendRecoverPassword,
}