/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ParkingChart = ({ vehicleReport, entryExitSummary }: any) => {


  console.log('Esse é o registro que vem da api', vehicleReport, entryExitSummary)

  const combinedData = {
    ...entryExitSummary,
    ...vehicleReport,
  };

  const chartData = [
    {
      name: 'Entradas',
      total: combinedData.totalEntries,
      carEntries: Array.isArray(combinedData.totalCarEntries) ? combinedData.totalCarEntries.length : 0,
      motorcycleEntries: Array.isArray(combinedData.totalMotorcycleEntries) ? combinedData.totalMotorcycleEntries.length : 0,
    },
    {
      name: 'Saídas',
      totalExits: combinedData.totalExits,
      carExits: Array.isArray(combinedData.totalCarExits) ? combinedData.totalCarExits.length : 0,
      motorcycleExits: Array.isArray(combinedData.totalMotorcycleExits) ? combinedData.totalMotorcycleExits.length : 0,
    },
  ];



  return (
    <ResponsiveContainer width="100%" height={300} style={{ margin: '0 auto' }}>
      <BarChart data={chartData} margin={{ left: -20, right: 0, top: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" name='Total de Entradas' fill="#ff6b81" />
        <Bar dataKey="carEntries" name='Carros' fill="#8e44ad" />
        <Bar dataKey="motorcycleEntries" name='Motos' fill="#f39c12" />
        <Bar dataKey="totalExits" name='Total de Saídas' fill="#27ae60" />
        <Bar dataKey="carExits" name='Carros' fill="#8e44ad" />
        <Bar dataKey="motorcycleExits" name='Motos' fill="#f39c12" />

      </BarChart>
    </ResponsiveContainer>
  );
};

export default ParkingChart;