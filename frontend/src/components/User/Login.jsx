import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { LoginApi } from "../../services/users/userServices";
import MensajeAlerta from "../alerta/MensajeAlerta";
import { inicioSesionAction } from "../../redux/slice/Autenticacion";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";








// validaciones 
const validacionesSchema = Yup.object({
    email: Yup.string().email('Invalid').required('email es requerido'),
    password: Yup.string().min(3, 'la contraseña debe tener un minimo de 5 caracteres').required('email es requerido')

})

const Login = () => {
    
    // navigate
    const navigate = useNavigate()
    

    // dispatch
    const dispatch = useDispatch()

    
    // mutacion
    const {mutateAsync, isPending,isError, error, isSuccess} = useMutation({
       mutationFn: LoginApi,
       mutationKey: ['login'] 
    })

     
    const formik = useFormik({
        initialValues:{
           email: '',
           password: "" 
        },
        // validaciones
        validacionesSchema,
        // submit - enviar formulario
        onSubmit:(values) => {
            console.log(values)
            // http req
            mutateAsync(values)
            .then((data) => {
              // dispatch
              dispatch(inicioSesionAction(data))
              // guardar usuario
              localStorage.setItem('userInfo', JSON.stringify(data))
            })
            .catch((e) => console.log(e))
        }
    })
    
    // redireccion de pagina
    
  useEffect(() => {
    setTimeout(() => {
      if(isSuccess){
        navigate('/dashboard')
      }
    })         

  },[isPending, isError, error, isSuccess])
    


  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Iniciar sesion
      </h2>
      {/* Display messages */}
      
      {isPending && <MensajeAlerta type="loading" message='Cargando...' />} 
            {isError && (<MensajeAlerta type='error' message={error.response.data.message} />)} 
            {isSuccess && (<MensajeAlerta type='success' message={'Inicio de sesión exitoso'} />)} 

      <p className="text-sm text-center text-gray-500">
        Inicia sesion para acceder a tu cuenta
      </p>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
           {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Iniciar sesion!
      </button>
    </form>
  );
};

export default Login;