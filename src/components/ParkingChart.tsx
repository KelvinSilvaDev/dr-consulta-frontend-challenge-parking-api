/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const ParkingChart = ({periodSummary, vehicleReport, entryExitSummary}:any) => {
const ParkingChart = () => {
  // Dados fictícios para teste
  const entryExitSummary = {
    totalEntries: 20,
    totalExits: 5,
  };

  const periodSummary = {
    totalEntries: [
      { hour: "2024-01-28 00:00:00", totalEntries: "1" },
      { hour: "2024-01-28 01:00:00", totalEntries: "2" },
      { hour: "2024-01-28 02:00:00", totalEntries: "5" },
      { hour: "2024-01-28 03:00:00", totalEntries: "1" },
      { hour: "2024-01-28 04:00:00", totalEntries: "1" },
      { hour: "2024-01-28 05:00:00", totalEntries: "9" },
      { hour: "2024-01-28 06:00:00", totalEntries: "1" },
    ],
    totalExits: [
      { hour: "2024-01-28 00:00:00", totalExits: "1" },
      { hour: "2024-01-28 01:00:00", totalExits: "1" },
      { hour: "2024-01-28 02:00:00", totalExits: "4" },
      { hour: "2024-01-28 03:00:00", totalExits: "0" },
      { hour: "2024-01-28 04:00:00", totalExits: "1" },
      { hour: "2024-01-28 05:00:00", totalExits: "3" },
      { hour: "2024-01-28 06:00:00", totalExits: "6" },
    ],
  };

  const vehicleReport = {
    status: true,
    data: {
      totalCarEntries: 10,
      totalMotorcycleEntries: 10,
    },
  };

  // Transformar os dados para o formato que o Recharts espera
  const data = periodSummary.totalEntries.map((entry: { hour: any; totalEntries: any; }) => ({
    hour: entry.hour,
    entries: parseInt(entry.totalEntries, 20),
    exits: 0, // Inicialmente define saídas como 0
  }));

  periodSummary.totalExits.forEach((exit: any) => {
    const exitIndex = data.findIndex((entry: { hour: any; }) => entry.hour === exit.hour);
    if (exitIndex !== -1) {
      data[exitIndex].exits = parseInt(exit.totalExits, 10);
    }
  });

  const carDifference = vehicleReport.data.totalCarEntries - vehicleReport.data.totalMotorcycleEntries;
  // const motorcycleDifference = vehicleReport.data.totalMotorcycleEntries - vehicleReport.data.totalCarEntries;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Entrada e Saída de Veículos</h2>

      {/* Totais Gerais */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-2">Totais Gerais:</h3>
        <p>Entradas: {entryExitSummary.totalEntries}</p>
        <p>Saídas: {entryExitSummary.totalExits}</p>
      </div>

      {/* Gráfico de Entradas e Saídas por Período */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-2">Entradas e Saídas por Período:</h3>
        <BarChart width={800} height={400} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entries" fill="#8884d8" name="Entradas" />
          <Bar dataKey="exits" fill="#82ca9d" name="Saídas" />
        </BarChart>
      </div>

      {/* Relatório de Entradas por Tipo de Veículo */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Entradas por Tipo de Veículo:</h3>
        <p>Carros: {vehicleReport.data.totalCarEntries}</p>
        <p>Motocicletas: {vehicleReport.data.totalMotorcycleEntries}</p>
        <p>Diferença (Carros - Motos): {carDifference}</p>
      </div>
    </div>

  );
};

export default ParkingChart;
