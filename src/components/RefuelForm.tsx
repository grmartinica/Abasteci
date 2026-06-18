import { useState, FormEvent, useEffect } from 'react';
import { Refuel, FuelType } from '../types';

interface Props {
  onAdd: (refuel: Omit<Refuel, 'id'>) => void;
}

export default function RefuelForm({ onAdd }: Props) {
  const [odometer, setOdometer] = useState('');
  const [fuelType, setFuelType] = useState<FuelType>(FuelType.GASOLINA_COMUM);
  const [pricePerLiter, setPricePerLiter] = useState('');
  const [liters, setLiters] = useState('');
  const [totalPaid, setTotalPaid] = useState('');

  // Auto-calculate logic handlers
  const handlePriceChange = (val: string) => {
    setPricePerLiter(val);
    const p = parseFloat(val);
    const l = parseFloat(liters);
    const t = parseFloat(totalPaid);
    
    if (!isNaN(p)) {
      if (!isNaN(l)) {
        setTotalPaid((l * p).toFixed(2));
      } else if (!isNaN(t) && p !== 0) {
        setLiters((t / p).toFixed(2));
      }
    }
  };

  const handleLitersChange = (val: string) => {
    setLiters(val);
    const l = parseFloat(val);
    const p = parseFloat(pricePerLiter);
    
    if (!isNaN(l) && !isNaN(p)) {
      setTotalPaid((l * p).toFixed(2));
    }
  };

  const handleTotalPaidChange = (val: string) => {
    setTotalPaid(val);
    const t = parseFloat(val);
    const p = parseFloat(pricePerLiter);
    
    if (!isNaN(t) && !isNaN(p) && p !== 0) {
      setLiters((t / p).toFixed(2));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!odometer || !pricePerLiter || (!liters && !totalPaid)) return;
    
    onAdd({
      odometer: Number(odometer),
      liters: Number(liters),
      pricePerLiter: Number(pricePerLiter),
      totalPaid: Number(totalPaid),
      fuelType,
      date: new Date().toISOString(),
    });
    setOdometer('');
    setLiters('');
    setPricePerLiter('');
    setTotalPaid('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">Novo Abastecimento</h2>
      <input
        type="number"
        value={odometer}
        onChange={(e) => setOdometer(e.target.value)}
        placeholder="Odômetro atual (km)"
        className="block w-full p-3 border border-gray-300 rounded-md"
        required
      />
      <select 
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value as FuelType)}
        className="block w-full p-3 border border-gray-300 rounded-md"
      >
        {Object.values(FuelType).map(type => <option key={type} value={type}>{type}</option>)}
      </select>
      <input
        type="number"
        step="0.01"
        value={pricePerLiter}
        onChange={(e) => handlePriceChange(e.target.value)}
        placeholder="Preço do litro (R$)"
        className="block w-full p-3 border border-gray-300 rounded-md"
        required
      />
      <input
        type="number"
        step="0.01"
        value={liters}
        onChange={(e) => handleLitersChange(e.target.value)}
        placeholder="Litros"
        className="block w-full p-3 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        step="0.01"
        value={totalPaid}
        onChange={(e) => handleTotalPaidChange(e.target.value)}
        placeholder="Total pago (R$)"
        className="block w-full p-3 border border-gray-300 rounded-md"
      />
      <button type="submit" className="w-full bg-slate-900 text-white p-3 rounded-md hover:bg-slate-800 transition">
        Registrar
      </button>
    </form>
  );
}
