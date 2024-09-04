import React from "react";
import ListaDeTransacciones from "../transacciones/ListaDeTransacciones";
import GraficoTransacciones from "../transacciones/GraficoTransacciones";

const Dashboard = () => {
  return (
    <>
      <GraficoTransacciones/>
      <ListaDeTransacciones />
    </>
  );
};

export default Dashboard;