const express = require('express')
const UsersController = require('../controllers/usersController');
const AutenticacionUsuario = require('../middlewares/isAuth');
const categoriaController = require('../controllers/categoriaController');
const TransaccionesController = require('../controllers/TransaccionesController');


const TransaccionesRouter = express.Router()


// Agregar
TransaccionesRouter.post('/api/v1/transacciones/crear', AutenticacionUsuario, TransaccionesController.crear);

// Listar Categorias
// TransaccionesRouter.get('/api/v1/transacciones/lista', AutenticacionUsuario, TransaccionesController.listaTransacciones);

// Filtrado de transacciones
TransaccionesRouter.get('/api/v1/transacciones/lista', AutenticacionUsuario, TransaccionesController.filtroTransacciones);

// Actualizar transaccion
TransaccionesRouter.put('/api/v1/transacciones/actualizar/:id', AutenticacionUsuario, TransaccionesController.Actualizar);

// Borrar Transaccion
TransaccionesRouter.delete('/api/v1/transacciones/borrar/:id', AutenticacionUsuario, TransaccionesController.Borrar);











module.exports = TransaccionesRouter;