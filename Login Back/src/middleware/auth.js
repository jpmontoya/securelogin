const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            throw new Error("No se proporcionó un token");
        }

        const decoded = jwt.verify(token, process.env.PRIVATE_KEY_JWT);
        // if(err){
        //     throw new Error("Token expirado");
        // }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({
            error: true,
            message: error.message
        });
        return;
    }
}