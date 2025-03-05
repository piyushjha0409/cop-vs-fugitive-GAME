// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import CopSelectionForm from "../app/components/forms/CopSelectionForms";
import { getCities, getVehicles } from "../app/api/data";
import { City, Vehicle, CopSelection } from "@/types/types";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCities, setSelectedCities] = useState<number[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]);
  const [copSelections, setCopSelections] = useState<CopSelection[]>([]);

  // Fetch cities and vehicles on component mount
  useEffect(() => {
    async function fetchData() {
      const citiesData = await getCities();
      const vehiclesData = await getVehicles();
      setCities(citiesData);
      setVehicles(vehiclesData);
    }
    fetchData();
  }, []);

  // Handle cop selection
  const handleCopSelection = async (
    copId: number,
    cityId: number,
    vehicleId: number
  ) => {
    // Add the selected city and vehicle to the lists
    setSelectedCities([...selectedCities, cityId]);
    setSelectedVehicles([...selectedVehicles, vehicleId]);

    // Add the selection to the copSelections list
    const selectedCity = cities.find((city) => city.id === cityId);
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id === vehicleId
    );
    // const cop = await prisma.cop.findUniqueOrThrow({ where: { id: copId } });
    if (selectedCity && selectedVehicle) {
      setCopSelections([
        ...copSelections,
        { copId, city: selectedCity, vehicle: selectedVehicle },
      ]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Criminal Capture Game</h1>

      {/* Cop Selection Forms */}
      <div className="space-y-4">
        {/* Cop 1 Form */}
        <CopSelectionForm
          copId={1}
          cities={cities}
          vehicles={vehicles}
          selectedCities={selectedCities}
          selectedVehicles={selectedVehicles}
          onSelect={handleCopSelection}
        />

        {/* Cop 2 Form */}
        <CopSelectionForm
          copId={2}
          cities={cities}
          vehicles={vehicles}
          selectedCities={selectedCities}
          selectedVehicles={selectedVehicles}
          onSelect={handleCopSelection}
        />

        {/* Cop 3 Form */}
        <CopSelectionForm
          copId={3}
          cities={cities}
          vehicles={vehicles}
          selectedCities={selectedCities}
          selectedVehicles={selectedVehicles}
          onSelect={handleCopSelection}
        />
      </div>

      {/* Display Cop Selections */}
      {copSelections.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Selected Cities & Vehicles
          </h2>
          <ul>
            {copSelections.map((selection, index) => (
              <li key={index} className="mb-2">
                Cop {selection.copId} selected {selection.city.name} with{" "}
                {selection.vehicle.kind}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
