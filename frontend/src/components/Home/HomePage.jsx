import React from "react";
import {
    FaMoneyBillWave,
    FaSignInAlt,
    FaList,
    FaChartPie,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import fondoPantalla from '../../assets/fondo-pantalla.jpg';

const HeroSection = () => {
    return (
        <>
            {/* Imagen */}
            <div
                className="bg-cover bg-center h-96 bg-gradient-to-r from-blue-600 via-cyan-100 to-blue-100 animate-fadeIn"
                style={{ backgroundImage: `url(${fondoPantalla})` }}
            ></div>

            <div className="text-gray-800 py-20 px-4">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    {/* Heading */}
                    <h1 className="text-5xl font-bold text-center animate-fadeInUp">
                        Administra tus gastos de la manera más fácil!
                    </h1>

                    {/* Subheading */}
                    <p className="mt-4 text-xl text-center animate-fadeInUp">
                        Administre sus finanzas con una solución moderna diseñada para vos de la mejor manera
                    </p>

                    {/* Feature Icons */}
                    <div className="flex space-x-8 mt-10">
                        <div className="flex flex-col items-center animate-zoomIn">
                            <FaMoneyBillWave className="text-3xl" />
                            <p className="mt-2">Seguimiento eficiente</p>
                        </div>
                        <div className="flex flex-col items-center animate-zoomIn">
                            <FaFilter className="text-3xl" />
                            <p className="mt-2">Filtrado de transacciones</p>
                        </div>
                        <div className="flex flex-col items-center animate-zoomIn">
                            <IoIosStats className="text-3xl" />
                            <p className="mt-2">Informes reveladores</p>
                        </div>
                    </div>

                    {/* Call to Action Button */}
                    <Link to="/registro">
                        <button className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                            ¡Pruébalo!
                        </button>
                    </Link>
                </div>
            </div>
            <div className="py-20 px-4 animate-fadeInUp">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Cómo funciona
                </h2>
                <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center animate-fadeInUp">
                        <div className="p-4 rounded-full bg-blue-500 text-white mb-4">
                            <FaSignInAlt className="text-xl" />
                        </div>
                        <h3 className="mb-2 font-semibold">Registrate</h3>
                        <p>Regístrate y empieza a gestionar tus gastos en un minuto.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center animate-fadeInUp">
                        <div className="p-4 rounded-full bg-green-500 text-white mb-4">
                            <FaList className="text-xl" />
                        </div>
                        <h3 className="mb-2 font-semibold">Agregar transacciones</h3>
                        <p>Agregue rápidamente ingresos y gastos a su cuenta.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center animate-fadeInUp">
                        <div className="p-4 rounded-full bg-yellow-500 text-white mb-4">
                            <FaChartPie className="text-xl" />
                        </div>
                        <h3 className="mb-2 font-semibold">Ver informes</h3>
                        <p>Vea informes y gráficos interesantes de sus finanzas.</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-black py-20 px-4 animate-fadeInUp">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold">
                        ¿Listo para tomar el control de sus finanzas?
                    </h2>
                    <p className="mt-4">
                        ¡Unite ahora y comenzá a administrar tus gastos como un profesional!
                    </p>
                    <Link to="/registro">
                        <button className="mt-8 px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                            ¡Registrate!
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
