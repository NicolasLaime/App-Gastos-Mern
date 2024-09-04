import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ListaTransaccionesApi } from "../../services/transacciones/transaccionesServices";
import { ListaCategoriaApi } from "../../services/categoria/categoriaService";

const ListaDeTransacciones = () => {
  
  

    // filtrado estado
    const [filtros, setFiltros] = useState({
        startDate: '',
        endDate:'',
        type:'',
        categoria: ''
    })
    
    // handlefiltrado
    const handleFiltrado = (e) => {

        const {name, value} = e.target
        setFiltros((prev) => ({...prev, [name]: value}))
        
        
    }




  // fetch categorias
  const {data:categoriaData, isLoading:categoriaLoading , isFetched, error:categoriaError } = useQuery({
    queryFn: ListaCategoriaApi,
    queryKey: ['list-categories']
  })
  
  
  
  
    // fetch
  const {
    data:transacciones,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => ListaTransaccionesApi(filtros),
    queryKey: ['lista-transacciones', filtros],
  });



  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={filtros.startDate}
          onChange={handleFiltrado}
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {/* End Date */}
        <input
          type="date"
          name="endDate"
          value={filtros.endDate}
          onChange={handleFiltrado}
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {/* Type */}
        <div className="relative">
          <select
            name="type"
            value={filtros.type}
          onChange={handleFiltrado}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="">todos los tipos de transaccion</option>
            <option value="ingreso">ingreso</option>
            <option value="gasto">gasto</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        {/* Category */}
        <div className="relative">
          <select
            name="categoria"
            value={filtros.categoria}
          onChange={handleFiltrado}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="all">Todas las categorías</option>
            <option value="SinCategoria">Sin categoria</option>

            {categoriaData?.map((categoria) => {
                return (
                    <option key={categoria._id} value={categoria?.name}>{categoria?.name}</option>
                )
            } )}
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Lista de transacciones
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {transacciones?.map((transaccion) => (
            <li
              key={transaccion._id}
              className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
            >
              <div>
                <span className="font-medium text-gray-600">
                  {new Date(transaccion.date).toLocaleDateString()}
                </span>
                <span
                  className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaccion.type === "ingreso"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaccion.type.charAt(0).toUpperCase() +
                    transaccion.type.slice(1)}
                </span>
                <span className="ml-2 text-gray-800">
                  {transaccion.categoria?.name} - $
                  {transaccion.monto.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 italic ml-2">
                  {transaccion.descripcion}
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleUpdateTransaction(transaccion._id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(transaccion._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListaDeTransacciones;
