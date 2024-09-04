const asyncHandler = require('express-async-handler')
const Categoria = require('../model/Categoria');
const Transacciones = require('../model/Transacciones');


// Logica de Transacciones
const TransaccionesController = {
    
    
       // crear transaccion
       crear: asyncHandler(async (req,res) => {
          const {type, categoria , monto , date , descripcion} = req.body;
          if(!type || !monto || !date){
           throw new Error('tipo , monto y fecha son requeridos')
          }
          //crear 
          const transaccion = await Transacciones.create({
            user: req.user,
            type,
            categoria,
            monto,
            descripcion
          });
          res.status(200).json(transaccion)   
       }),
       
    
    
    
        //obtener transacciones
        listaTransacciones: asyncHandler(async (req,res) => {
          const transacciones = await Transacciones.find({user: req.user});
          res.json(transacciones)
        }),


        //obtener transacciones filtradas
        filtroTransacciones: asyncHandler(async (req,res) => {
            const {startDate, endDate, type, categoria} = req.query;
            let filtros = {user: req.user}
            if(startDate){
                filtros.date = {...filtros.date, $gte: new Date(startDate)}
            }
            if(endDate){
                filtros.date = {...filtros.date, $lte: new Date(endDate)}
            }
            if(type){
                filtros.type = type
            }
            if(categoria){
                if(categoria === 'all'){
                    // no es necesario filtrar por categoiras
                }else if(categoria === 'SinCategoria'){
                    filtros.categoria = 'SinCategoria'
                }else{
                    filtros.categoria = categoria
                }
            }
            // Buscar transacciones en la base de datos aplicando los filtros y ordenarlas por fecha descendente
            const transacciones = await Transacciones.find(filtros).sort({date:-1})
            res.json(transacciones)
           }),

        
       // Actualizar transaccion
           Actualizar: asyncHandler(async (req,res) => {
            //buscar transaccion
            const transaccion = await Transacciones.findById(req.params.id);
            if(transaccion && transaccion.user.toString() === req.user.toString()){
                //
                transaccion.type = req.body.type || transaccion.type,
                transaccion.categoria = req.body.categoria || transaccion.categoria,
                transaccion.monto = req.body.monto || transaccion.monto,
                transaccion.date = req.body.date || transaccion.date,
                transaccion.descripcion = req.body.descripcion || transaccion.descripcion

                // actualizar
                const ActualizarTransaccion = await transaccion.save()
                // guardar en db
                res.json(ActualizarTransaccion)



            }
          }),

          // Borrar transaccion
          Borrar: asyncHandler(async (req,res) => {
            // buscar transaccion
            const transaccion = await Transacciones.findById(req.params.id);
            if(transaccion && transaccion.user.toString() === req.user.toString()){
                await Transacciones.findByIdAndDelete(req.params.id)
                res.json({message: 'Transaccion Eliminada Correctamente '})
            }
               

               
          }),

        
        
        
    
    
        
         

}


module.exports = TransaccionesController;