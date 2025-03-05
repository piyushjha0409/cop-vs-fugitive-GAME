export interface City {
  id: number;
  name: string;
  distance: number;
}

export interface Vehicle {
  id: number;
  kind: string;
  range: number;
  count: number;
}

export interface Cop {
    id: number;
    name: string;
}
export interface CopSelection {
  city: City;
  vehicle: Vehicle;
  copId: number;
}
