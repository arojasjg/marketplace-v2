export interface City {
  id: string;
  name: string;
  country: string;
  region: 'mexico' | 'central-america' | 'south-america';
  position: { x: number; y: number };
  displayNumber: number;
}

export const CITIES: City[] = [
  // Mexico (2)
  { id: 'mx-1', name: 'Mexico City', country: 'Mexico', region: 'mexico', position: { x: 18, y: 22 }, displayNumber: 1 },
  { id: 'mx-2', name: 'Guadalajara', country: 'Mexico', region: 'mexico', position: { x: 16, y: 24 }, displayNumber: 2 },
  
  // Central America (5)
  { id: 'ca-1', name: 'Guatemala City', country: 'Guatemala', region: 'central-america', position: { x: 20, y: 28 }, displayNumber: 3 },
  { id: 'ca-2', name: 'San Salvador', country: 'El Salvador', region: 'central-america', position: { x: 21, y: 29 }, displayNumber: 4 },
  { id: 'ca-3', name: 'Tegucigalpa', country: 'Honduras', region: 'central-america', position: { x: 22, y: 28 }, displayNumber: 5 },
  { id: 'ca-4', name: 'Managua', country: 'Nicaragua', region: 'central-america', position: { x: 23, y: 30 }, displayNumber: 6 },
  { id: 'ca-5', name: 'San José', country: 'Costa Rica', region: 'central-america', position: { x: 25, y: 32 }, displayNumber: 7 },
  
  // South America (7)
  { id: 'sa-1', name: 'Bogotá', country: 'Colombia', region: 'south-america', position: { x: 29, y: 38 }, displayNumber: 8 },
  { id: 'sa-2', name: 'Medellín', country: 'Colombia', region: 'south-america', position: { x: 28, y: 40 }, displayNumber: 9 },
  { id: 'sa-3', name: 'Quito', country: 'Ecuador', region: 'south-america', position: { x: 27, y: 44 }, displayNumber: 10 },
  { id: 'sa-4', name: 'Lima', country: 'Peru', region: 'south-america', position: { x: 26, y: 54 }, displayNumber: 11 },
  { id: 'sa-5', name: 'La Paz', country: 'Bolivia', region: 'south-america', position: { x: 31, y: 59 }, displayNumber: 12 },
  { id: 'sa-6', name: 'Santiago', country: 'Chile', region: 'south-america', position: { x: 28, y: 69 }, displayNumber: 13 },
  { id: 'sa-7', name: 'Buenos Aires', country: 'Argentina', region: 'south-america', position: { x: 37, y: 73 }, displayNumber: 14 },
];
