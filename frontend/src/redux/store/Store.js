import { configureStore } from '@reduxjs/toolkit';
import AutenticacionReducer from '../slice/Autenticacion';


export const store = configureStore({
  reducer: {
    autenticacion: AutenticacionReducer
  },
});



