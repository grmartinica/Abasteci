export enum FuelType {
  GASOLINA_COMUM = 'Gasolina Comum',
  GASOLINA_ADITIVADA = 'Gasolina Aditivada',
  ETANOL = 'Etanol',
}

export interface Vehicle {
  id: string;
  name: string;
}

export interface Refuel {
  id: string;
  vehicleId: string; // Updated to link vehicles
  odometer: number;
  liters: number;
  date: string;
  fuelType: FuelType;
  pricePerLiter: number;
  totalPaid: number;
}
