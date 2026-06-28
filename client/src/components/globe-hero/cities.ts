export type City = {
  name: string;
  short: string;
  lat: number;
  lng: number;
};

export const CITIES: City[] = [
  { name: "San Francisco", short: "SF", lat: 37.7749, lng: -122.4194 },
  { name: "New York", short: "NYC", lat: 40.7128, lng: -74.006 },
  { name: "Austin", short: "AUS", lat: 30.2672, lng: -97.7431 },
  { name: "Toronto", short: "YYZ", lat: 43.6532, lng: -79.3832 },
  { name: "London", short: "LDN", lat: 51.5074, lng: -0.1278 },
  { name: "Berlin", short: "BER", lat: 52.52, lng: 13.405 },
  { name: "Paris", short: "PAR", lat: 48.8566, lng: 2.3522 },
  { name: "Tel Aviv", short: "TLV", lat: 32.0853, lng: 34.7818 },
  { name: "Dubai", short: "DXB", lat: 25.2048, lng: 55.2708 },
  { name: "Bangalore", short: "BLR", lat: 12.9716, lng: 77.5946 },
  { name: "Singapore", short: "SIN", lat: 1.3521, lng: 103.8198 },
  { name: "Tokyo", short: "TYO", lat: 35.6762, lng: 139.6503 },
  { name: "Seoul", short: "SEL", lat: 37.5665, lng: 126.978 },
  { name: "Sydney", short: "SYD", lat: -33.8688, lng: 151.2093 },
  { name: "São Paulo", short: "GRU", lat: -23.5505, lng: -46.6333 },
  { name: "Mexico City", short: "MEX", lat: 19.4326, lng: -99.1332 },
];

export const ARCS: Array<[number, number]> = [
  [0, 1],
  [1, 4],
  [4, 5],
  [5, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 13],
  [0, 10],
  [1, 6],
  [6, 5],
  [3, 1],
  [2, 0],
  [14, 1],
  [15, 0],
  [4, 11],
  [0, 13],
  [5, 11],
];

const RADIUS = 1;

export function latLngToVec3(lat: number, lng: number, radius = RADIUS): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}
