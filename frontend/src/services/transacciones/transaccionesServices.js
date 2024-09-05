import { BASE_URL } from "../../utils/url";
import axios from 'axios'
import { GetUserFromStore } from "../../utils/getUsersFromStorage";


// traer token
const token = GetUserFromStore()

// Agregar Transaccion
export const CrearTransaccionApi = async({type, monto, categoria, date, descripcion  }) => {
    const response = await axios.post(`${BASE_URL}/transacciones/crear`, {
        type,
        monto,
        categoria,
        date,
        descripcion
         },{
            headers: {
                Authorization: `Bearer ${token}`
            }
         });
    // retorno de promesa 
    return response.data
}


// Traer lista Transacciones 

export const ListaTransaccionesApi = async({categoria, type, startDate , endDate}) => {
    const response = await axios.get(`${BASE_URL}/transacciones/lista`,{
        params: {
            categoria, type, startDate , endDate
        },
        headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
}


