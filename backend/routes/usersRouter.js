const express = require('express')
const UsersController = require('../controllers/usersController');
const AutenticacionUsuario = require('../middlewares/isAuth');


const usersRouter = express.Router()


// registro
usersRouter.post('/api/v1/users/register', UsersController.register);
// login
usersRouter.post('/api/v1/users/login', UsersController.login)

// perfil
usersRouter.get('/api/v1/users/perfil', AutenticacionUsuario , UsersController.perfil )

// actualizar contraseña
usersRouter.put('/api/v1/users/cambiar-password', AutenticacionUsuario , UsersController.cambiarPassword )

// actualizar perfil
usersRouter.put('/api/v1/users/actualizar-usuario', AutenticacionUsuario , UsersController.ActualizarPerfil )







module.exports = usersRouter;