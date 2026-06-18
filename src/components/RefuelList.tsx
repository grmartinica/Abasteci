import { Refuel } from '../types';

interface Props {
  refuels: Refuel[];
}

export default function RefuelList({ refuels }: Props) {
  const sortedRefuels = [...refuels].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const calculateStats = (current: Refuel, previous: Refuel | undefined) => {
    if (!previous) return null;
    const km = current.odometer - previous.odometer;
    const kmPerLiter = current.liters > 0 ? (km / current.liters) : 0;
    return { km, kmPerLiter: kmPerLiter.toFixed(2) };
  };

  return (
    <div className="mt-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Histórico</h2>
      {sortedRefuels.length === 0 ? (
        <p className="text-gray-500">Nenhum abastecimento registrado.</p>
      ) : (
        <ul className="space-y-3">
          {sortedRefuels.map((refuel, index) => {
            const stats = calculateStats(refuel, sortedRefuels[index + 1]);
            return (
              <li key={refuel.id} className="p-3 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <p className="font-medium">{refuel.fuelType}</p>
                  <p className="text-sm text-gray-500 font-mono">{refuel.odometer} km • {new Date(refuel.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{refuel.liters} L • R$ {refuel.totalPaid.toFixed(2)}</p>
                  <p className="text-xs text-slate-500">R$ {refuel.pricePerLiter.toFixed(2)}/L</p>
                  {stats && (
                    <div className="flex gap-2 justify-end mt-1">
                      <p className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded">{stats.km} km</p>
                      <p className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{stats.kmPerLiter} km/L</p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
