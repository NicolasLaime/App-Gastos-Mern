const jwt = require('jsonwebtoken')


const AutenticacionUsuario = async(req, res , next) => {
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1]
    console.log(token) 
    // verificar token
    const verificarToken = jwt.verify(token, 'nicolas', (err, decoded) => {
        console.log(decoded)
        if(err){
            return false
        }else{
            return decoded
        }
    })
    if(verificarToken){
        // guardar el usuario
        req.user = verificarToken.id
        next()
    }else{
        const err = new Error('Token expirado , inicia sesion denuevo ') 
        next(err);
    }
    
}



module.exports = AutenticacionUsuario