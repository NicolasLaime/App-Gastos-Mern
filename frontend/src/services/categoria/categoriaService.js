import { BASE_URL } from "../../utils/url";
import axios from 'axios'
import { GetUserFromStore } from "../../utils/getUsersFromStorage";


// traer token
const token = GetUserFromStore()

// Agregar Categoria
export const crearCategoriaApi = async({name, type}) => {
    const response = await axios.post(`${BASE_URL}/categorias/crear-categoria`, {
        name,
        type,
         },{
            headers: {
                Authorization: `Bearer ${token}`
            }
         });
    // retorno de promesa 
    return response.data
}


// Traer lista categoria 

export const ListaCategoriaApi = async() => {
    const response = await axios.get(`${BASE_URL}/categorias/lista`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
}

// Actualizar
export const ActualizarCategoriaApi = async({name, type, id}) => {
  const response = await axios.put(`${BASE_URL}/categorias/actualizar/${id}`, {
      name,
      type,
       },{
          headers: {
              Authorization: `Bearer ${token}`
          }
       });
  // retorno de promesa 
  return response.data
}

// Borrar categoria
export const BorrarCategoriaApi = async(id) => {
  const response = await axios.delete(`${BASE_URL}/categorias/borrar/${id}`, 
      {
          headers: {
              Authorization: `Bearer ${token}`
          }
       });
  // retorno de promesa 
  return response.data
}

