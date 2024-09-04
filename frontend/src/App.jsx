import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroSection from './components/Home/HomePage';
import NavBarPublico from './components/navbar/NavBar-Publico';
import Login from './components/User/Login';
import { useSelector } from 'react-redux';
import Registro from './components/User/Registro';
import NavBarPrivado from './components/navbar/NavBar-Privado';
import AgregarCategoria from './components/Categoria/Categoria';
import ListaCategoria from './components/Categoria/ListaCategorias';
import ActualizarCategoria from './components/Categoria/ActualizarCategoria';
import Transacciones from './components/transacciones/Transacciones';
import Dashboard from './components/User/Dashboard';
import Perfil from './components/User/Perfil';
import AuthRoute from './components/Auth/AuthRoute';

const App = () => {
  // traer token
  const user = useSelector((state) => state?.autenticacion?.user);

  return (
    <BrowserRouter>
      {user ? <NavBarPrivado /> : <NavBarPublico />}
      <Routes>
        <Route path='/' element={<HeroSection />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        {/* Rutas protegidas */}
        <Route
          path='/Agregar-Categoria'
          element={
            <AuthRoute>
              <AgregarCategoria />
            </AuthRoute>
          }
        />
        <Route
          path='/Lista-Categorias'
          element={
            <AuthRoute>
              <ListaCategoria />
            </AuthRoute>
          }
        />
        <Route
          path='/actualizar/:id'
          element={
            <AuthRoute>
              <ActualizarCategoria />
            </AuthRoute>
          }
        />
        <Route
          path='/Agregar-Transaccion'
          element={
            <AuthRoute>
              <Transacciones />
            </AuthRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path='/perfil'
          element={
            <AuthRoute>
              <Perfil />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
