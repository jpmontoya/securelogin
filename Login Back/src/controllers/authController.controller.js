const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const pool = require("../config/connection.js");

exports.auth = async (req, res) => {
    const maxTimeout = 15000;
    let statusCodeError = 500;

    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!validatorEmail(email) || password === '') {
            statusCodeError = 401;
            throw new Error("Usuario o contraseña inválidas");
        }

        //****** EVALUAMOS EL USUARIO ******** */
        const sql = `SELECT id, user_name, email, password, permissions FROM users WHERE email = '${email}'`;
        const findUser =  new Promise((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) {
                    statusCodeError = 500;
                    reject(new Error("Error en la consulta a la base de datos"));
                } else if (result.length === 0) {
                    statusCodeError = 404;
                    reject(new Error("Usuario o contraseña incorrectos"));
                } else {
                    resolve(result[0]);
                };
            });
        });

        const timeoutUser = new Promise((resolve, reject) => {
            setTimeout(() => {
                statusCodeError = 408;
                reject(new Error("Tiempo de espera agotado al consultar la base de datos"));
            }, maxTimeout);
        });

        const user = await Promise.race([findUser, timeoutUser]);

        //****** EVALUAMOS LA CONTRASEÑA ******** */
        const verifyPassword = new Promise((resolve) => {
            resolve(bcrypt.compare(password, String(user.password)));
        });

        const timeoutPassword = new Promise((resolve, reject) => {
            setTimeout(() => {
                statusCodeError = 408;
                reject(new Error("Tiempo de espera agotado al consultar la base de datos"));
            }, maxTimeout);
        });

        const verifiedPassword = await Promise.race([verifyPassword, timeoutPassword]);

        if (!verifiedPassword) {
            statusCodeError = 404;
            throw new Error("Usuario o contraseña incorrectos");
        }

        const token = jwt.sign({
            id: user.id,
            user_name: user.user_name,
            email: user.email,
            permissions: user.permissions
        },
            process.env.PRIVATE_KEY_JWT, { expiresIn: "5h" });
        res.status(200).send({
            error: false,
            message: '',
            data: token
        });

    } catch (error) {
        res.status(statusCodeError).send({
            error: true,
            message: error.message
        });
    }
}

function validatorEmail(email) {
    const patternEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patternEmail.test(email);
}

exports.verifyClientRoute = (req, res) => {
    res.status(200).send({
        error: false,
        message: '',
        data: true
    });
}

exports.verifyClientRouteLogin = (req, res) => {
    res.status(200).send({
        error: false,
        message: '',
        data: false
    });
}