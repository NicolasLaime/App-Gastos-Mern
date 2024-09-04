import React from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ListaTransaccionesApi } from "../../services/transacciones/transaccionesServices";
import { useQuery } from "@tanstack/react-query";

// Registrar los componentes necesarios de Chart.js
ChartJs.register(ArcElement, Tooltip, Legend);

const GraficoTransacciones = () => {

    // fetch transacciones
    const {
        data: transacciones = [], // Por defecto, transacciones es un array vacío
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryFn: ListaTransaccionesApi,
        queryKey: ['lista-transacciones'],
    });

    // Cálculo total ingreso y gasto
    const total = transacciones.reduce((acc, transaccion) => {
        if (transaccion?.type === 'ingreso') {
            acc.ingreso += transaccion.monto;
        } else {
            acc.gasto += transaccion?.monto;
        }
        return acc;
    }, { ingreso: 0, gasto: 0 });

    // Estructura del gráfico
    const data = {
        labels: ['Ingreso', 'Gasto'],
        datasets: [{
            label: 'Transacciones',
            data: [total.ingreso, total.gasto],
            backgroundColor: ['#36A2EB', '#FF6384'],
            borderWidth: 1,
            hoverOffset: 4,
        }],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 25,
                    boxWidth: 12,
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: 'Ingresos vs Gastos',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                padding: {
                    top: 10,
                    bottom: 30,
                },
            },
        },
        cutout: '70%',
    };

    return (
        <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
            <h1 className="text-2xl font-bold text-center mb-6">
                Grafico de Transacciones
            </h1>
            <div style={{ height: "350px" }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default GraficoTransacciones;
