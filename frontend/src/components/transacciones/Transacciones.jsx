import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { ListaCategoriaApi } from "../../services/categoria/categoriaService";
import { useNavigate } from "react-router-dom";
import { CrearTransaccionApi } from "../../services/transacciones/transaccionesServices";
import MensajeAlerta from "../alerta/MensajeAlerta";

const validacionesSchema = Yup.object({
  type: Yup.string()
    .required("El tipo de transacción es requerido")
    .oneOf(["ingreso", "gasto"]),
  monto: Yup.number()
    .required("Monto es requerido")
    .positive("El monto debe ser positivo"),
  categoria: Yup.string().required("Categoría es requerida"),
  date: Yup.date().required("La fecha es requerida"),
  descripcion: Yup.string(),
});

const Transacciones = () => {
  const { data, isError, isLoading } = useQuery({
    queryFn: ListaCategoriaApi,
    queryKey: ['list-categories']
  });

  const navigate = useNavigate();

  const { mutateAsync, isPending, isError: TransaccionError, error: transaccionError, isSuccess } = useMutation({
    mutationFn: CrearTransaccionApi,
    mutationKey: ['crear-transaccion']
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      monto: "", // Corregido de "motno" a "monto"
      categoria: "",
      date: "",
      descripcion: "",
    },
    validationSchema: validacionesSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          navigate('/dashboard')
          
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Detalles de la Transacción
        </h2>
        <p className="text-gray-600">Complete los detalles a continuación.</p>
      </div>
      {isError && (
        <MensajeAlerta
          type="error"
          message={
            transaccionError?.response?.data?.message ||
            "Algo sucedió, por favor intenta nuevamente más tarde."
          }
        />
      )}
      {isSuccess && (
        <MensajeAlerta
          type="success"
          message="
          Transaccion agregada exitosamente, redireccionando..."
        />)}
      
        {/* Campo de Tipo de Transacción */}
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
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Seleccionar tipo de transacción</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      {/* Campo de Monto */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="monto" className="text-gray-700 font-medium">
          <FaDollarSign className="inline mr-2 text-blue-500" />
          Monto
        </label>
        <input
          type="number" // Cambiado de "monto" a "number"
          {...formik.getFieldProps("monto")}
          id="monto"
          placeholder="Monto"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.monto && formik.errors.monto && (
          <p className="text-red-500 text-xs italic">{formik.errors.monto}</p>
        )}
      </div>

      {/* Campo de Categoría */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="categoria" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Categoría
        </label>
        <select
          {...formik.getFieldProps("categoria")}
          id="categoria"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Seleccionar una categoría</option>
          {
            data?.map((categoria) => (
              <option key={categoria?._id} value={categoria?.name}>{categoria.name}</option>
            ))
          }
        </select>
        {formik.touched.categoria && formik.errors.categoria && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.categoria}
          </p>
        )}
      </div>

      {/* Campo de Fecha */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="text-gray-700 font-medium">
          <FaCalendarAlt className="inline mr-2 text-blue-500" />
          Fecha
        </label>
        <input
          type="date"
          {...formik.getFieldProps("date")}
          id="date"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.date && formik.errors.date && (
          <p className="text-red-500 text-xs italic">{formik.errors.date}</p>
        )}
      </div>

      {/* Campo de Descripción */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="descripcion" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Descripción (Opcional)
        </label>
        <textarea
          {...formik.getFieldProps("descripcion")}
          id="descripcion"
          placeholder="Descripción"
          rows="3"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        ></textarea>
        {formik.touched.descripcion && formik.errors.descripcion && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.descripcion}
          </p>
        )}
      </div>

      {/* Botón de Envío */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
      >
        Enviar Transacción
      </button>
    </form>
  );
};

export default Transacciones;
