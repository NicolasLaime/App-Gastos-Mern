const express = require('express');
const usersRouter = require('./routes/usersRouter');
const mongoose = require('mongoose');
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoriasRouter = require('./routes/categoriasRouter');
const TransaccionesRouter = require('./routes/TransaccionesRouter');

const app = express();
require('dotenv').config();

// conexion a base de datos
mongoose
 .connect(process.env.DB_MONGO)
 .then(() => console.log('Conexion a base de datos exitosa'))
 .catch((e) => console.log(e))


// cors 
const corsOptions = {
    origin:['https://app-gastos-mern.vercel.app', // URL de tu frontend en Vercel
        'https://app-gastos-mern.onrender.com', // URL de tu backend en Render
        'http://localhost:8000',] // Localhost para desarrollo]
};
app.use(cors(corsOptions))


// Middlewares
app.use(express.json());



// rutas
app.use("/", usersRouter)
app.use('/', categoriasRouter)
app.use('/', TransaccionesRouter)

// manejo de errores
app.use(errorHandler)


// Inicio de server
const PORT = process.env.PORT || 8000;
app.listen( PORT, () => console.log(`Servidor iniciado correctamente en el puerto ${PORT}`))
