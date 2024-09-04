import {createSlice} from '@reduxjs/toolkit'

// Inicio de estado
const AutenticacionUsuario = createSlice({
    name:'autenticacion',
    initialState:{
        user: JSON.parse(localStorage.getItem('userInfo')) || null
    },

    // reducers
    reducers: {
        inicioSesionAction:(state,action) => {
           
            state.user = action.payload;
               
        },
        // cerrar sesion
        cerrarSesionaction: (state, action) => {
            state.user = null
        }
    }

})

// acciones
export const { inicioSesionAction, cerrarSesionaction} = AutenticacionUsuario.actions

// reducers
const AutenticacionReducer = AutenticacionUsuario.reducer
export default AutenticacionReducer