import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { RegistrarseApi } from "../../services/users/userServices";
import MensajeAlerta from "../alerta/MensajeAlerta";
import { useNavigate } from "react-router-dom";


//Validations
const validacionesSchema = Yup.object({
  username: Yup.string().required("Username es requerido"),
  email: Yup.string()
    .email("email no valido")
    .required("Email es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Es necesario confirmar su contraseña"),

});
const Registro = () => {

  // navigate
  const navigate = useNavigate()


  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: RegistrarseApi,
    mutationKey: ['register']
  })



  const formik = useFormik({
    initialValues: {
      email: '',
      password: "",
      username: ""
    },
    // validaciones
    validacionesSchema,
    // submit - enviar formulario
    onSubmit: (values) => {
      console.log(values)
      // http req
      mutateAsync(values)
        .then((data) => {
          console.log(data)
        })
        .catch((e) => console.log(e))
    }
  })
  
  // redireccion de pagina 

  useEffect(() => {
    setTimeout(() => {
      if(isSuccess){
        navigate('/login')
      }
    })         

  },[isPending, isError, error, isSuccess])


  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Registrate
      </h2>
      {/* Display messages */}
      {isPending && <MensajeAlerta type="loading" message='Cargando...' />} {/* Cambio aquí */}
      {isError && (<MensajeAlerta type='error' message={error.response.data.message} />)} {/* Cambio aquí */}
      {isSuccess && (<MensajeAlerta type='success' message={'Usuario registrado Correctamente'} />)} {/* Cambio aquí */}
      <p className="text-sm text-center text-gray-500">
        unete ahora!
      </p>

      {/* Input Field - Username */}
      <div className="relative">
        <FaUser className="absolute top-3 left-3 text-gray-400" />
        <input
          id="username"
          type="text"
          {...formik.getFieldProps("username")}
          placeholder="Username"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.username && formik.errors.username && (
          <span className="text-xs text-red-500">{formik.errors.username}</span>
        )}
      </div>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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

      {/* Input Field - Confirm Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="confirmPassword"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          placeholder="Confirm Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {formik.errors.confirmPassword}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Registrate
      </button>
    </form>
  );
};

export default Registro;