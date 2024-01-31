/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ParkingChart = ({ periodSummary, vehicleReport, entryExitSummary }: any) => {
  const data = periodSummary?.result.map((entry: { hour: any; totalEntries: string; }) => ({
    hour: entry.hour,
    entries: parseInt(entry.totalEntries, 10),
    exits: 0, 
  }));

  periodSummary?.totalExits?.forEach((exit: { hour: any; totalExits: string; }) => {
    const exitIndex = data.findIndex((entry: { hour: any; }) => entry.hour === exit.hour);
    if (exitIndex !== -1) {
      data[exitIndex].exits = parseInt(exit.totalExits, 10);
    }
  });

  const carDifference = vehicleReport && vehicleReport.data
  ? vehicleReport.data.totalCarEntries - vehicleReport.data.totalMotorcycleEntries
  : 0;

  return (
    <div className="flex justify-start pr-6 items-start w-full">
      <div className="mb-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Entrada e Saída de Veículos</h2>
        </div>
        <BarChart width={600} height={240} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entries" fill="#43991c" name="Entradas" />
          <Bar dataKey="exits" fill="#d92121" name="Saídas" />
        </BarChart>
      </div>

      <div className='flex justify-start gap-8 content-start align-top items-start text-start'>
        <div className="my-14">
          <h3 className="text-lg font-bold mb-2">Totais Gerais:</h3>
          <p>Entradas: {entryExitSummary?.totalEntries}</p>
          <p>Saídas: {entryExitSummary?.totalExits}</p>
        </div>

        <div className="my-14">
          <h3 className="text-lg font-bold mb-2">Entradas por Tipo de Veículo:</h3>
          <p>Carros: {vehicleReport?.data?.totalCarEntries}</p>
          <p>Motocicletas: {vehicleReport?.data?.totalMotorcycleEntries}</p>
          <p>Diferença (Carros - Motos): {carDifference}</p>
        </div>
      </div>
    </div>
  );
};

export default ParkingChart;