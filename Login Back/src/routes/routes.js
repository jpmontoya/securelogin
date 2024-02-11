const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { empleado, administrador } = require("../middleware/permissions.js");
const serverController = require("../controllers/serverController.controller");
const authController = require("../controllers/authController.controller.js");

const generatePass = require('../generatePass');

module.exports = () => {

    //Verify server status
    router.get('/ping', serverController.statusServer);

    //Authentication
    router.post('/auth', authController.auth);
    
    //Generate Password
    router.get('/genpass', generatePass.genpass);

    //Validate routes
    router.get('/auth/route', [auth], authController.verifyClientRoute);
    router.get('/auth/permission', [auth, empleado], authController.verifyClientRoute);
    router.get('/auth/routelogin', [auth], authController.verifyClientRouteLogin);

    return router;
}