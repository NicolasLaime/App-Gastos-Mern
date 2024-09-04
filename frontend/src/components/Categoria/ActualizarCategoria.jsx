import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ActualizarCategoriaApi, crearCategoriaApi } from "../../services/categoria/categoriaService";
import MensajeAlerta from "../alerta/MensajeAlerta";






const validacionesSchema = Yup.object({
  name: Yup.string()
    .required("Nombre de categoria es requerido"),
  type: Yup.string()
    .required("Tipo de categoria es requerido")
    .oneOf(["ingreso", "gasto"]),
});

const ActualizarCategoria = () => {

     

    //  params
    const {id } = useParams()
    console.log(id)

     // navigate
     const navigate = useNavigate()
    

     // mutacion
     const {mutateAsync, isPending,isError, error, isSuccess} = useMutation({
        mutationFn: ActualizarCategoriaApi,
        mutationKey: ['actualizar-categoria']

     })




  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    onSubmit: (values) => {
        const data = {
            ...values, id
        }
        mutateAsync(data)
        .then((data) => {})
        .catch(e => console.log(e))
    },
  });


  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Actualizar categoria seleccionada
        </h2>
        <p className="text-gray-600">Complete los siguientes campos</p>
      </div>
      {/* Display alert message */}
      {isError && (
        <MensajeAlerta
          type="error"
          message={
            error?.response?.data?.message ||
            "Algo sucedió, por favor intenta nuevamente más tarde."
          }
        />
      )}
      {isSuccess && (
        <MensajeAlerta
          type="success"
          message="
Categoría agregada exitosamente, redireccionando..."
        />
      )}
      {/* Category Type */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Selecciona el tipo de transaccion</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      {/* Category Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-700 font-medium">
          <SiDatabricks className="inline mr-2 text-blue-500" />
          Name
        </label>
        <input
          type="text"
          {...formik.getFieldProps("name")}
          placeholder="Name"
          id="name"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 transform"
      >
        Agregar Categoria
      </button>
    </form>
  );
};

export default ActualizarCategoria;