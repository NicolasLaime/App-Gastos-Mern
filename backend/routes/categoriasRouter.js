const express = require('express')
const UsersController = require('../controllers/usersController');
const AutenticacionUsuario = require('../middlewares/isAuth');
const categoriaController = require('../controllers/categoriaController');


const categoriasRouter = express.Router()


// Agregar
categoriasRouter.post('/api/v1/categorias/crear-categoria', AutenticacionUsuario, categoriaController.crear);

// Listar Categorias
categoriasRouter.get('/api/v1/categorias/lista', AutenticacionUsuario, categoriaController.lista);

// actualizar
categoriasRouter.put('/api/v1/categorias/actualizar/:id', AutenticacionUsuario, categoriaController.ActualizarCategoria);

// Borrar categoria
categoriasRouter.delete('/api/v1/categorias/borrar/:id', AutenticacionUsuario, categoriaController.Borrar);







module.exports = categoriasRouter;