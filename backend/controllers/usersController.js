const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')


//Registro de usuario
const UsersController = {
    
    
       // registro
       register: asyncHandler(async (req,res) => {
        const {username, email , password} = req.body
        // validacion
        if(!username || !email || !password){
            throw new Error('Todos los campos son requeridos')
        }
        // verificacion si el usuario ya existe
        const usuarioExistente = await User.findOne({email});
        if(usuarioExistente){
            throw new Error('El usuario ya existe')
        }
        // contraseña db
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        // guardar en base de datos
        const UsuarioCreado = await User.create({
            email,
            username,
            password: hashPassword
        })
           
        res.json({
            username: UsuarioCreado.username,
            email: UsuarioCreado.email,
            id: UsuarioCreado.id
        })
       }),
    
    
    
        //!login
        login: asyncHandler(async (req,res) => {
            // traer usuario
             const {email, password} = req.body;
            //  si el email es incorrecto
            const user = await User.findOne({email});
            if(!user){
                throw new Error('Credenciales incorrectas')
            }
            // comprar usuario contraseña
            const  isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                throw new Error('Credenciales Incorrectas')
            }
            // Generar Token
            const token = jwt.sign({id: user._id}, 'nicolas', {
                expiresIn: '30d'
            })
            // enviar espuesta
            res.json({
                message: 'Login exitoso',
                token,
                id: user._id,
                email:user.email,
                username: user.username
            })
        }),

    
    
        // perfil
        perfil: asyncHandler(async(req,res ) => {
            // buscar usuario
            console.log(req.user)
            const user = await User.findById(req.user)
            if(!user){
                throw new Error('Usuario no funciona')
            }
            // respuesta
            res.json({
                username: user.username, email: user.email
            })
        }),
        
        
        // Cambiar contraseña
        cambiarPassword: asyncHandler(async(req,res ) => {
            const {newPassword} = req.body
            // buscar usuario
            console.log(req.user)
            const user = await User.findById(req.user)
            if(!user){
                throw new Error('Usuario no funciona')
            }
            // hash a la nueva contraseña antes de guardar
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashPassword;
            // volver a guardar
            await user.save({
                validateBeforeSave: false,
            })
            // respuesta
            res.json({
                message: 'Contraseña cambiada correctamente'
            })
        }),


        // Actualizar perfil de usuario
        ActualizarPerfil: asyncHandler(async(req,res ) => {
            const {email, username} = req.body
            // actualizar usuario
            const actualizarUsuario = await User.findByIdAndUpdate(req.user,{
                username,
                 email
            },
            {
                new:true
            }
        )
            // respuesta
            res.json({
                message: 'Usuario Actualizado Correctamente' , actualizarUsuario
            })
        })
         

}


module.exports = UsersController;