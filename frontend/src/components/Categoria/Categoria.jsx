import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaWallet,
} from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { crearCategoriaApi } from "../../services/categoria/categoriaService";
import MensajeAlerta from "../alerta/MensajeAlerta";

// Esquema de validación
const validacionesSchema = Yup.object({
  name: Yup.string().required("Nombre de categoria es requerido"),
  type: Yup.string()
    .required("Tipo de categoria es requerido")
    .oneOf(["ingreso", "gasto"]),
});

const AgregarCategoria = () => {
  const navigate = useNavigate();

  // Mutación para crear categoría
  const { mutateAsync, isError, error, isSuccess } = useMutation({
    mutationFn: crearCategoriaApi,
    mutationKey: ["categoria"],
    onError: (err) => {
      // Si el token expiró, redirigir al usuario a la página de inicio de sesión
      if (err.response?.status === 401) {
        alert("Token expirado, por favor inicia sesión de nuevo.");
        navigate("/login");
      }
    },
    onSuccess: () => {
      navigate("/Lista-Categorias");
    },
  });

  // Configuración de Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    validationSchema: validacionesSchema,
    onSubmit: (values) => {
      mutateAsync(values).catch((e) => console.log(e));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Agregar nueva categoria
        </h2>
        <p className="text-gray-600">Complete los siguientes campos</p>
      </div>
      {/* Mensaje de alerta */}
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
          message="Categoría agregada exitosamente, redireccionando..."
        />
      )}
      {/* Tipo de categoría */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Tipo</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Selecciona el tipo de transacción</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      {/* Nombre de la categoría */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-700 font-medium">
          <SiDatabricks className="inline mr-2 text-blue-500" />
          Nombre
        </label>
        <input
          type="text"
          {...formik.getFieldProps("name")}
          placeholder="Nombre"
          id="name"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
        )}
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 transform"
      >
        Agregar Categoría
      </button>
    </form>
  );
};

export default AgregarCategoria;