import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { BorrarCategoriaApi, ListaCategoriaApi } from "../../services/categoria/categoriaService";
import MensajeAlerta from "../alerta/MensajeAlerta";

const ListaCategoria = () => {
  
  // fetch
  const {data, isError, isLoading , isFetched, error , refetch } = useQuery({
    queryFn: ListaCategoriaApi,
    queryKey: ['list-categories']
  })

   console.log(data)
    //  borrar categoria
   
     // navigate
     const navigate = useNavigate()
    

     // mutacion
     const {mutateAsync, isPending, error:categoriaErr, isSuccess} = useMutation({
        mutationFn: BorrarCategoriaApi,
        mutationKey: ['borrar-categoria']

     })

     const handleBorrar = (id) => {
         mutateAsync(id)
         .then((data) => {
          // refetch
          refetch()
         })
         .catch(e => console.log(e))
     }    

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categorias</h2>
      {
        isLoading && <MensajeAlerta type='loading' message='Cargando...'/>
      }
      {
        isError && <MensajeAlerta type='error' message={error.response.data.message}/>
      }
      <ul className="space-y-4">
        {data?.map((categoria) => (
          <li
            key={categoria?._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
          >
            <div>
              <span className="text-gray-800">{categoria?.name}</span>
              <span
                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  categoria.type === "ingreso"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {categoria?.type?.charAt(0).toUpperCase() +
                  categoria?.type?.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <Link to={`/actualizar/${categoria._id}`}>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
              </Link>
              <button
                onClick={() => handleBorrar(categoria?._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCategoria;