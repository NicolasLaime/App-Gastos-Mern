import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CambiarContraseñaApi } from "../../services/users/userServices";
import { useMutation } from "@tanstack/react-query";
import MensajeAlerta from "../alerta/MensajeAlerta";




const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .required("Email es requerido"),
});
const ActualizarContraseña = () => {

    // mutacion
    const {mutateAsync, isPending,isError, error, isSuccess} = useMutation({
        mutationFn: CambiarContraseñaApi,
        mutationKey: ['cambiar-contraseña'] 
     })

     const formik = useFormik({
        initialValues: {
          password: "",
        },
        // Validations
        validationSchema,
        //Submit
        onSubmit: (values) => {
          mutateAsync(values.password)
            .then((data) => {console.log(data)})
            .catch((e) => console.log(e));
        },
      });


  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Cambia tu contraseña</h2>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            nueva contraseña
          </label>
          {isPending && <MensajeAlerta type="loading" message='actualizando...' />} 
            {isError && (<MensajeAlerta type='error' message={error.response.data.message} />)} 
            {isSuccess && (<MensajeAlerta type='success' message={'Actualizacion de contraseña exitosa'} />)}
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="outline-none flex-1"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Actualizar contraseña
        </button>
      </form>
    </div>
  );
};

export default ActualizarContraseña;