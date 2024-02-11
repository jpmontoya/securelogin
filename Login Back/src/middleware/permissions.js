function empleado(req, res, next) {
    try {
        if (!req.user.permissions.includes("empleado")) {
            throw new Error("No tienes los permisos necesarios");
        }
        next();
    } catch (error) {
        res.status(403).send({
            error: true,
            message: error.message
        });
        return;
    }
}

function administrador(req, res, next) {
    try {
        if (!req.user.permissions.includes("administrador")) {
            throw new Error("No tienes los permisos necesarios");
        }
        next();
    } catch (error) {
        res.status(403).send({
            error: true,
            message: error.message
        });
        return;
    }
}


module.exports = { empleado, administrador };