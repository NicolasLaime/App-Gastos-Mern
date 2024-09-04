import { GetUserFromStore } from "../../utils/getUsersFromStorage";
import { BASE_URL } from "../../utils/url";
import axios from 'axios'




const token = GetUserFromStore()




// inicio de sesion-login
export const LoginApi = async(values) => {
    const response = await axios.post(`${BASE_URL}/users/login`, values);
    // retorno de promesa 
    return response.data
}



// registrarse
export const RegistrarseApi = async({email, password, username}) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        email,
        password,
        username,
    });
    // retorno de promesa 
    return response.data
}


// Cambiar contraseña
export const CambiarContraseñaApi = async(newPassword) => {
    const response = await axios.put(`${BASE_URL}/users/cambiar-password`, {
        newPassword
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    // retorno de promesa 
    return response.data
}



// actualizar nombre e email
export const ActualizarUsuarioApi = async({ email, username}) => {
    const response = await axios.put(`${BASE_URL}/users/actualizar-usuario`, {
        email, username
    },{
        headers:{
            Authorization: `bearer ${token}`
        }
    });
    // retorno de promesa 
    return response.data
}

