const asyncHandler = require('express-async-handler')
const Categoria = require('../model/Categoria')
const Transacciones = require('../model/Transacciones')


//Registro de usuario
const categoriaController = {
    
    
       // crear categoria
       crear: asyncHandler(async (req,res) => {
        const {name, type} = req.body
        if(!name || !type){
            throw new Error('Nombre y tipo requerido obligatoriamente para crear categoria')
        }
        // convertir nombre a miniscula
        const normalizarNombre = name.toLowerCase()
        // chequear si el type es valido
        const validarType = ['ingreso' , 'gasto'];
        if(!validarType.includes(type.toLowerCase())){
            throw new Error('Tipo de categoria invalido' + type);
        }
        // chequear si ya existe la categoria en el usuario
        const existeCategoria = await Categoria.findOne({
            name: normalizarNombre,
             user: req.user
            });
            if(existeCategoria){
                throw new Error(`Categoria ${existeCategoria.name} ya existe en la base de datos`);
            }
        // crear la categoria
        const categoria = await Categoria.create({
            name: normalizarNombre,
            user: req.user,
            type

        });
        res.status(200).json(categoria)
       }),
       
    
    
    
        //listar categorias
        lista: asyncHandler(async (req,res) => {
           const categorias = await Categoria.find({user: req.user});
           res.status(200).json(categorias)
        }),


        //Actualizar categorias
         ActualizarCategoria: asyncHandler(async (req,res) => {
           const categoriaId = req.params.id
           const {type, name} = req.body
           const normalizarNombre = name.toLowerCase()
           const categoria = await Categoria.findById(categoriaId)
           if(!categoria && categoria.user.toString() !== req.user.toString()){
               throw new Error('Categoria no encontrada o usuario no autorizado')
           }
           
           const nombreviejo = categoria.name;
           //Actualizar las propiedades de la categoría   
           categoria.name = name
           categoria.type = type
           const actualizarCategoria = await categoria.save()
           if(nombreviejo !== actualizarCategoria.name){
              await Transacciones.updateMany({
                user: req.user,
                categoria: nombreviejo
              },
              {
                $set:{categoria: actualizarCategoria.name}
              }
            ) 
           }
            res.json(actualizarCategoria)  
         }),


         //Borrar categorias
        Borrar: asyncHandler(async (req,res) => {
            const categoria = await Categoria.findById(req.params.id);
            if(categoria && categoria.user.toString() === req.user.toString()){
                const defaultCategorias = 'SinCategoria'
                await Transacciones.updateMany({user:req.user, categoria: categoria._id},
                    {$set: {categoria: defaultCategorias}}
                )
                // borrar categoria
                await Categoria.findByIdAndDelete(req.params.id);
                res.json({message: 'Categoria removida y transaccion actualizada'})
            }else{
                res.json({message: 'categoria no encontrada o usuario no autorizado'})
            }
         }),
 
        
        
        
    
    
        
         

}


module.exports = categoriaController;