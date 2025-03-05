// src/app/CopSelectionForm.tsx
'use client';

import { useState } from 'react';
import { City, Vehicle } from '@/types/types';

interface CopSelectionFormProps {
  copId: number;
  cities: City[]; // Add cities to the interface
  vehicles: Vehicle[]; // Add vehicles to the interface
  selectedCities: number[];
  selectedVehicles: number[];
  onSelect: (copId: number, cityId: number, vehicleId: number) => void;
}

export default function CopSelectionForm({
  copId,
  cities,
  vehicles,
  selectedCities,
  selectedVehicles,
  onSelect,
}: CopSelectionFormProps) {
  const [cityId, setCityId] = useState<number | null>(null);
  const [vehicleId, setVehicleId] = useState<number | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityId && vehicleId) {
      // Check if the city or vehicle is already selected
      if (selectedCities.includes(cityId)) {
        alert('This city has already been selected by another cop.');
        return;
      }
      if (selectedVehicles.includes(vehicleId)) {
        alert('This vehicle has already been selected by another cop.');
        return;
      }

      // If valid, call the onSelect function
      onSelect(copId, cityId, vehicleId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">Cop {copId}</h2>

      {/* City Selection */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Select City:</h3>
        {cities.map((city) => (
          <label key={city.id} className="block mb-2">
            <input
              type="radio"
              name={`city-${copId}`}
              value={city.id}
              onChange={() => setCityId(city.id)}
              className="mr-2"
              disabled={selectedCities.includes(city.id)} // Disable if already selected
            />
            {city.name} ({city.distance} KM)
          </label>
        ))}
      </div>

      {/* Vehicle Selection */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Select Vehicle:</h3>
        {vehicles.map((vehicle) => (
          <label key={vehicle.id} className="block mb-2">
            <input
              type="radio"
              name={`vehicle-${copId}`}
              value={vehicle.id}
              onChange={() => setVehicleId(vehicle.id)}
              className="mr-2"
              disabled={selectedVehicles.includes(vehicle.id)} // Disable if already selected
            />
            {vehicle.kind} ({vehicle.range} KM)
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Confirm Selection for Cop {copId}
      </button>
    </form>
  );
}